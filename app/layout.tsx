import type { Metadata } from "next";
import { Anton, Inter, Noto_Sans_Devanagari } from "next/font/google";
import { I18nProvider } from "@/components/providers/I18nProvider";
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

export const metadata: Metadata = {
  title: "Paras Enterprises | Security & Automation Solutions in Bilaspur",
  description:
    "Trusted security and automation solutions in Bilaspur since 1999. CCTV, biometrics, home automation, networking, and more. 25+ years, 8,000+ installations. Get a free site survey today.",
  metadataBase: new URL("https://parasent.web.app"),
  openGraph: {
    title: "Paras Enterprises | Security & Automation Solutions in Bilaspur",
    description:
      "25+ years of trusted security and automation solutions in Bilaspur, Chhattisgarh. Free site survey available.",
    type: "website",
    locale: "en_IN",
    url: "https://parasent.web.app",
    images: ["/og-placeholder.png"],
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
        <I18nProvider>{children}</I18nProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HomeAndConstructionBusiness",
              name: "Paras Enterprises",
              image: "/og-placeholder.png",
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
