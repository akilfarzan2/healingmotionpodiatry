'use server'

// Basic server-side validation for the contact form. This currently logs the
// enquiry server-side; wire this up to an email/notification integration
// (e.g. Resend) to actually deliver messages to info@healingmotionpodiatry.com.au.
export type ContactFormState = {
  status: 'idle' | 'success' | 'error'
  message?: string
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const phone = String(formData.get('phone') ?? '').trim()
  const message = String(formData.get('message') ?? '').trim()

  if (!name || !email || !message) {
    return { status: 'error', message: 'Please fill in your name, email, and message.' }
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(email)) {
    return { status: 'error', message: 'Please enter a valid email address.' }
  }

  console.log('[v0] New contact enquiry received:', { name, email, phone, message })

  return {
    status: 'success',
    message: "Thanks — we've received your enquiry and will get back to you shortly.",
  }
}
