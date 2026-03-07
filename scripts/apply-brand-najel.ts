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

async function applyBrandNajel() {
    console.log("🚀 Récupération de tous les produits publiés...");

    let allProducts: any[] = [];
    let page = 1;
    while (true) {
        const { data } = await client.get("products", { per_page: 100, page, status: "publish" });
        allProducts = allProducts.concat(data);
        if (data.length < 100) break;
        page++;
    }

    console.log(`📦 ${allProducts.length} produits trouvés. Analyse en cours...`);

    let updatedCount = 0;

    for (const product of allProducts) {
        let needsUpdate = false;
        const currentAttributes = product.attributes || [];
        const currentTags = product.tags || [];

        // 1. Check Brand Attribute
        const brandAttrIndex = currentAttributes.findIndex((a: any) => a.name.toLowerCase() === "marque");
        let newAttributes = [...currentAttributes];

        if (brandAttrIndex === -1) {
            newAttributes.push({
                name: "Marque",
                visible: true,
                variation: false,
                options: ["Najel"]
            });
            needsUpdate = true;
        } else if (!currentAttributes[brandAttrIndex].options.some((o: string) => o.toLowerCase() === "najel")) {
            newAttributes[brandAttrIndex].options = ["Najel"];
            needsUpdate = true;
        }

        // 2. Check Najel Tag
        const hasNajelTag = currentTags.some((t: any) => t.name.toLowerCase() === "najel");
        let newTags = [...currentTags];

        if (!hasNajelTag) {
            newTags.push({ name: "Najel" });
            needsUpdate = true;
        }

        if (needsUpdate) {
            try {
                console.log(`⏳ Mise à jour de : ${product.name} (ID: ${product.id})...`);
                await client.put(`products/${product.id}`, {
                    attributes: newAttributes,
                    tags: newTags
                });
                updatedCount++;
            } catch (err: any) {
                console.error(`❌ Échec pour ${product.name}:`, err.response?.data?.message || err.message);
            }
        }
    }

    console.log(`\n🎉 Terminé ! ${updatedCount} produits mis à jour avec la marque Najel.`);
}

applyBrandNajel().catch(console.error);
