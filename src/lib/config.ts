// Host & URL
export const host = process.env.NEXT_PUBLIC_HOST || "codicanvas.com"

// App
export const appName = "CodiCanvas"
export const appNameParts = ["Codi", "Canvas"] as const
export const appBrandColor = "#059669" // emerald-600
export const appDescription = "Create beautiful code snippets."

// Pages
export const homePage = "/"
export const fileIcon = (filename: string) => `/file-icons/${filename}`

// Configured in CMS:
export const legalNoticesPage = "/legal"
export const privacyPage = "/privacy"
