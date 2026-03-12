export interface WooProductImage {
    id: number;
    src: string;
    name: string;
    alt: string;
}

export interface WooProductCategory {
    id: number;
    name: string;
    slug: string;
}

export interface WooCategory {
    id: number;
    name: string;
    slug: string;
    parent: number;
    description: string;
    display: string;
    image: {
        id: number;
        src: string;
        name: string;
        alt: string;
    } | null;
    count: number;
}

export interface WooProductAttribute {
    id: number;
    name: string;
    position: number;
    visible: boolean;
    variation: boolean;
    options: string[];
}

export interface WooProduct {
    id: number;
    name: string;
    slug: string;
    permalink: string;
    type: "simple" | "variable" | "grouped" | "external";
    status: "publish" | "draft" | "pending" | "private";
    featured: boolean;
    description: string;
    short_description: string;
    sku: string;
    price: string;
    regular_price: string;
    sale_price: string;
    on_sale: boolean;
    purchasable: boolean;
    total_sales: number;
    virtual: boolean;
    downloadable: boolean;
    external_url: string;
    button_text: string;
    tax_status: "taxable" | "shipping" | "none";
    tax_class: string;
    manage_stock: boolean;
    stock_quantity: number | null;
    stock_status: "instock" | "outofstock" | "onbackorder";
    weight: string;
    dimensions: {
        length: string;
        width: string;
        height: string;
    };
    shipping_required: boolean;
    shipping_taxable: boolean;
    shipping_class: string;
    shipping_class_id: number;
    reviews_allowed: boolean;
    average_rating: string;
    rating_count: number;
    related_ids: number[];
    upsell_ids: number[];
    cross_sell_ids: number[];
    parent_id: number;
    purchase_note: string;
    categories: WooProductCategory[];
    tags: { id: number; name: string; slug: string }[];
    images: WooProductImage[];
    attributes: WooProductAttribute[];
    default_attributes: { id: number; name: string; option: string }[];
    variations: number[];
    grouped_products: number[];
    menu_order: number;
    meta_data: { id: number; key: string; value: string }[];
}

export interface WooBrand {
    id: number;
    name: string;
    slug: string;
    description?: string;
    count?: number;
    image?: string | null;
}
