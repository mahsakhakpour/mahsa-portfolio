// src/pages/api/contact.ts
import type { NextApiRequest, NextApiResponse } from "next";

type Data = { message: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Missing fields" });
  }

  // Here you can send an email using nodemailer
  // or save the message to a database

  try {
    // Example: nodemailer setup
    /*
    import nodemailer from "nodemailer";

    const transporter = nodemailer.createTransport({
      host: "smtp.example.com",
      port: 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: email,
      to: "mahsa54@gmail.com",
      subject: `New message from ${name}`,
      text: message,
    });
    */

    // For now just return success
    return res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}