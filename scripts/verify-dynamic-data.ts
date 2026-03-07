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

async function verify() {
    console.log("🔍 Vérification des catégories...");
    const { data: categories } = await client.get("products/categories", { per_page: 100, hide_empty: false });
    console.log(`✅ ${categories.length} catégories trouvées.`);
    categories.forEach((c: any) => console.log(`- ${c.name} (${c.slug})`));

    console.log("\n🔍 Vérification du branding Najel (échantillon)...");
    const { data: products } = await client.get("products", { per_page: 5, status: "publish" });
    products.forEach((p: any) => {
        const hasNajelTag = p.tags.some((t: any) => t.name.toLowerCase() === "najel");
        const brandAttr = p.attributes.find((a: any) => a.name.toLowerCase() === "marque");
        const hasNajelBrand = brandAttr?.options.some((o: string) => o.toLowerCase() === "najel");
        console.log(`- ${p.name}: Tag Najel: ${hasNajelTag}, Marque Najel: ${hasNajelBrand}`);
    });
}

verify().catch(console.error);
