import * as nodemailer from "nodemailer";
import * as dotenv from "dotenv";

dotenv.config();

export async function triggerApi(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    const fullNameInput = form.elements.namedItem('fullName') as HTMLInputElement;
    const fullName = fullNameInput.value;
    const emailInput = form.elements.namedItem('email') as HTMLInputElement;
    const email = emailInput.value;
    const phoneInput = form.elements.namedItem('phone') as HTMLInputElement;
    const phone = phoneInput.value;
    const messageInput = form.elements.namedItem('message') as HTMLInputElement;
    const message = messageInput.value;

    try {
        await sendEmail(fullName, email, phone, message);
        console.log("Email sent successfully!");
    } catch (error) {
        console.error("Failed to send email:", error);
    }

}

export async function sendEmail(fullName: string, email: string, phone: string, message: string) {
  const sender = process.env.EMAIL_SENDER;
  const password = process.env.EMAIL_PASSWORD;

  if (!sender || !password) {
    throw new Error("Missing email credentials in environment variables.");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email, please try again.")
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: sender,
      pass: password,
    },
  });

  const mailOptions = {
    from: process.env.CONTACT_EMAIL_SENDER,
    to: "hello@unswdata.com",
    subject: `Contact Form`,
    text: `
    Name: ${fullName}
    Email: ${email}

    ${message}
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("Email sent:", info.response);
}
