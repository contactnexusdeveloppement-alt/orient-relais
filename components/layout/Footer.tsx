import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Instagram, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NewsletterForm } from "./NewsletterForm";

export function Footer() {
    return (
        <footer className="bg-stone-900 text-stone-100 relative overflow-hidden">
            {/* No border - merges with reassurance section above */}

            {/* Oriental pattern overlay */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />

            <div className="container mx-auto px-4 pt-16 pb-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-6">
                        <div>
                            <Link href="/">
                                <Image
                                    src="/images/logo-new.png"
                                    alt="Orient Relais"
                                    width={140}
                                    height={50}
                                    className="h-12 w-auto mb-4 object-contain brightness-0 invert opacity-90"
                                />
                            </Link>
                            <p className="text-sm text-stone-400 leading-relaxed">
                                Votre boutique de produits naturels et bio depuis les Yvelines. Savons d'Alep, huiles essentielles et compléments alimentaires de qualité.
                            </p>
                        </div>
                        {/* Social links */}
                        <div className="flex gap-3">
                            <Link href="#" className="h-11 w-11 rounded-xl bg-stone-800/80 border border-stone-700 flex items-center justify-center hover:bg-primary hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group">
                                <Instagram className="h-5 w-5 text-stone-400 group-hover:text-white transition-colors" />
                            </Link>
                            {/* 
                            <Link href="#" className="h-11 w-11 rounded-xl bg-stone-800/80 border border-stone-700 flex items-center justify-center hover:bg-primary hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group">
                                <span className="font-bold text-stone-400 group-hover:text-white flex items-center justify-center text-xs transition-colors">Tk</span>
                            </Link>
                            */}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="font-serif text-lg font-semibold text-white mb-6 flex items-center gap-2">
                            <span className="w-6 h-px bg-primary/50" />
                            Navigation
                        </h4>
                        <ul className="space-y-3 text-sm text-stone-400">
                            <li><Link href="/categorie/savons-dalep" className="hover:text-primary hover:translate-x-1 inline-block transition-all">Savons d'Alep</Link></li>
                            <li><Link href="/categorie/huiles-essentielles" className="hover:text-primary hover:translate-x-1 inline-block transition-all">Huiles Essentielles</Link></li>
                            <li><Link href="/categorie/complements" className="hover:text-primary hover:translate-x-1 inline-block transition-all">Compléments</Link></li>
                            <li><Link href="/categorie/soins-et-beaute" className="hover:text-primary hover:translate-x-1 inline-block transition-all">Soins et Beauté</Link></li>
                            <li><Link href="/categorie/coffrets" className="hover:text-primary hover:translate-x-1 inline-block transition-all">Coffrets Cadeaux</Link></li>
                            <li><Link href="/categorie/epicerie-orientale" className="hover:text-primary hover:translate-x-1 inline-block transition-all">Épicerie Orientale</Link></li>
                            <li><Link href="/categorie/miel" className="hover:text-primary hover:translate-x-1 inline-block transition-all">Miel</Link></li>
                            <li><Link href="/blog" className="hover:text-primary hover:translate-x-1 inline-block transition-all">Le Journal</Link></li>
                            <li><Link href="/faq" className="hover:text-primary hover:translate-x-1 inline-block transition-all">FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Service Client */}
                    <div>
                        <h4 className="font-serif text-lg font-semibold text-white mb-6 flex items-center gap-2">
                            <span className="w-6 h-px bg-primary/50" />
                            Service Client
                        </h4>
                        <ul className="space-y-4 text-sm text-stone-400">
                            <li className="flex items-start gap-3 group">
                                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                    <Phone className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                    <span className="block text-white font-medium">06 99 55 69 77</span>
                                    <span className="text-xs">Lun-Ven, 9h-18h</span>
                                </div>
                            </li>
                            <li className="flex items-center gap-3 group">
                                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                    <Mail className="h-4 w-4 text-primary" />
                                </div>
                                <a href="mailto:Contact@orient-relais.com" className="hover:text-primary transition-colors">Contact@orient-relais.com</a>
                            </li>
                            <li className="flex items-start gap-3 group">
                                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                    <MapPin className="h-4 w-4 text-primary" />
                                </div>
                                <span>48 avenue de Touraine,<br />78310 MAUREPAS, France</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-serif text-lg font-semibold text-white mb-6 flex items-center gap-2">
                            <span className="w-6 h-px bg-primary/50" />
                            Newsletter
                        </h4>
                        <NewsletterForm />
                    </div>
                </div>

                <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
                        <p className="text-xs text-stone-500">
                            © 2026 Orient Relais. SIRET 924 298 540 00015. Tous droits réservés.
                        </p>
                        <span className="hidden md:inline text-stone-700">·</span>
                        <a href="https://nexusdeveloppement.fr/" target="_blank" rel="noopener noreferrer" className="text-xs text-stone-600 hover:text-primary transition-colors">
                            Site créé par Nexus Développement
                        </a>
                    </div>
                    <div className="flex gap-6 text-xs text-stone-500">
                        <Link href="/mentions-legales" className="hover:text-primary transition-colors">Mentions Légales</Link>
                        <Link href="/cgv" className="hover:text-primary transition-colors">CGV</Link>
                        <Link href="/confidentialite" className="hover:text-primary transition-colors">Confidentialité</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
