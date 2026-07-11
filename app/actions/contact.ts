 
'use server';

import { supabase } from '@/lib/supabase';
import nodemailer from 'nodemailer';

export async function submitContactForm(formData: FormData) { 
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const subject = formData.get('subject') as string;
  const payload = formData.get('payload') as string;

  if (!name || !email || !payload) {
    return { error: 'Missing required parameters.' };
  }
 
  const { error: dbError } = await supabase
    .from('messages')
    .insert([{ name, email, subject, payload }]);

  if (dbError) {
    console.error('Supabase Error:', dbError); 
  }
 
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_PORT === '465',  
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
 
  try {
    await transporter.sendMail({
      from: `"Adalupe Interface" <${process.env.SMTP_USER}>`,
      to: process.env.RECEIVER_EMAIL,  
      replyTo: email,  
      subject: `New Transmission: ${subject} - from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${payload}`,
      html: `
        <div style="font-family: monospace; background: #111; color: #ccc; padding: 20px;">
          <h2 style="color: #fff; border-bottom: 1px solid #555; padding-bottom: 10px;">New Transmission Received</h2>
          <p><strong>Identification:</strong> ${name}</p>
          <p><strong>Return Address:</strong> ${email}</p>
          <p><strong>Subject Parameter:</strong> ${subject}</p>
          <br/>
          <p style="color: #fff;"><strong>Data Payload:</strong></p>
          <div style="background: #222; padding: 15px; border-left: 2px solid #C0C0C0;">
            ${payload.replace(/\n/g, '<br>')}
          </div>
        </div>
      `,
    });

    return { success: true };
  } catch (emailError) {
    console.error('SMTP Error:', emailError);
    return { error: 'Database updated, but SMTP transmission failed.' };
  }
}