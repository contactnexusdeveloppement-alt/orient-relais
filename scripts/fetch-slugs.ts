import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const client = new WooCommerceRestApi({
    url: process.env.NEXT_PUBLIC_WOOCOMMERCE_URL || "https://orient-relais.com",
    consumerKey: process.env.WC_CONSUMER_KEY || "",
    consumerSecret: process.env.WC_CONSUMER_SECRET || "",
    version: "wc/v3",
});

async function run() {
    console.log("Fetching products...");
    let allProducts: any[] = [];
    let page = 1;

    try {
        while (true) {
            const { data } = await client.get("products", { per_page: 50, page, status: "publish", _fields: "id,name,slug" });
            allProducts = allProducts.concat(data);
            if (data.length < 50) break;
            page++;
        }

        allProducts.forEach(p => console.log(`${p.slug} | ${p.name}`));
        console.log(`Total: ${allProducts.length}`);
    } catch (e) {
        console.error(e);
    }
}
run();
