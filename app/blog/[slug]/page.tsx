import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, Calendar, ArrowRight } from "lucide-react";
import { getArticleBySlug, getRelatedArticles, ARTICLES } from "@/data/articles";
import ReactMarkdown from "react-markdown";
import { jsonLdScript } from "@/lib/json-ld";

export async function generateStaticParams() {
    return ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const slug = (await params).slug;
    const article = getArticleBySlug(slug);
    if (!article) return { title: "Article introuvable" };

    return {
        title: article.title,
        description: article.excerpt,
        openGraph: {
            title: article.title,
            description: article.excerpt,
            type: "article",
            url: `https://www.orient-relais.com/blog/${article.slug}`,
            publishedTime: article.date,
            images: [{ url: article.image }],
        },
        alternates: {
            canonical: `/blog/${article.slug}`,
        },
    };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
    const article = getArticleBySlug(slug);

    if (!article) {
        notFound();
    }

    const relatedArticles = getRelatedArticles(slug, 2);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: article.excerpt,
        image: `https://www.orient-relais.com${article.image}`,
        datePublished: article.date,
        author: {
            "@type": "Organization",
            name: "Orient Relais",
            url: "https://www.orient-relais.com",
        },
        publisher: {
            "@type": "Organization",
            name: "Orient Relais",
            logo: {
                "@type": "ImageObject",
                url: "https://www.orient-relais.com/images/Logo_respon.png",
            },
        },
    };

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }}
            />
            {/* Back Link */}
            <Link href="/blog" className="inline-flex items-center text-sm text-stone-500 hover:text-primary mb-8">
                <ArrowLeft className="mr-2 h-4 w-4" /> Retour au journal
            </Link>

            {/* Article Header */}
            <header className="max-w-4xl mx-auto text-center mb-12">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                    {article.category}
                </span>
                <h1 className="font-serif text-3xl md:text-5xl font-bold text-stone-900 mb-6 leading-tight">
                    {article.title}
                </h1>
                <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-stone-500">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{article.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{article.readTime} de lecture</span>
                    </div>
                </div>
            </header>

            {/* Main Image */}
            <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden mb-12 bg-stone-100 max-w-5xl mx-auto">
                <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Main Content */}
            <article className="prose prose-stone prose-lg max-w-3xl mx-auto prose-headings:font-serif prose-headings:text-stone-900 prose-a:text-primary prose-img:rounded-xl">
                <p className="lead text-xl text-stone-600 mb-8">
                    {article.excerpt}
                </p>
                <div className="markdown-content">
                    <ReactMarkdown>{article.content}</ReactMarkdown>
                </div>
            </article>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
                <section className="max-w-4xl mx-auto mt-16 pt-12 border-t border-stone-200">
                    <h3 className="font-serif text-2xl font-bold text-stone-900 mb-8">À lire aussi</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        {relatedArticles.map((related) => (
                            <Link
                                key={related.id}
                                href={`/blog/${related.slug}`}
                                className="group flex gap-4 p-4 bg-stone-50 rounded-xl hover:bg-stone-100 transition-colors"
                            >
                                <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-stone-200">
                                    <Image
                                        src={related.image}
                                        alt={related.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <span className="text-xs text-primary font-medium mb-1">{related.category}</span>
                                    <h4 className="font-serif text-lg font-bold text-stone-900 group-hover:text-primary transition-colors line-clamp-2">
                                        {related.title}
                                    </h4>
                                    <span className="text-xs text-stone-500 mt-1">{related.readTime}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="max-w-4xl mx-auto mt-16 bg-gradient-to-r from-amber-50/70 to-stone-50 rounded-2xl p-8 text-center border border-primary/10">
                <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">Découvrez nos produits</h3>
                <p className="text-stone-600 mb-4">Retrouvez tous les produits mentionnés dans cet article sur notre boutique.</p>
                <Link href="/boutique" className="inline-flex items-center text-primary font-semibold hover:underline">
                    Voir la boutique <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </section>
        </div>
    );
}
