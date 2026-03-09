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

async function diagnostic() {
    console.log("--- DIAGNOSTIC CATEGORIES ---");
    const { data: categories } = await client.get("products/categories", { per_page: 100 });
    categories.forEach((c: any) => {
        console.log(`Name: ${c.name} | Slug: ${c.slug} | ID: ${c.id}`);
    });

    console.log("\n--- DIAGNOSTIC PRODUITS ---");
    const { data: products } = await client.get("products", { per_page: 100 });
    console.log(`Total products fetched (limit 100): ${products.length}`);
    const statusCounts = products.reduce((acc: any, p: any) => {
        acc[p.status] = (acc[p.status] || 0) + 1;
        return acc;
    }, {});
    console.log("Status counts:", statusCounts);

    if (products.length > 0) {
        console.log("\nSample product categories:");
        products.slice(0, 5).forEach((p: any) => {
            console.log(`- ${p.name}: ${p.categories.map((c: any) => c.slug).join(", ")}`);
        });
    }
}

diagnostic().catch(console.error);
