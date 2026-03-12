import { unstable_cache } from "next/cache";
import client, { fetchWooProducts } from "./woocommerce";
import { WooBrand } from "./woocommerce-types";

/**
 * Fetch all unique brands from products attributes or product_brand taxonomy
 */
export const fetchWooBrands = unstable_cache(
    async (): Promise<WooBrand[]> => {
        try {
            // First, try the official WooCommerce Brands REST API endpoint or WP REST API
            // Perfect Brands and WooCommerce Brands plugins often expose this endpoint
            try {
                const brandResponse = await client.get("products/brands", { hide_empty: false });
                if (brandResponse.data && brandResponse.data.length > 0) {
                    return brandResponse.data.map((b: any) => ({
                        id: b.id,
                        name: b.name,
                        slug: b.slug,
                        description: b.description,
                        count: b.count,
                        // Pluck image from the standard meta structure for brands taxonomy
                        image: b.image ? (typeof b.image === 'string' ? b.image : b.image.src) : null
                    })).sort((a: WooBrand, b: WooBrand) => a.name.localeCompare(b.name));
                }
            } catch (err) {
                // Endpoint might not exist or plugin disabled API, we silently fallback
                console.log("WooCommerce /products/brands endpoint not available, falling back to local attributes.");
            }

            // Fallback 1: Extract from local product attributes named "Marque"
            const products = await fetchWooProducts(1, 100);
            const brandSet = new Set<string>();
            const brands: WooBrand[] = [];

            products.forEach(product => {
                if (!product.attributes) return;

                const brandAttr = product.attributes.find(
                    attr => attr.name.toLowerCase() === 'marque' || attr.name.toLowerCase() === 'marques'
                );

                if (brandAttr && brandAttr.options && brandAttr.options.length > 0) {
                    brandAttr.options.forEach(option => {
                        const trimmedName = option.trim();
                        if (trimmedName && !brandSet.has(trimmedName)) {
                            brandSet.add(trimmedName);
                            const slug = trimmedName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
                            brands.push({ id: brands.length + 1, name: trimmedName, slug: slug, image: null });
                        }
                    });
                }
            });

            if (brands.length > 0) {
                return brands.sort((a, b) => a.name.localeCompare(b.name));
            }

            // Fallback 2: Visual defaults so the carousel isn't blank during launch
            return [
                { id: 1, name: "Ayur-vana", slug: "ayur-vana" },
                { id: 2, name: "Florame", slug: "florame" },
                { id: 3, name: "Terra Etica", slug: "terra-etica" },
                { id: 4, name: "Najel", slug: "najel" }
            ];

        } catch (error) {
            console.error("Error extracting WooCommerce brands:", error);
            return [];
        }
    },
    ["woo-brands-taxonomy"],
    { revalidate: 3600 } // Cache for 1 hour
);
