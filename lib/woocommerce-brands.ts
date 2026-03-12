import { unstable_cache } from "next/cache";
import { fetchWooProducts } from "./woocommerce";
import { WooBrand } from "./woocommerce-types";

/**
 * Fetch all unique brands from products attributes
 * Since 'Marque' is often a local attribute (ID: 0) instead of a global taxonomy `pa_marque`,
 * we extract unique brand names from the cached products list.
 */
export const fetchWooBrands = unstable_cache(
    async (): Promise<WooBrand[]> => {
        try {
            // Fetch a large number of products to ensure we get all brands
            // fetchWooProducts is already cached and optimized
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
                            // Generate a simple slug from the name
                            const slug = trimmedName
                                .toLowerCase()
                                .normalize("NFD")
                                .replace(/[\u0300-\u036f]/g, "")
                                .replace(/[^a-z0-9]+/g, "-")
                                .replace(/^-|-$/g, "");
                                
                            brands.push({
                                id: brands.length + 1, // Fake ID since it's a local attribute
                                name: trimmedName,
                                slug: slug,
                                image: null // Images are not native to local attributes. Would need ACF or a Brand plugin to fetch.
                            });
                        }
                    });
                }
            });
            
            // If no brands found, return some fallback defaults so the carousel isn't empty
            if (brands.length === 0) {
                return [
                     { id: 1, name: "Ayur-vana", slug: "ayur-vana" },
                     { id: 2, name: "Florame", slug: "florame" },
                     { id: 3, name: "Terra Etica", slug: "terra-etica" },
                     { id: 4, name: "Najel", slug: "najel" }
                ];
            }
            
            return brands.sort((a, b) => a.name.localeCompare(b.name));
            
        } catch (error) {
            console.error("Error extracting WooCommerce brands:", error);
            return [];
        }
    },
    ["woo-brands"],
    { revalidate: 3600 } // Cache for 1 hour
);
