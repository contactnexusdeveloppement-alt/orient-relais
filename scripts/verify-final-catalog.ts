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

async function listProducts() {
    let allProducts: any[] = [];
    let page = 1;
    while (true) {
        const { data } = await client.get("products", { per_page: 100, page });
        allProducts = allProducts.concat(data);
        if (data.length < 100) break;
        page++;
    }
    console.log(`Total Products in DB: ${allProducts.length}`);
    allProducts.forEach(p => {
        console.log(`- [${p.status}] ${p.name} (SKU: ${p.sku})`);
    });
}

listProducts().catch(console.error);
