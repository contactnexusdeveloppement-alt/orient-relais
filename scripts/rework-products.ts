import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const client = new WooCommerceRestApi({
    url: process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://orient-relais.com",
    consumerKey: process.env.WC_CONSUMER_KEY || "",
    consumerSecret: process.env.WC_CONSUMER_SECRET || "",
    version: "wc/v3",
    queryStringAuth: true
});

const SKUS_TO_DELETE = [
    "C-HUI05NJ/6", // Elixir aux 3 huiles
    "COF08NJ/4",   // Coffret Mer Morte
    "COF04NJ/4-V2",// Coffret Cocooning
    "COF05NJ/4",   // Coffret Découverte
    "COF17NJ/4"    // Coffret Douceur Hiver
];

import { superProductsKeys } from "./seo-data";

// Type definition matches seo-data.ts
interface SuperProduct {
    name: string;
    sku: string;
    regular_price: string;
    category_names: string[];
    short_description: string;
    description: string;
    attributes: { name: string; options: string[]; visible?: boolean; variation?: boolean }[];
    tags: string[];
}

const superProducts = superProductsKeys as SuperProduct[];

async function syncProductsAndCleanUp() {
    console.log("🚀 Starting the deep product creation & cleanup script...");

    // 1. Fetch categories
    console.log("🔍 Loading categories...");
    let allCategories: any[] = [];
    let page = 1;
    while (true) {
        const { data } = await client.get("products/categories", { per_page: 100, page });
        allCategories = allCategories.concat(data);
        if (data.length < 100) break;
        page++;
    }

    const categoryMap = new Map<string, number>();
    for (const cat of allCategories) {
        categoryMap.set(cat.name.toLowerCase(), cat.id);
    }

    async function getOrCreateCategoryId(name: string): Promise<number> {
        const lowerName = name.toLowerCase();
        if (categoryMap.has(lowerName)) {
            return categoryMap.get(lowerName)!;
        }

        console.log(`➕ Creating category: ${name}`);
        const { data } = await client.post("products/categories", { name });
        categoryMap.set(lowerName, data.id);
        return data.id;
    }

    // 2. Fetch all products
    console.log("🔍 Loading existing products...");
    let existingProducts: any[] = [];
    page = 1;
    while (true) {
        const { data } = await client.get("products", { per_page: 100, page, status: 'any' });
        existingProducts = existingProducts.concat(data);
        if (data.length < 100) break;
        page++;
    }

    // MAP of SKU -> ProductID for easy lookup
    const skuToId = new Map(existingProducts.filter(p => p.sku).map(p => [p.sku, p.id]));

    // 3. DELETE requested Products
    console.log("\\n🗑️  Starting Deletions of 5 unwanted products...");
    for (const skuToDelete of SKUS_TO_DELETE) {
        if (skuToId.has(skuToDelete)) {
            const id = skuToId.get(skuToDelete);
            console.log(`🧨 Deleting SKU ${skuToDelete} (ID: ${id})...`);
            try {
                await client.delete(`products/${id}`, { force: true });
                console.log(`✅ Deleted successfully.`);
                skuToId.delete(skuToDelete);
            } catch (err: any) {
                console.error(`❌ Failed to delete ${skuToDelete}:`, err.response?.data?.message || err.message);
            }
        } else {
            console.log(`⏭️  SKU ${skuToDelete} not found in database, skip delete.`);
        }
    }

    // 4. UPSERT (Update/Create) 19 Products with SEO descriptions
    console.log("\\n📦 Starting Creation & Enrichment of 19 Products...");
    let updatedCount = 0;
    let createdCount = 0;

    for (const pConfig of superProducts) {
        // Prepare payload
        const categoryIds = [];
        for (const catName of pConfig.category_names) {
            categoryIds.push({ id: await getOrCreateCategoryId(catName) });
        }

        const productData = {
            name: pConfig.name,
            sku: pConfig.sku,
            regular_price: pConfig.regular_price,
            short_description: pConfig.short_description,
            description: pConfig.description,
            categories: categoryIds,
            tags: pConfig.tags.map(t => ({ name: t })),
            attributes: pConfig.attributes.map(attr => ({
                name: attr.name,
                visible: attr.visible !== false,
                variation: attr.variation || false,
                options: attr.options
            }))
        };

        if (skuToId.has(pConfig.sku)) {
            // Update
            const pId = skuToId.get(pConfig.sku);
            console.log(`✏️  Updating SEO for SKU: ${pConfig.sku} (ID: ${pId})...`);
            try {
                await client.put(`products/${pId}`, productData);
                updatedCount++;
            } catch (err: any) {
                console.error(`❌ Update failed for ${pConfig.sku}:`, err.response?.data?.message || err.message);
            }
        } else {
            // Create
            console.log(`➕ Creating new product SKU: ${pConfig.sku}...`);
            try {
                await client.post("products", { ...productData, type: "simple", status: "draft", tax_status: "taxable" });
                createdCount++;
            } catch (err: any) {
                console.error(`❌ Creation failed for ${pConfig.sku}:`, err.response?.data?.message || err.message);
            }
        }
    }

    console.log(`\\n🎉 Script finished!\\n- Deleted: ${SKUS_TO_DELETE.length} SKUs attempted.\\n- Updated: ${updatedCount} products with deep SEO.\\n- Created: ${createdCount} new products.\\nTotal valid products: 19.`);
}

syncProductsAndCleanUp().catch(console.error);
