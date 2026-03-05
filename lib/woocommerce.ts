import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { WooProduct, WooCategory } from "@/lib/woocommerce-types";
import { unstable_cache } from "next/cache";

// Ensure we always use the www version to avoid Vercel 308 redirects that break the API client
let wooUrl = process.env.NEXT_PUBLIC_WOOCOMMERCE_URL || "https://www.orient-relais.com";
if (wooUrl === "https://orient-relais.com") {
    wooUrl = "https://www.orient-relais.com";
}

// Initialize the WooCommerce API client (server-side only)
const client = new WooCommerceRestApi({
    url: wooUrl,
    consumerKey: process.env.WC_CONSUMER_KEY || "",
    consumerSecret: process.env.WC_CONSUMER_SECRET || "",
    version: "wc/v3",
    queryStringAuth: true // Force Basic Authentication via query string to bypass Apache header stripping
});

// ─── In-memory cache ──────────────────────────────────────────────
// Avoids redundant API calls during the same server lifetime.
// Next.js ISR (revalidate) handles cross-request caching.
const memoryCache = new Map<string, { data: unknown; expires: number }>();
const CACHE_TTL = 60 * 1000; // 1 minute (reduced for data entry phase)

function getCached<T>(key: string): T | null {
    const entry = memoryCache.get(key);
    if (entry && Date.now() < entry.expires) return entry.data as T;
    memoryCache.delete(key);
    return null;
}

function setCache<T>(key: string, data: T): void {
    memoryCache.set(key, { data, expires: Date.now() + CACHE_TTL });
}

// ─── Category ID cache ────────────────────────────────────────────
// WooCommerce category IDs don't change often, cache them aggressively.
const categoryIdCache = new Map<string, number>();

async function getCategoryId(slug: string): Promise<number | null> {
    if (categoryIdCache.has(slug)) return categoryIdCache.get(slug)!;

    try {
        const response = await client.get("products/categories", {
            slug,
            per_page: 10,
        });
        if (response.data.length > 0) {
            const id = response.data[0].id;
            categoryIdCache.set(slug, id);
            return id;
        }
    } catch (error) {
        console.error(`Error fetching category ID for "${slug}":`, error);
    }
    return null;
}

/**
 * Helper: generate a slug from a product name if the API returns empty slug.
 */
function ensureSlug(product: WooProduct): WooProduct {
    if (!product.slug && product.name) {
        product.slug = product.name
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");
    }
    return product;
}

/**
 * Fetch all products from WooCommerce.
 * Cached with Next.js ISR (revalidates every 60 seconds).
 */
export const fetchWooProducts = unstable_cache(
    async (page = 1, perPage = 100): Promise<WooProduct[]> => {
        const cacheKey = `all-products-${page}-${perPage}`;
        const cached = getCached<WooProduct[]>(cacheKey);
        if (cached) return cached;

        try {
            const allProducts: WooProduct[] = [];
            let currentPage = page;
            let hasMore = true;

            while (hasMore) {
                const response = await client.get("products", {
                    per_page: Math.min(perPage, 100),
                    page: currentPage,
                    status: "publish",
                });

                const products = (response.data as WooProduct[]).map(ensureSlug);
                allProducts.push(...products);

                const totalPages = parseInt(response.headers?.["x-wp-totalpages"] || "1", 10);
                hasMore = currentPage < totalPages;
                currentPage++;

                if (currentPage > 10) break;
            }

            setCache(cacheKey, allProducts);
            return allProducts;
        } catch (error) {
            console.error("Error fetching WooCommerce products:", error);
            return [];
        }
    },
    ["woo-all-products"],
    { revalidate: 60 } // Refresh every 60s
);

/**
 * Fetch a single product by slug (cached 60s)
 */
export const fetchWooProductBySlug = unstable_cache(
    async (slug: string): Promise<WooProduct | null> => {
        try {
            const response = await client.get("products", {
                slug: slug,
                status: "publish",
            });

            if (response.data.length > 0) {
                return ensureSlug(response.data[0]);
            }

            // Fallback: if slug search fails, try fetching all and matching
            const allProducts = await fetchWooProducts(1, 100);
            const match = allProducts.find(p => p.slug === slug);
            return match || null;
        } catch (error) {
            console.error(`Error fetching product with slug "${slug}":`, error);
            return null;
        }
    },
    ["woo-product-by-slug"],
    { revalidate: 60 }
);

/**
 * Fetch products by category slug (cached 60s)
 */
export const fetchWooProductsByCategory = unstable_cache(
    async (categorySlug: string): Promise<WooProduct[]> => {
        const cacheKey = `category-${categorySlug}`;
        const cached = getCached<WooProduct[]>(cacheKey);
        if (cached) return cached;

        try {
            const removeAccents = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            const normalizedSlug = removeAccents(categorySlug.toLowerCase());

            // Handle aliases (old slugs → new WooCommerce slugs)
            let searchSlug = normalizedSlug;
            if (normalizedSlug === "savons") searchSlug = "savons-dalep";
            if (normalizedSlug === "huiles") searchSlug = "huiles-essentielles";
            if (normalizedSlug === "complements-alimentaires") searchSlug = "complements";
            if (normalizedSlug === "soins") searchSlug = "soins-et-beaute";

            // Get category ID (cached permanently in memory)
            const categoryId = await getCategoryId(searchSlug);

            if (categoryId) {
                const response = await client.get("products", {
                    category: categoryId.toString(),
                    per_page: 100,
                    status: "publish",
                });
                const products = (response.data as WooProduct[]).map(ensureSlug);
                setCache(cacheKey, products);
                return products;
            }

            // Fallback: fetch all products and filter client-side
            const allProducts = await fetchWooProducts(1, 100);
            const filtered = allProducts.filter(p =>
                p.categories.some(c => {
                    const catSlugNorm = removeAccents(c.slug || "");
                    const catNameNorm = removeAccents(c.name.toLowerCase()).replace(/ /g, "-");
                    return catSlugNorm === searchSlug || catNameNorm === searchSlug;
                })
            );
            setCache(cacheKey, filtered);
            return filtered;
        } catch (error) {
            console.error(`Error fetching products for category "${categorySlug}":`, error);
            return [];
        }
    },
    ["woo-products-by-category"],
    { revalidate: 60 }
);

/**
 * Get featured products (cached 60s)
 */
export const getFeaturedWooProducts = unstable_cache(
    async (): Promise<WooProduct[]> => {
        try {
            const response = await client.get("products", {
                featured: true,
                per_page: 20,
                status: "publish",
            });
            const products = (response.data as WooProduct[]).map(ensureSlug);

            if (products.length === 0) {
                const fallback = await client.get("products", {
                    per_page: 8,
                    status: "publish",
                    orderby: "date",
                    order: "desc",
                });
                return (fallback.data as WooProduct[]).map(ensureSlug);
            }

            return products;
        } catch (error) {
            console.error("Error fetching featured products:", error);
            return [];
        }
    },
    ["woo-featured-products"],
    { revalidate: 60 }
);

/**
 * Get promotional products (cached 60s)
 */
export const getPromoWooProducts = unstable_cache(
    async (): Promise<WooProduct[]> => {
        try {
            const response = await client.get("products", {
                on_sale: true,
                per_page: 20,
                status: "publish",
            });
            return (response.data as WooProduct[]).map(ensureSlug);
        } catch (error) {
            console.error("Error fetching promo products:", error);
            return [];
        }
    },
    ["woo-promo-products"],
    { revalidate: 60 }
);

/**
 * Search products by query string (not cached — live results)
 */
export async function searchWooProducts(query: string): Promise<WooProduct[]> {
    if (!query || !query.trim()) return [];

    try {
        const response = await client.get("products", {
            search: query,
            per_page: 20,
            status: "publish",
        });
        return (response.data as WooProduct[]).map(ensureSlug);
    } catch (error) {
        console.error(`Error searching products for "${query}":`, error);
        return [];
    }
}
/**
 * Fetch all WooCommerce categories with images (cached 60s)
 */
export const fetchWooCategories = unstable_cache(
    async (): Promise<WooCategory[]> => {
        try {
            const response = await client.get("products/categories", {
                per_page: 100,
                hide_empty: false,
            });
            return (response.data as WooCategory[]).filter(
                (cat) => cat.slug !== "non-classe" && cat.slug !== "uncategorized"
            );
        } catch (error) {
            console.error("Error fetching WooCommerce categories:", error);
            return [];
        }
    },
    ["woo-categories"],
    { revalidate: 60 }
);

/**
 * Fetch a single WooCommerce category by slug (cached 60s)
 */
export const fetchWooCategoryBySlug = unstable_cache(
    async (slug: string): Promise<WooCategory | null> => {
        try {
            const response = await client.get("products/categories", {
                slug,
                per_page: 1,
            });
            if (response.data.length > 0) {
                return response.data[0] as WooCategory;
            }
            return null;
        } catch (error) {
            console.error(`Error fetching category "${slug}":`, error);
            return null;
        }
    },
    ["woo-category-by-slug"],
    { revalidate: 60 }
);

export default client;
