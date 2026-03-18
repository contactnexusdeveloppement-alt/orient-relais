import type { MetadataRoute } from "next";
import { fetchWooProducts } from "@/lib/woocommerce";
import { ARTICLES } from "@/data/articles";

const BASE_URL = "https://www.orient-relais.com";

// Only include categories that have actual products published
const CATEGORIES = [
    { slug: "savons-dalep" },
    { slug: "huiles-essentielles" },
    { slug: "complements" },
    { slug: "cosmetiques" },
    { slug: "soins-et-beaute" },
    { slug: "coffrets" },
    { slug: "miel" },
    { slug: "accessoires" },
    // "epicerie-orientale" and "idees-cadeaux" excluded until they have products
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const products = await fetchWooProducts(1, 100);

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
        { url: `${BASE_URL}/boutique`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
        { url: `${BASE_URL}/a-propos`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
        { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
        { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
        { url: `${BASE_URL}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
        { url: `${BASE_URL}/cgv`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
        { url: `${BASE_URL}/mentions-legales`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
        { url: `${BASE_URL}/confidentialite`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
    ];

    // Category pages
    const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
        url: `${BASE_URL}/categorie/${cat.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));

    // Product pages
    const productPages: MetadataRoute.Sitemap = products.map((product) => ({
        url: `${BASE_URL}/produit/${product.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
    }));

    // Blog articles
    const blogPages: MetadataRoute.Sitemap = ARTICLES.map((article) => ({
        url: `${BASE_URL}/blog/${article.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
    }));

    return [...staticPages, ...categoryPages, ...productPages, ...blogPages];
}
