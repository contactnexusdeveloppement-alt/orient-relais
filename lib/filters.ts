import { WooProduct } from "@/lib/woocommerce-types";

export interface FilterOption {
    value: string;
    label: string;
    count?: number;
}

export interface FilterConfig {
    key: string;
    label: string;
    type: "checkbox" | "range" | "radio";
    options?: FilterOption[];
    min?: number;
    max?: number;
}

export interface ActiveFilters {
    [key: string]: string[] | [number, number] | string;
}

// Extracts unique values from attributes
export function extractAttributeValues(products: WooProduct[], attributeName: string): FilterOption[] {
    const counts = new Map<string, number>();

    products.forEach(p => {
        const attr = p.attributes.find(a => a.name.toLowerCase() === attributeName.toLowerCase());
        if (attr) {
            attr.options.forEach(opt => {
                const cleanOpt = opt.trim();
                counts.set(cleanOpt, (counts.get(cleanOpt) || 0) + 1);
            });
        }
    });

    return Array.from(counts.entries())
        .map(([value, count]) => ({ value, label: value, count }))
        .sort((a, b) => b.count - a.count);
}

// Extracts tags (used for badges/certs)
export function extractTags(products: WooProduct[], allowedTags?: string[]): FilterOption[] {
    const counts = new Map<string, number>();

    products.forEach(p => {
        p.tags.forEach(tag => {
            if (!allowedTags || allowedTags.includes(tag.name)) {
                counts.set(tag.name, (counts.get(tag.name) || 0) + 1);
            }
        });
    });

    return Array.from(counts.entries())
        .map(([value, count]) => ({ value, label: value, count }))
        .sort((a, b) => b.count - a.count);
}

// Gets price range
export function getPriceRange(products: WooProduct[]): { min: number; max: number } {
    if (products.length === 0) return { min: 0, max: 100 };
    const prices = products.map(p => parseFloat(p.price)).filter(p => !isNaN(p) && p > 0);
    if (prices.length === 0) return { min: 0, max: 100 };
    return {
        min: Math.floor(Math.min(...prices)),
        max: Math.ceil(Math.max(...prices))
    };
}

// Extracts unique categories from products
export function extractCategories(products: WooProduct[]): FilterOption[] {
    const counts = new Map<string, { label: string; count: number }>();

    products.forEach(p => {
        p.categories.forEach(cat => {
            const existing = counts.get(cat.slug);
            if (existing) {
                existing.count++;
            } else {
                counts.set(cat.slug, { label: cat.name, count: 1 });
            }
        });
    });

    return Array.from(counts.entries())
        .map(([value, { label, count }]) => ({ value, label, count }))
        .sort((a, b) => b.count - a.count);
}

// Extracts unique brands combining the new 'brands' taxonomy and the old 'Marque' attribute
export function extractBrands(products: WooProduct[]): FilterOption[] {
    const counts = new Map<string, number>();

    products.forEach(p => {
        let hasBrand = false;
        
        // Priority 1: Official 'brands' taxonomy property added by WooCommerce Brands plugin
        if (p.brands && p.brands.length > 0) {
            p.brands.forEach(b => {
                const name = b.name.trim();
                counts.set(name, (counts.get(name) || 0) + 1);
                hasBrand = true;
            });
        }
        
        // Priority 2: Fallback to local attribute "Marque" if taxonomy is not set
        if (!hasBrand) {
            const attr = p.attributes?.find(a => a.name.toLowerCase() === 'marque' || a.name.toLowerCase() === 'marques');
            if (attr && attr.options) {
                attr.options.forEach(opt => {
                    const cleanOpt = opt.trim();
                    counts.set(cleanOpt, (counts.get(cleanOpt) || 0) + 1);
                });
            }
        }
    });

    return Array.from(counts.entries())
        .map(([value, count]) => ({ value, label: value, count }))
        .sort((a, b) => b.count - a.count);
}

// Category-specific filter configurations
export function getFiltersForCategory(categorySlug: string, products: WooProduct[]): FilterConfig[] {
    const priceRange = getPriceRange(products);

    // Extract various dynamic attributes and taxonomies
    const brands = extractBrands(products);
    const poids = extractAttributeValues(products, "Poids");
    const contenances = extractAttributeValues(products, "Contenance");

    // Merge Poids and Contenances
    const weightsMap = new Map<string, FilterOption>();
    [...poids, ...contenances].forEach(opt => {
        const existing = weightsMap.get(opt.value);
        if (existing && existing.count) {
            existing.count += (opt.count || 0);
        } else {
            weightsMap.set(opt.value, { ...opt });
        }
    });
    const weights = Array.from(weightsMap.values()).sort((a, b) => (b.count || 0) - (a.count || 0));

    const benefits = extractAttributeValues(products, "Bienfaits");

    // Define which tags represent certifications/labels
    const certTags = data.certifications || ["Bio", "Vegan", "Ecocert", "Naturel"];
    const certifications = extractTags(products, certTags);

    const categories = extractCategories(products);

    const filters: FilterConfig[] = [
        {
            key: "price",
            label: "Prix",
            type: "range",
            min: priceRange.min,
            max: priceRange.max
        }
    ];

    if (categorySlug === "all" && categories.length > 0) {
        filters.push({
            key: "category",
            label: "Catégories",
            type: "checkbox",
            options: categories
        });
    }

    if (brands.length > 0) {
        filters.push({
            key: "brand",
            label: "Marque",
            type: "checkbox",
            options: brands
        });
    }

    if (weights.length > 0) {
        filters.push({
            key: "weight",
            label: "Poids / Contenance",
            type: "checkbox",
            options: weights
        });
    }

    if (benefits.length > 0) {
        filters.push({
            key: "benefits",
            label: "Bienfaits",
            type: "checkbox",
            options: benefits.slice(0, 8)
        });
    }

    if (certifications.length > 0) {
        filters.push({
            key: "tags",
            label: "Labels",
            type: "checkbox",
            options: certifications
        });
    }

    return filters;
}

// Data for allowed tags to be considered as certifications
const data = {
    certifications: ["Bio", "Vegan", "Ecocert", "Cosmos Organic", "Fabriqué en France", "Agriculture Bio", "Gélules végétales", "Eco", "Naturel"]
};

export function filterProducts(products: WooProduct[], filters: ActiveFilters): WooProduct[] {
    return products.filter(product => {
        for (const [key, value] of Object.entries(filters)) {
            if (!value || (Array.isArray(value) && value.length === 0)) continue;

            if (key === "price" && Array.isArray(value) && value.length === 2) {
                const [min, max] = value as [number, number];
                const price = parseFloat(product.price);
                if (price < min || price > max) return false;
            }

            if (key === "benefits" && Array.isArray(value)) {
                const required = value as string[];
                const productBenefits = product.attributes.find(a => a.name.toLowerCase() === "bienfaits")?.options || [];
                if (!required.some(r => productBenefits.includes(r))) return false;
            }

            if (key === "brand" && Array.isArray(value)) {
                const required = value as string[];
                const productBrands: string[] = [];
                
                if (product.brands && product.brands.length > 0) {
                    product.brands.forEach(b => productBrands.push(b.name.trim()));
                }
                
                const attrBrands = product.attributes.find(a => a.name.toLowerCase() === "marque" || a.name.toLowerCase() === "marques")?.options || [];
                attrBrands.forEach(b => productBrands.push(b.trim()));
                
                if (!required.some(r => productBrands.some(pb => pb === r.trim()))) return false;
            }

            if (key === "weight" && Array.isArray(value)) {
                const required = value as string[];
                const weightOptions = product.attributes.find(a => a.name.toLowerCase() === "poids")?.options || [];
                const contenanceOptions = product.attributes.find(a => a.name.toLowerCase() === "contenance")?.options || [];
                const allWeightOptions = [...weightOptions, ...contenanceOptions];
                if (!required.some(r => allWeightOptions.some(pw => pw.trim() === r.trim()))) return false;
            }

            if (key === "tags" && Array.isArray(value)) {
                const required = value as string[];
                const productTags = product.tags.map(t => t.name);
                if (!required.some(r => productTags.includes(r))) return false;
            }

            if (key === "category" && Array.isArray(value)) {
                const required = value as string[];
                const productCats = product.categories.map(c => c.slug);
                if (!required.some(r => productCats.includes(r))) return false;
            }
        }
        return true;
    });
}
