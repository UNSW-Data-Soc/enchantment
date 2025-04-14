export async function sendForm() {
    let form = document.getElementById('contact-form') as HTMLFormElement;

    const firstName = (form.querySelector('input[name="firstName"]') as HTMLInputElement).value;
    const lastName = (form.querySelector('input[name="lastName"]') as HTMLInputElement).value;
    const email = (form.querySelector('input[name="email"]') as HTMLInputElement).value;
    const message = (form.querySelector('input[name="message"]') as HTMLInputElement).value;

    const url = `https://docs.google.com/forms/d/e/1FAIpQLSeWO2PL1yY-SgEukHpIv7ZbSX1Wsebm0mhUqjAyYIsIWxd7pw/formResponse?usp=pp_url`

    try {
        const formData = new URLSearchParams();
        formData.append('entry.2024169628', firstName);
        formData.append('entry.2050194094', lastName);
        formData.append('entry.1682895332', email);
        formData.append('entry.1330885331', message);
        console.log(formData.toString());

        const response = await fetch(url, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData.toString(),
        });
        return response;

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return new Response(JSON.stringify({ error: errorMessage }), { status: 500 });
    }
}