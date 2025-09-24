import emailjs from "@emailjs/browser";

export async function sendClosureEmail(
  recipientEmail: string,
  eventName: string,
  eventId: string,
) {
  try {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Full HTML email with dynamic placeholders
    const emailHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Event Closure Notification</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f7f7f7;
            margin: 0;
            padding: 0;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 10px;
            box-shadow: 0px 4px 12px rgba(0,0,0,0.1);
            overflow: hidden;
          }
          .header {
            background: #111827;
            color: #facc15;
            padding: 20px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 22px;
            color: #facc15;
          }
          .body {
            padding: 25px;
            line-height: 1.6;
          }
          .body h2 {
            color: #111827;
            margin-bottom: 10px;
          }
          .highlight {
            color: #facc15;
            font-weight: bold;
          }
          .footer {
            background: #f3f4f6;
            padding: 15px;
            text-align: center;
            font-size: 13px;
            color: #6b7280;
          }
          .button {
            display: inline-block;
            margin-top: 20px;
            padding: 12px 20px;
            background: #facc15;
            color: #111827;
            text-decoration: none;
            border-radius: 8px;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>IIIT Delhi Student Council</h1>
          </div>
          <div class="body">
            <h2>Event Closure Notification</h2>
            <p>Dear <strong>${recipientEmail}</strong>,</p>
            <p>
              We would like to inform you that the event proposal titled 
              <span class="highlight">“${eventName}”</span> (ID: <span class="highlight">${eventId}</span>)
              has been <strong>closed and removed</strong> from the Student Council portal.
            </p>
            <p>
              We appreciate your efforts and initiative in submitting this proposal. 
              Although this event will not move forward, your contributions are 
              valuable in shaping our campus activities.
            </p>
            <p>
              If you have further ideas or would like to propose a new event in the future, 
              we encourage you to stay engaged with the Council.
            </p>
            <a href="https://studentcouncil.iiitd.edu.in" class="button">
              Visit Student Council Portal
            </a>
          </div>
          <div class="footer">
            © IIIT Delhi Student Council<br/>
            Empowering voices, fostering innovation, and building meaningful impact.
          </div>
        </div>
      </body>
      </html>
    `;

    const templateParams = {
      to_email: recipientEmail,
      message_html: emailHtml, // pass the HTML to EmailJS
    };

    const response = await emailjs.send(
      serviceId,
      templateId,
      templateParams,
      publicKey
    );

    console.log("Email sent successfully:", response);
    return true;
  } catch (err) {
    console.error("Error sending email:", err);
    return false;
  }
}
