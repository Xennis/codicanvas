import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { appBrandColor, appDescription, appName, host } from "@/lib/config"
import { cn } from "@/lib/tw"
import { UmamiAnalytics } from "@/components/umami-analytics"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  description: appDescription,
  openGraph: {
    description: appDescription,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
      {
        url: "/og-image-square.png",
        width: 400,
        height: 400,
      },
    ],
    title: {
      default: appName,
      template: `%s - ${appName}`,
    },
    type: "website",
    siteName: appName,
  },
  metadataBase: new URL(`https://${host}`),
  robots: {
    index: true,
    follow: true,
  },
  title: {
    default: appName,
    template: `%s - ${appName}`,
  },
}

export const viewport: Viewport = {
  themeColor: appBrandColor,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background-100 h-full" suppressHydrationWarning>
      <body className={cn(inter.className, "h-full")} suppressHydrationWarning>
        {children}
        <UmamiAnalytics />
      </body>
    </html>
  )
}
