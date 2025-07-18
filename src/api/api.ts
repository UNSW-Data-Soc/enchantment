const FACEBOOK_PAGE_ID = '1653268794976040';
// below is long lived access tocken for data soc page - generated following link
// https://graph.facebook.com/v19.0/oauth/access_token?grant_type=fb_exchange_token&client_id=1384483765886092&client_secret=c5385c4f51d4ff7030bc7131c0b60a42&fb_exchange_token=EAATrLj8QHIwBO6GwMfrwYGI4174fkD58apfqITIxBZAItzZBiHe32IM2F6zdQCdisLqQJ2qUJ9LbzLoJhqZAbWfyY8fJ045jKZCaV5F5h2GwDjrgSoSyNquRZCSIK4G1QxPPgxNQFZA04zVnaWzJxvdRhULh3tEgZBDAMaZB55n20opHRtBrRLPRNxGGp3N9yCSK0dnZBsPUG8imJ38wLO6zzcJA2xmYZD

const ACCESS_TOKEN = 'EAATrLj8QHIwBOZCwmiPrOEfMu7jMuKBR8hzM3GedRxhnD5RPvZCTZCxg5nayUBuN75CdIZACRf2iqXPxH1Job3C06r0KFASp5U1ZA8Mb3wUGyECMybj1V3lA2j2Kp95EK7wFrTA5ZCHAlTH9EZBIEx3JJyquddpIbBsD02EhVsZBl3eVYI2QjkOjpYjjtco5NbeujzhZC3rgCdnqrqzOWSttqY0F8YX5oofz9LdWur39ayVYZD';

// manageView = {10}

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
            `https://graph.facebook.com/v22.0/${FACEBOOK_PAGE_ID}/events?access_token=${ACCESS_TOKEN}&fields=id,name,cover,place,start_time`);

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
