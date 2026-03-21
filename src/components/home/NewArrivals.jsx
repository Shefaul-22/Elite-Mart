"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import {
    ShoppingCart,
    Eye,
    Star,
    Plus,
    ArrowRight,
    Diamond
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const products = [
    {
        id: 1,
        name: "Classic Leather Jacket",
        category: "Apparel",
        price: 299.00,
        oldPrice: 350.00,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?q=80&w=800&auto=format&fit=crop",
        isNew: true,
    },
    {
        id: 2,
        name: "Silver Chronograph Watch",
        category: "Accessories",
        price: 185.00,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=800&auto=format&fit=crop",
        isNew: true,
    },
    {
        id: 3,
        name: "Minimalist Sneakers",
        category: "Footwear",
        price: 120.00,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop",
        isNew: false,
    },
    {
        id: 4,
        name: "Premium Silk Scarf",
        category: "Accessories",
        price: 75.00,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop",
        isNew: true,
    }
];

const NewArrivals = () => {
    return (
        <section className="w-full py-10">
            {/* Section Header */}
            <div className="flex flex-col items-center text-center mb-16 space-y-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-[10px] md:text-xs font-black text-primary ring-1 ring-primary/20 uppercase tracking-[0.2em]"
                >
                    <Diamond size={12} className="fill-primary" /> Fresh From the Studio
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground">
                    New <span className="text-primary italic">Arrivals</span>
                </h2>
                <div className="w-20 h-1.5 bg-primary rounded-full" />
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
               
                {
                    products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className="group relative"
                        >
                            {/* Image Container */}
                            <div className="relative aspect-[3/4] overflow-hidden rounded-[2.5rem] bg-secondary border border-border transition-all duration-500 group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)]">

                                {/* New Badge */}
                                {product.isNew && (
                                    <div className="absolute top-5 left-5 z-20 bg-primary text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                                        New
                                    </div>
                                )}

                                {/* Product Image */}
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    priority={index < 2}
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                    quality={85}
                                />

                                {/* Quick Actions Overlay */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-3 z-10 backdrop-blur-[2px]">
                                    <Button size="icon" variant="secondary" className="rounded-full h-12 w-12 shadow-xl hover:bg-primary hover:text-white transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                                        <ShoppingCart size={20} />
                                    </Button>
                                    <Button size="icon" variant="secondary" className="rounded-full h-12 w-12 shadow-xl hover:bg-primary hover:text-white transition-all duration-300 translate-y-4 group-hover:translate-y-0 delay-75">
                                        <Eye size={20} />
                                    </Button>
                                </div>

                                {/* Mobile Quick Add */}
                                <div className="absolute bottom-5 right-5 sm:hidden z-20">
                                    <Button size="icon" className="rounded-full h-12 w-12 bg-primary shadow-xl">
                                        <Plus size={24} />
                                    </Button>
                                </div>
                            </div>

                            {/* Product Details */}
                            <div className="mt-6 space-y-2.5 px-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
                                        {product.category}
                                    </span>
                                    <div className="flex items-center gap-1 bg-secondary px-2 py-0.5 rounded-full">
                                        <Star size={10} className="fill-yellow-400 text-yellow-400" />
                                        <span className="text-[10px] font-bold">{product.rating}</span>
                                    </div>
                                </div>

                                <h3 className="text-xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors cursor-pointer leading-tight uppercase">
                                    {product.name}
                                </h3>

                                <div className="flex items-center gap-3">
                                    <span className="text-2xl font-black text-primary">
                                        ${product.price.toFixed(2)}
                                    </span>
                                    {product.oldPrice && (
                                        <span className="text-sm font-bold text-muted-foreground line-through opacity-60">
                                            ${product.oldPrice.toFixed(2)}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
            </div>

            {/* View More Button */}
            <div className="mt-20 flex justify-center">
                <Link href="/products">
                    <Button variant="outline" className="rounded-full px-12 h-16 border-2 font-black uppercase tracking-[0.2em] hover:bg-primary hover:border-primary hover:text-white transition-all duration-500 group">
                        Explore All Products
                        <ArrowRight size={18} className="ml-2 group-hover:translate-x-2 transition-transform" />
                    </Button>
                </Link>
            </div>
        </section>
    );
};

export default NewArrivals;