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
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${playfair.variable} ${manrope.variable} antialiased flex flex-col min-h-screen font-sans`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}

