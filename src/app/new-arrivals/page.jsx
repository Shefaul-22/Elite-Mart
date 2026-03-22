"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Star, ShoppingBag, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

// sample data
const newArrivals = [
    { id: 1, title: "Classic Leather Jacket", description: "Handcrafted from premium Italian calfskin leather.", price: 299.0, category: "Apparel", rating: 4.8, image: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?q=80&w=800&auto=format" },
    { id: 2, title: "Silver Chronograph", description: "Precision engineered timepiece featuring sapphire glass.", price: 185.0, category: "Watches", rating: 4.9, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=800&auto=format" },
    { id: 4, title: "Premium Silk Scarf", description: "100% mulberry silk with hand-rolled edges.", price: 75.0, category: "Accessories", rating: 4.7, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format" },
];

const NewArrivalsPage = () => {
    return (
        <div className="min-h-screen bg-background pb-20 pt-28 md:pt-36 px-4 md:px-8 lg:px-16">
            <div className="max-w-7xl mx-auto mb-12">
                <div className="space-y-4">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-widest">
                        <Flame size={12} /> Hot & Fresh
                    </motion.div>
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-black tracking-tighter">
                        New <span className="text-emerald-500 italic">Arrivals</span>
                    </motion.h1>
                    <p className="text-muted-foreground max-w-lg font-medium">Explore the latest trends and our newest drops for the season.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {newArrivals.map((product) => (
                    <motion.div
                        key={product.id}
                        whileHover={{ y: -10 }}
                        className="group relative bg-card rounded-[2.5rem] border border-border overflow-hidden flex flex-col h-full shadow-sm hover:shadow-2xl transition-all duration-500"
                    >
                        <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                            <Image src={product.image} alt={product.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 33vw" />
                            <div className="absolute top-4 right-4 z-20">
                                <div className="bg-background/80 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg border border-border">
                                    <Star size={12} className="fill-yellow-400 text-yellow-400" />
                                    <span className="text-xs font-black">{product.rating}</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 flex flex-col flex-1">
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500">{product.category}</span>
                                <span className="text-xl font-black">${product.price.toFixed(2)}</span>
                            </div>
                            <h3 className="text-2xl font-black tracking-tighter mb-3 leading-tight group-hover:text-emerald-500 transition-colors uppercase">{product.title}</h3>
                            <p className="text-muted-foreground text-sm font-medium line-clamp-2 mb-8 leading-relaxed">{product.description}</p>
                            <div className="mt-auto">
                                <Link href={`/products/${product.id}`}>
                                    <Button variant="outline" className="w-full h-12 rounded-xl border-2 font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all group/btn">
                                        View Details <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default NewArrivalsPage;