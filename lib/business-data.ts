// Central source of truth for business info, used across metadata, JSON-LD,
// and page content. Swap this out for Sanity CMS queries later without
// touching the component/schema code that consumes it.

export const business = {
  name: 'Healing Motion Podiatry',
  legalName: 'Healing Motion Podiatry',
  practitioner: {
    name: 'Husein Alzurifi',
    credentials: 'Podiatrist',
    title: 'Podiatrist & Clinic Director',
  },
  phone: '0415 595 956',
  phoneDisplay: '0415 595 956',
  phoneIntl: '+61415 595 956',
  email: 'info@healingmotionpodiatry.com.au',
  address: {
    street: 'Shop 25E/250 Somerton Rd',
    suburb: 'Roxburgh Park',
    state: 'VIC',
    postcode: '3064',
    country: 'AU',
    countryName: 'Australia',
  },
  hours: [
    { day: 'Monday', open: '09:00', close: '17:00' },
    { day: 'Tuesday', open: '09:00', close: '17:00' },
    { day: 'Wednesday', open: '09:00', close: '17:00' },
    { day: 'Thursday', open: '09:00', close: '17:00' },
    { day: 'Friday', open: '09:00', close: '17:00' },
    { day: 'Saturday', open: '09:00', close: '17:00' },
  ],
  hoursDisplay: 'Monday – Saturday, 9:00 AM – 5:00 PM',
  siteUrl: 'https://www.healingmotionpodiatry.com',
} as const

export const fullAddress = `${business.address.street}, ${business.address.suburb} ${business.address.state} ${business.address.postcode}`

// Placeholder services — to be replaced by Sanity CMS content.
// Kept intentionally generic and clearly structured so swapping the data
// source later is a drop-in replacement.
export const services = [
  {
    slug: 'general-podiatry',
    name: 'General Podiatry',
    summary:
      'Routine foot care and check-ups to keep your feet healthy, including nail and skin care.',
  },
  {
    slug: 'ingrown-toenails',
    name: 'Ingrown Toenail Treatment',
    summary:
      'Assessment and treatment of painful ingrown toenails, including minor procedures where needed.',
  },
  {
    slug: 'diabetic-foot-care',
    name: 'Diabetic Foot Care',
    summary:
      'Regular diabetic foot assessments to monitor circulation, sensation, and skin health.',
  },
  {
    slug: 'custom-orthotics',
    name: 'Custom Orthotics',
    summary:
      'Biomechanical assessment and custom-fitted orthotics to support posture and movement.',
  },
  {
    slug: 'sports-injuries',
    name: 'Sports Injury Management',
    summary:
      'Diagnosis and rehabilitation for foot and ankle injuries related to sport and exercise.',
  },
  {
    slug: 'heel-pain',
    name: 'Heel & Arch Pain',
    summary:
      'Treatment for heel pain and plantar fasciitis using evidence-based podiatric care.',
  },
] as const

export const faqs = [
  {
    question: 'Where is Healing Motion Podiatry located?',
    answer: `Healing Motion Podiatry is located at ${fullAddress}, in the Somerton Road shopping precinct in Roxburgh Park.`,
  },
  {
    question: 'What are your opening hours?',
    answer: `We're open Monday to Saturday, 9:00 AM to 5:00 PM. We're closed Sundays and public holidays.`,
  },
  {
    question: 'Do I need a referral to see a podiatrist?',
    answer:
      'No referral is needed to book a general podiatry appointment. If you have an EPC (Enhanced Primary Care) referral from your GP, bring it along as you may be eligible for a Medicare rebate.',
  },
  {
    question: 'What should I bring to my first appointment?',
    answer:
      'Please bring any relevant referrals, your Medicare and private health insurance cards, a list of current medications, and the footwear you wear most often.',
  },
  {
    question: 'How do I book an appointment?',
    answer: `You can call us directly on ${business.phoneDisplay} or send an enquiry through our contact form and we'll get back to you promptly.`,
  },
] as const
