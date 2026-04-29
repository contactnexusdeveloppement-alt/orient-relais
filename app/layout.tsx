import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ClientLayout } from "@/components/layout/ClientLayout";
import { jsonLdScript } from "@/lib/json-ld";

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
    default: "Orient Relais — Boutique Bio à Maurepas (Yvelines) | Savons d'Alep, Huiles Essentielles, Cosmétiques Bio",
    template: "%s | Orient Relais — Boutique Bio Maurepas",
  },
  description: "Boutique en ligne de produits bio : savons d'Alep authentiques, huiles essentielles Terra Etica, compléments alimentaires naturels. Livraison offerte dès 39€.",
  keywords: ["savon d'Alep bio", "cosmétiques bio", "huiles essentielles bio", "compléments ayurvédiques", "boutique bio Maurepas", "boutique bio Yvelines", "herboristerie 78310", "Orient Relais"],
  authors: [{ name: "Orient Relais" }],
  creator: "Orient Relais",
  metadataBase: new URL("https://www.orient-relais.com"),
  // Each page declares its own alternates.canonical; we intentionally do not
  // set a layout-level canonical (otherwise every route would point back to
  // the homepage and Google would dedupe all our pages away).
  verification: {
    google: "A-Qmi4ToRRQHKQKeC08Keee6qaH-nlLjodb1uL7VHM0",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Orient Relais",
    // og:image comes from app/opengraph-image.jpg (file-based Metadata API).
  },
  twitter: {
    // summary_large_image renders the full OpenGraph image on Twitter/X
    // instead of a tiny 144 px square, which for an e-commerce share matters.
    card: "summary_large_image",
  },
  // Icons come from app/icon.png, app/apple-icon.png (file-based convention).
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
      <head>
        {/* Preload the hero image so the browser starts fetching it before
            the Next.js image optimizer request; big LCP win on mobile. */}
        <link
          rel="preload"
          as="image"
          href="/hero.webp"
          fetchPriority="high"
        />
        {/* Preconnect to the domains we hit on first paint */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TKE6MX2P5G"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-TKE6MX2P5G');`}
        </Script>
      </head>
      <body className={`${playfair.variable} ${manrope.variable} antialiased flex flex-col min-h-screen font-sans`}>
        {/* Organization + WebSite JSON-LD for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLdScript([
              {
                // Single merged business entity: Store + HealthAndBeautyBusiness
                // is the most precise schema.org pair for a brick-and-mortar
                // organic shop. Subsumes the previous duplicate Organization
                // + LocalBusiness blocks.
                "@context": "https://schema.org",
                "@type": ["Store", "HealthAndBeautyBusiness"],
                "@id": "https://www.orient-relais.com/#business",
                name: "Orient Relais",
                alternateName: "Orient Relais — Boutique Bio Maurepas",
                slogan: "L'Orient naturel, livré chez vous",
                description: "Boutique bio à Maurepas (Yvelines) et en ligne, spécialisée en savons d'Alep authentiques Najel, huiles essentielles bio Terra Etica, cosmétiques naturels et compléments ayurvédiques. Click & Collect gratuit en boutique.",
                url: "https://www.orient-relais.com",
                image: "https://www.orient-relais.com/images/Logo_respon.png",
                logo: "https://www.orient-relais.com/images/logo-new.png",
                telephone: "+33699556977",
                email: "contact@orient-relais.com",
                priceRange: "€€",
                currenciesAccepted: "EUR",
                paymentAccepted: "Cash, Credit Card, Apple Pay, Google Pay",
                foundingDate: "2024",
                knowsAbout: [
                  "Savon d'Alep bio",
                  "Huiles essentielles bio",
                  "Cosmétiques bio",
                  "Compléments ayurvédiques",
                  "Herboristerie",
                  "Aromathérapie",
                  "Najel",
                  "Terra Etica",
                ],
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "48 avenue de Touraine",
                  addressLocality: "Maurepas",
                  postalCode: "78310",
                  addressRegion: "Yvelines",
                  addressCountry: "FR",
                },
                geo: {
                  "@type": "GeoCoordinates",
                  latitude: 48.7642,
                  longitude: 1.9393,
                },
                hasMap: "https://www.google.com/maps/search/?api=1&query=48+avenue+de+Touraine+78310+Maurepas",
                areaServed: [
                  { "@type": "AdministrativeArea", name: "Yvelines" },
                  { "@type": "AdministrativeArea", name: "Île-de-France" },
                  { "@type": "Country", name: "France" },
                ],
                contactPoint: {
                  "@type": "ContactPoint",
                  telephone: "+33699556977",
                  contactType: "customer service",
                  email: "contact@orient-relais.com",
                  availableLanguage: ["French"],
                },
                openingHoursSpecification: [
                  {
                    "@type": "OpeningHoursSpecification",
                    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                    opens: "09:00",
                    closes: "18:00",
                  },
                ],
                availableDeliveryMethod: [
                  "https://purl.org/goodrelations/v1#DeliveryModeMail",
                  "https://purl.org/goodrelations/v1#DeliveryModePickUp",
                ],
                sameAs: [
                  "https://www.facebook.com/profile.php?id=61576602865759",
                  "https://www.instagram.com/orientrelais/",
                ],
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "@id": "https://www.orient-relais.com/#website",
                name: "Orient Relais",
                url: "https://www.orient-relais.com",
                publisher: { "@id": "https://www.orient-relais.com/#business" },
                potentialAction: {
                  "@type": "SearchAction",
                  target: "https://www.orient-relais.com/recherche?q={search_term_string}",
                  "query-input": "required name=search_term_string",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "SiteNavigationElement",
                name: "Navigation principale",
                hasPart: [
                  { "@type": "WebPage", name: "Savons d'Alep", url: "https://www.orient-relais.com/categorie/savons-dalep" },
                  { "@type": "WebPage", name: "Huiles Essentielles", url: "https://www.orient-relais.com/categorie/huiles-essentielles" },
                  { "@type": "WebPage", name: "Complements Alimentaires", url: "https://www.orient-relais.com/categorie/complements" },
                  { "@type": "WebPage", name: "Soins et Beaute", url: "https://www.orient-relais.com/categorie/soins-et-beaute" },
                  { "@type": "WebPage", name: "Coffrets Cadeaux", url: "https://www.orient-relais.com/categorie/coffrets" },
                  { "@type": "WebPage", name: "Epicerie Orientale", url: "https://www.orient-relais.com/categorie/epicerie-orientale" },
                ],
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

