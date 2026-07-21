import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, ''),
  },
});

export async function sendOwnerNotification({ name, email, message }) {
  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
    to: process.env.OWNER_EMAIL,
    subject: `New message from ${name}`,
    html: `
      <h2>New Portfolio Contact</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `,
  });
}

export async function sendThankYouEmail({ name, email }) {
  await transporter.sendMail({
    from: `"Sandesh Jadhav" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: 'Thank you for reaching out!',
    html: `
      <h2>Hi ${name},</h2>
      <p>Thank you for contacting me through my portfolio!</p>
      <p>I have received your message and will get back to you soon.</p>
      <br/>
      <p>Best regards,<br/>Sandesh Jadhav<br/>Full Stack Developer</p>
    `,
  });
}
