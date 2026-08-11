// Project ID and dataset name are not secret — they're visible in any
// request the frontend makes to the Sanity API — so it's safe to fall back
// to this project's known values when the env vars aren't set.
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'h6u8gntr'

export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-01-01'
