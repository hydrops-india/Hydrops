import type { Metadata } from "next";
import { cormorant, dmSans } from "@/lib/fonts";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { getWhatsAppConfig } from "@/lib/sanity/fetch";
import { WhatsAppConfigProvider } from "@/components/global/WhatsAppConfigProvider";
import { FloatingWhatsAppButton } from "@/components/global/FloatingWhatsAppButton";
import { generateOrganizationSchema } from "@/lib/schema/organization";
import { generateWebsiteSchema } from "@/lib/schema/website";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL.startsWith('http')
    ? process.env.NEXT_PUBLIC_SITE_URL
    : `https://${process.env.NEXT_PUBLIC_SITE_URL}`
  : "https://hydropsindia.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
   verification: {
    google: "K93WaQlnc5-ZunsXhMCDaHpKGZQ7PG8MORtu_zZ5-pI"
  },
  alternates: {
    canonical: "https://hydropsindia.com",
  },
  title: {
    default: "Hydrops — Pure Coconut Oil · India",
    template: "%s | Hydrops",
  },
  description:
    "Hydrops delivers crystal-clear, double-filtered virgin coconut oil crafted with precision in India. Naturally pure. Carefully refined.",
  keywords: ["coconut oil", "virgin coconut oil", "pure coconut oil", "Hydrops", "India"],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [{ url: "/icon.png",sizes: "32x32", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    siteName: "Hydrops",
    title: "Hydrops — Pure Coconut Oil · India",
    description:
      "Crystal-clear, double-filtered virgin coconut oil. Naturally pure. Carefully refined.",
    url: "https://hydropsindia.com",
    images: [{ url: "https://hydropsindia.com/images/brand/logo.png", width: 1200, height: 630, alt: "Hydrops Pure Coconut Oil" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hydrops — Pure Coconut Oil · India",
    description: "Crystal-clear, double-filtered virgin coconut oil. Naturally pure.",
    images: ["https://hydropsindia.com/images/brand/logo.png"],
    creator: "@hydropsindia",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const whatsappConfig = await getWhatsAppConfig();
  const orgSchema = generateOrganizationSchema();
  const siteSchema = generateWebsiteSchema();

  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col" suppressHydrationWarning>
        <ThemeProvider>
          <WhatsAppConfigProvider value={whatsappConfig}>
            {children}
            <FloatingWhatsAppButton config={whatsappConfig} />
          </WhatsAppConfigProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

