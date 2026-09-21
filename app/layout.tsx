import type { Metadata } from "next";
import { Anton, Inter, Noto_Sans_Devanagari } from "next/font/google";
import { I18nProvider } from "@/components/providers/I18nProvider";
import { SiteThemeProvider } from "@/components/providers/SiteThemeProvider";
import { FontScaleProvider } from "@/components/providers/FontScaleProvider";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "optional",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "optional",
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  weight: ["400", "700"],
  subsets: ["devanagari", "latin"],
  variable: "--font-devanagari",
  display: "optional",
});

// TODO: og-image-placeholder.png is a composed placeholder banner (brand
// wordmark + tagline + colors, no real photography) — swap for a real
// hero-photography-based image once that's available, and update the
// alt text / filename together with it so this doesn't quietly become
// permanent.
const ogImage = {
  url: "/og-image-placeholder.png",
  width: 1200,
  height: 630,
  alt: "Paras Enterprises — Security & Automation Solutions in Bilaspur",
};

const siteTitle = "Paras Enterprises | Security & Automation Solutions in Bilaspur";
const siteDescription =
  "25+ years of trusted security and automation solutions in Bilaspur, Chhattisgarh. Free site survey available.";

export const metadata: Metadata = {
  title: siteTitle,
  description:
    "Trusted security and automation solutions in Bilaspur since 1999. CCTV, biometrics, home automation, networking, and more. 25+ years, 8,000+ installations. Get a free site survey today.",
  metadataBase: new URL("https://parasenterprises.web.app"),
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: "website",
    locale: "en_IN",
    url: "https://parasenterprises.web.app",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [ogImage.url],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${anton.variable} ${inter.variable} ${notoSansDevanagari.variable}`}>
      <body className="antialiased">
        <I18nProvider>
          <SiteThemeProvider>
            <FontScaleProvider>{children}</FontScaleProvider>
          </SiteThemeProvider>
        </I18nProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HomeAndConstructionBusiness",
              name: "Paras Enterprises",
              image: ogImage.url,
              telephone: ["+91 9425530470", "+91 9826598526"],
              email: ["parashitesh@gmail.com", "parashitesh@yahoo.com"],
              address: {
                "@type": "PostalAddress",
                streetAddress:
                  "Shop No. 26, Ground Floor, Ambe Anjani E Plaza, CMD Chowk, near Apollo City Center",
                addressLocality: "Bilaspur",
                addressRegion: "Chhattisgarh",
                postalCode: "495001",
                addressCountry: "IN",
              },
              areaServed: "Bilaspur and nearby areas",
              foundingDate: "1999",
              description:
                "Security systems and automation solutions provider serving Bilaspur since 1999 — CCTV, biometric access, home automation, networking, and more.",
            }),
          }}
        />
      </body>
    </html>
  );
}
