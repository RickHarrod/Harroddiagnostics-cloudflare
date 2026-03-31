import { SMTPClient } from "emailjs";

export async function onRequestPost(context) {
  try {
    const data = await context.request.json();

    const {
      name,
      email,
      phone,
      systemType,
      panelCount,
      message
    } = data;

    const client = new SMTPClient({
      user: context.env.SMTP_USER,
      password: context.env.SMTP_PASS,
      host: context.env.SMTP_HOST,
      ssl: true,
      port: Number(context.env.SMTP_PORT)
    });

    await new Promise((resolve, reject) => {
      client.send(
        {
          from: context.env.SMTP_USER,
          to: context.env.SMTP_USER,
          subject: `New enquiry from ${name}`,
          text: `
New enquiry received:

Name: ${name}
Email: ${email}
Phone: ${phone}
System Type: ${systemType}
Panel Count: ${panelCount}

Message:
${message}
          `
        },
        (err, message) => {
          if (err) reject(err);
          else resolve(message);
        }
      );
    });

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );

  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}