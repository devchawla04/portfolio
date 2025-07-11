import { NextResponse } from 'next/server'
import { Resend } from 'resend'

interface ContactRequestBody {
  name: string;
  email: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { message: 'Email service is not configured. Please try again later.' },
        { status: 500 }
      );
    }
    
    const resend = new Resend(apiKey);
    
    const body = await request.json() as ContactRequestBody
    const { name, email, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      )
    }

    await resend.emails.send({
      from: 'onboarding@resend.dev', 
      to: ['devchawla.04@gmail.com'], 
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="margin: 20px 0;">
            <p><strong style="color: #555;">Name:</strong> ${name}</p>
            <p><strong style="color: #555;">Email:</strong> ${email}</p>
            <p><strong style="color: #555;">Message:</strong></p>
            <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #007bff; margin: 10px 0;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            This message was sent from your portfolio contact form.
          </p>
        </div>
      `,
      replyTo: email
    })

    return NextResponse.json(
      { message: 'Message sent successfully!' },
      { status: 200 }
    )
  } catch (error: unknown) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { message: 'Sorry, there was an error sending your message. Please try again.' },
      { status: 500 }
    )
  }
} 