const FACEBOOK_PAGE_ID = '1653268794976040';
const FACEBOOK_ACCESS_TOKEN = import.meta.env.ACCESS_TOKEN;

export interface FacebookEvent {
    id: string;
    name: string;
    cover?: { source: string };
    place?: { name: string };
    start_time: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isFacebookEvent(value: unknown): value is FacebookEvent {
    return isRecord(value)
        && typeof value.id === 'string'
        && typeof value.name === 'string'
        && typeof value.start_time === 'string'
        && Number.isFinite(Date.parse(value.start_time))
        && (value.cover === undefined || (isRecord(value.cover) && typeof value.cover.source === 'string'))
        && (value.place === undefined || (isRecord(value.place)
            && (value.place.name === undefined || typeof value.place.name === 'string')));
}

type EventsErrorReason = 'MISSING_TOKEN' | 'NETWORK_ERROR' | 'INVALID_JSON'
    | 'FACEBOOK_ERROR' | 'INVALID_RESPONSE';

function eventsError(status: number, reason: EventsErrorReason, details: string, code?: number) {
    const safeDetails = FACEBOOK_ACCESS_TOKEN
        ? details.replaceAll(FACEBOOK_ACCESS_TOKEN, '[REDACTED]')
        : details;

    return new Response(JSON.stringify({ error: 'Error fetching events', reason, details: safeDetails, code }), {
        status,
        headers: { 'Content-Type': 'application/json' }
    });
}

export async function fetchEvents(): Promise<Response> {
    if (!FACEBOOK_ACCESS_TOKEN) {
        return eventsError(500, 'MISSING_TOKEN', 'Missing ACCESS_TOKEN environment variable');
    }

    let response: Response;
    try {
        response = await fetch(
            `https://graph.facebook.com/v22.0/${FACEBOOK_PAGE_ID}/events?access_token=${FACEBOOK_ACCESS_TOKEN}&fields=id,name,cover,place,start_time`);
    } catch {
        // Avoid exposing request URLs, which contain the access token.
        return eventsError(502, 'NETWORK_ERROR', 'Unable to connect to Facebook API');
    }

    let data: unknown;
    try {
        data = await response.json();
    } catch {
        // Preserve an HTTP failure even if its body is HTML, empty, or invalid JSON.
        return eventsError(
            response.ok ? 502 : response.status,
            'INVALID_JSON',
            `Facebook API returned HTTP ${response.status} with an unreadable JSON response`
        );
    }

    const hasFacebookError = isRecord(data) && data.error !== undefined && data.error !== null;
    const facebookError = isRecord(data) && isRecord(data.error) ? data.error : undefined;

    if (!response.ok || hasFacebookError) {
        return eventsError(
            response.ok ? 502 : response.status,
            'FACEBOOK_ERROR',
            typeof facebookError?.message === 'string'
                ? facebookError.message
                : `Facebook API returned HTTP ${response.status} without a valid error message`,
            typeof facebookError?.code === 'number' ? facebookError.code : undefined
        );
    }

    if (!isRecord(data) || !Array.isArray(data.data) || !data.data.every(isFacebookEvent)) {
        return eventsError(502, 'INVALID_RESPONSE', 'Facebook API returned invalid event data');
    }

    const now = Date.now();
    const upcomingEvents = data.data.filter(event => Date.parse(event.start_time) >= now);
    const pastEvents = data.data.filter(event => Date.parse(event.start_time) < now);

    // An empty data array is a valid success, not a fetch failure.
    return new Response(JSON.stringify({ upcomingEvents, pastEvents }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}
