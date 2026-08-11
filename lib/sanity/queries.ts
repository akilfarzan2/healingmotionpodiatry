import { groq } from 'next-sanity'

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  name,
  legalName,
  phoneDisplay,
  phoneIntl,
  email,
  siteUrl,
  hoursDisplay,
  address,
  hours
}`

export const practitionerQuery = groq`*[_type == "practitioner"][0]{
  name,
  credentials,
  title,
  bio,
  photo
}`

export const heroSectionQuery = groq`*[_type == "heroSection"][0]{
  badge,
  headline,
  subheading,
  image,
  imageAlt
}`

export const aboutSectionQuery = groq`*[_type == "aboutSection"][0]{
  heading,
  body,
  image,
  imageAlt,
  points
}`

export const servicesQuery = groq`*[_type == "service"] | order(order asc){
  name,
  "slug": slug.current,
  summary,
  icon,
  order
}`

export const faqsQuery = groq`*[_type == "faq"] | order(order asc){
  question,
  answer,
  order
}`
