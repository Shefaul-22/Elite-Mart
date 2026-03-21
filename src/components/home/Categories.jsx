"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

// Static Category Data . later from db
const categories = [
    {
        name: "Luxury Watches",
        itemCount: "120+ Items",
        image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=800&auto=format&fit=crop",
        href: "/products?category=watches",
        gridSpan: "md:col-span-2 md:row-span-2"
    },
    {
        name: "Premium Apparel",
        itemCount: "450+ Items",
        image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=800&auto=format&fit=crop",
        href: "/products?category=apparel",
        gridSpan: ""
    },
    {
        name: "Elite Footwear",
        itemCount: "310+ Items",
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=800&auto=format&fit=crop",
        href: "/products?category=footwear",
        gridSpan: ""
    },
    {
        name: "High-End Accessories",
        itemCount: "280+ Items",
        image: "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=800&auto=format&fit=crop",
        href: "/products?category=accessories",
        gridSpan: "md:col-span-2"
    }
];

const Categories = () => {
    return (
        <div className="w-full">
            {/* 1. Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12 gap-4">
                <div>
                    <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-[10px] md:text-xs font-black text-primary ring-1 ring-primary/20 uppercase tracking-[0.2em] mb-3 w-fit">
                        <Sparkles size={14} className="animate-pulse" />
                        Selected Collections
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground leading-tight">
                        Shop by <span className="text-primary italic">Category</span>
                    </h2>
                    <p className="mt-3 text-base text-muted-foreground max-w-lg font-medium">
                        Explore our meticulously curated selections, crafted for those who define excellence in every detail.
                    </p>
                </div>

                <Link href="/products" className="group flex items-center gap-2.5 text-sm font-black uppercase tracking-tighter text-primary hover:text-primary/80 transition-colors flex-shrink-0">
                    Browse All Collections <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
                </Link>
            </div>

            {/* 2. Categories Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[220px]">
                {
                    categories.map((category, index) => (
                        <motion.div
                            key={category.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                            className={cn(
                                "relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-lg group cursor-pointer",
                                category.gridSpan
                            )}
                        >
                            {/* Background Image */}
                            <Image
                                src={category.image}
                                alt={category.name}
                                fill
                                className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                                sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 25vw"
                            />

                            {/* Dark Overlay on Hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 transition-opacity duration-500 opacity-70 group-hover:opacity-100 z-10" />

                            {/* Content (Text) */}
                            <div className="absolute inset-x-0 bottom-0 p-6 z-20 flex flex-col items-start justify-end h-full">

                                <p className="text-[10px] md:text-xs font-bold text-white/70 uppercase tracking-widest mb-1 leading-none">
                                    {category.itemCount}
                                </p>

                                <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-none mb-3">
                                    {category.name}
                                </h3>

                                {/* Fake Button -  */}
                                <Link href={category.href} className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white text-black text-xs font-black uppercase tracking-widest shadow-xl scale-75 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 group-focus-within:scale-100 group-focus-within:opacity-100">
                                    Shop Collection
                                </Link>
                            </div>
                        </motion.div>
                    ))}
            </div>
        </div>
    );
};

export default Categories;