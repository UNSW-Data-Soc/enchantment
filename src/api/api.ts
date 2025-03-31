const FACEBOOK_PAGE_ID = 'DataSoc';
const ACCESS_TOKEN = '';

interface FacebookEvent {
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
            `https://graph.facebook.com/v18.0/${FACEBOOK_PAGE_ID}/events?access_token=${ACCESS_TOKEN}&fields=id,name,cover,place,start_time`);

        const data: FacebookResponse = await response.json();

        if (!data || !data.data) {
            return new Response(JSON.stringify({ error: 'No events found' }), { status: 404 });
        }

        const now = new Date().toISOString();
        const upcomingEvents = data.data.filter(event => event.start_time >= now);
        const pastEvents = data.data.filter(event => event.start_time < now);

        return new Response(JSON.stringify({ upcomingEvents, pastEvents }), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return new Response(JSON.stringify({ error: errorMessage }), { status: 500 });
    }
}