"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, ArrowRight, Diamond } from "lucide-react";
import Logo from "./Logo";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = [
        {
            title: "Collection",
            links: [
                { name: "New Arrivals", href: "/new-arrivals" },
                { name: "Best Sellers", href: "/best-sellers" },
                { name: "Flash Sale", href: "/flash-sale" },
                { name: "Elite Selection", href: "/elite" },
            ],
        },
        {
            title: "Support",
            links: [
                { name: "Order Tracking", href: "/track" },
                { name: "Returns & Exchanges", href: "/returns" },
                { name: "Shipping Policy", href: "/shipping" },
                { name: "Terms of Service", href: "/terms" },
            ],
        },
        {
            title: "Company",
            links: [
                { name: "About Elite Mart", href: "/about" },
                { name: "Store Locator", href: "/stores" },
                { name: "Careers", href: "/careers" },
                { name: "Privacy Policy", href: "/privacy" },
            ],
        },
    ];

    return (
        <footer className="relative bg-card pt-20 pb-10 border-t border-border overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

                    {/* Brand Section */}
                    <div className="lg:col-span-4 space-y-8">
                        <Logo></Logo>
                        <p className="text-muted-foreground font-medium leading-relaxed max-w-sm">
                            Redefining luxury shopping through curated collections and world-class service. Your journey to excellence starts here.
                        </p>
                        <div className="flex items-center gap-4">
                            {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                                <Link key={i} href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all duration-300">
                                    <Icon size={18} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Links Sections */}
                    {
                        footerLinks.map((section, idx) => (
                            <div key={idx} className="lg:col-span-2 space-y-6">
                                <h4 className="text-sm font-black uppercase tracking-[0.2em] text-foreground">
                                    {section.title}
                                </h4>
                                <ul className="space-y-4">
                                    {section.links.map((link, i) => (
                                        <li key={i}>
                                            <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors font-medium flex items-center gap-2 group">
                                                <span className="w-0 h-px bg-primary transition-all group-hover:w-3" />
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                    {/* Newsletter Section */}
                    <div className="lg:col-span-2 space-y-6">
                        <h4 className="text-sm font-black uppercase tracking-[0.2em] text-foreground">
                            Newsletter
                        </h4>
                        <div className="space-y-4">
                            <p className="text-xs text-muted-foreground font-medium">
                                Join the elite circle for early access and exclusive offers.
                            </p>
                            <div className="relative group">
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    className="w-full bg-secondary border border-border rounded-2xl py-4 pl-5 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                />
                                <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center hover:shadow-lg hover:shadow-primary/30 transition-all">
                                    <ArrowRight size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-20 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest">
                        © {currentYear} Elite Mart. All Rights Reserved.
                    </p>

                    {/* Payment Gateways (Icons/Text) */}
                    <div className="flex items-center gap-6 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                        <span className="text-[10px] font-bold uppercase tracking-widest">Stripe</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest">PayPal</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest">Visa</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest">Mastercard</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;