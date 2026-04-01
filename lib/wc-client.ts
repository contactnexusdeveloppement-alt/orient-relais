import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

// Fail-fast: WooCommerce credentials must be set
const consumerKey = process.env.WC_CONSUMER_KEY;
const consumerSecret = process.env.WC_CONSUMER_SECRET;

if (!consumerKey || !consumerSecret) {
    console.error(
        "WC_CONSUMER_KEY and WC_CONSUMER_SECRET environment variables are required."
    );
}

const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://orient-relais.com";
const url = baseUrl === "https://orient-relais.com" ? "https://www.orient-relais.com" : baseUrl;

export const wooClient = new WooCommerceRestApi({
    url,
    consumerKey: consumerKey || "",
    consumerSecret: consumerSecret || "",
    version: "wc/v3",
});

export const wooClientWithQSAuth = new WooCommerceRestApi({
    url,
    consumerKey: consumerKey || "",
    consumerSecret: consumerSecret || "",
    version: "wc/v3",
    queryStringAuth: true,
});
