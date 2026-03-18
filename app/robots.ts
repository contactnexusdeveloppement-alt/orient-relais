import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: [
                "/checkout/",
                "/checkout/success",
                "/api/",
                "/login",
                "/account",
                "/register",
                "/panier",
                "/admin",
            ],
        },
        sitemap: "https://www.orient-relais.com/sitemap.xml",
    };
}
