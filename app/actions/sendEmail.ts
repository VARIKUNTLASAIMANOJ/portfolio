"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const message = formData.get("message") as string

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set")
    return { success: false, message: "Email configuration error" }
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "varikuntlasaimanoj@gmail.com", // Your verified email
      subject: "New message from your portfolio",
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    })

    if (error) {
      console.error("Error sending email:", error)
      return { success: false, message: "Failed to send email. Please try again." }
    }

    console.log("Email sent successfully:", data)
    return { success: true, message: "Email sent successfully!" }
  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, message: "An unexpected error occurred. Please try again." }
  }
}

