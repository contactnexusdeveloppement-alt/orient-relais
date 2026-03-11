import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";
import { ClientLayout } from "@/components/layout/ClientLayout";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: {
    default: "Orient Relais - Boutique Bio | Savons d'Alep & Produits Naturels",
    template: "%s | Orient Relais"
  },
  description: "Boutique en ligne de produits bio : savons d'Alep authentiques, huiles essentielles Terra Etica, compléments alimentaires naturels. Livraison offerte dès 39€.",
  keywords: ["savon d'Alep", "bio", "huiles essentielles", "compléments alimentaires", "naturel", "MAUREPAS", "Orient Relais"],
  authors: [{ name: "Orient Relais" }],
  creator: "Orient Relais",
  metadataBase: new URL("https://orient-relais.com"),
  verification: {
    google: "A-Qmi4ToRRQHKQKeC08Keee6qaH-nlLjodb1uL7VHM0",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Orient Relais",
    images: [
      {
        url: "/images/logo-new.png",
        width: 512,
        height: 512,
        alt: "Orient Relais - Boutique Bio",
      },
    ],
  },
  twitter: {
    card: "summary",
    images: ["/images/logo-new.png"],
  },
  icons: {
    icon: [
      { url: "/images/logo-new.png" },
      { url: "/images/logo-new.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/images/logo-new.png" },
    ],
    shortcut: "/images/logo-new.png",
  },
};

import { fetchWooCategories } from "@/lib/woocommerce";
import { WooCategory } from "@/lib/woocommerce-types";

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  // Fetch categories for the header navigation
  let categories: WooCategory[] = [];
  try {
    categories = await fetchWooCategories();
    // console.log(`Layout fetched ${categories.length} categories`);
  } catch (error) {
    console.error("Failed to fetch categories in RootLayout:", error);
  }

  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${playfair.variable} ${manrope.variable} antialiased flex flex-col min-h-screen font-sans`}>
        {/* Organization + WebSite JSON-LD for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "Orient Relais",
                url: "https://orient-relais.com",
                logo: "https://orient-relais.com/images/logo-new.png",
                description: "Boutique en ligne de produits bio : savons d'Alep authentiques, huiles essentielles, compléments alimentaires naturels.",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "48 avenue de Touraine",
                  addressLocality: "MAUREPAS",
                  postalCode: "78310",
                  addressCountry: "FR",
                },
                contactPoint: {
                  "@type": "ContactPoint",
                  telephone: "+33699556977",
                  contactType: "customer service",
                  availableLanguage: "French",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "Orient Relais",
                url: "https://orient-relais.com",
                potentialAction: {
                  "@type": "SearchAction",
                  target: "https://orient-relais.com/boutique?search={search_term_string}",
                  "query-input": "required name=search_term_string",
                },
              },
            ]),
          }}
        />
        <ClientLayout categories={categories}>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}

