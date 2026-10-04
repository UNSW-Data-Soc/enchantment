const FACEBOOK_PAGE_ID = '1653268794976040';
// below is long lived access tocken for data soc page - generated following link

const FACEBOOK_ACCESS_TOKEN = import.meta.env.ACCESS_TOKEN;
// manageView = {10}

export interface FacebookEvent {
    id: string;
    name: string;
    cover?: { source: string };
    place?: { name: string };
    start_time: string;
}

interface FacebookResponse {
    data: FacebookEvent[];
}

export async function fetchEvents() {
    try {
        const response = await fetch(
            `https://graph.facebook.com/v22.0/${FACEBOOK_PAGE_ID}/events?access_token=${FACEBOOK_ACCESS_TOKEN}&fields=id,name,cover,place,start_time`);

            const ACCESS_TOKEN = import.meta.env.ACCESS_TOKEN;

        const data: FacebookResponse = await response.json();

        if (!data || !data.data) {
            return new Response(JSON.stringify({ error: 'No events found' }), { status: 404 });
        }

        const now = new Date();
        const upcomingEvents = data.data.filter(event => new Date(event.start_time) >= now);
        const pastEvents = data.data.filter(event => new Date(event.start_time) < now);

        return new Response(JSON.stringify({ upcomingEvents, pastEvents }), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return new Response(JSON.stringify({ error: errorMessage }), { status: 500 });
    }
}
