"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    SlidersHorizontal,
    ArrowUpRight,
    Star,
    ShoppingBag,
    LayoutGrid,
    ChevronDown,
    X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const allProducts = [
    { id: 1, title: "Classic Leather Jacket", description: "Handcrafted from premium Italian calfskin leather with a matte finish. Perfect for all seasons.", price: 299.00, category: "Apparel", rating: 4.8, image: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?q=80&w=800&auto=format" },
    { id: 2, title: "Silver Chronograph", description: "Precision engineered timepiece featuring sapphire glass and water resistance up to 100m.", price: 185.00, category: "Watches", rating: 4.9, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=800&auto=format" },
    { id: 3, title: "Minimalist Sneakers", description: "Breathable mesh upper with memory foam insole for ultimate comfort and daily durability.", price: 120.00, category: "Footwear", rating: 4.5, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format" },
    { id: 4, title: "Premium Silk Scarf", description: "100% mulberry silk with hand-rolled edges. Features a unique geometric print design.", price: 75.00, category: "Accessories", rating: 4.7, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format" },
    { id: 5, title: "Aviator Sunglasses", description: "Polarized lenses with a lightweight titanium frame. UV400 protection guaranteed.", price: 150.00, category: "Accessories", rating: 4.6, image: "https://images.unsplash.com/photo-1511499767390-a7eaa3c29511?q=80&w=800&auto=format" },
    { id: 6, title: "Wool Blend Coat", description: "Tailored fit overcoat made from recycled wool. Warmth without the bulkiness.", price: 450.00, category: "Apparel", rating: 4.9, image: "https://images.unsplash.com/photo-1539533377285-b92441e7c8a9?q=80&w=800&auto=format" }
];

const categories = ["All", "Apparel", "Watches", "Footwear", "Accessories"];

const ProductsPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState("Default");

    // Filtering & Sorting Logic
    // Filtering & Sorting Logic
    const filteredProducts = useMemo(() => {
        let result = allProducts.filter((product) => {
         
            const matchesSearch =
                product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.category.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });

        if (sortBy === "Price: Low to High") result.sort((a, b) => a.price - b.price);
        if (sortBy === "Price: High to Low") result.sort((a, b) => b.price - a.price);
        if (sortBy === "Rating") result.sort((a, b) => b.rating - a.rating);

        return result;
    }, [searchQuery, selectedCategory, sortBy]);

    return (
        <div className="min-h-screen bg-background pb-20 pt-28 px-4 md:px-8 lg:px-16">
            <div className="max-w-7xl mx-auto mb-12">
                <div className="space-y-4">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
                        <LayoutGrid size={12} /> The Collection
                    </motion.div>
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-black tracking-tighter">
                        All <span className="text-primary italic">Products</span>
                    </motion.h1>
                </div>

                {/* Filter Bar */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-12 p-4 rounded-[2rem] bg-secondary/50 backdrop-blur-xl border border-border flex flex-col lg:flex-row items-center gap-4">

                    {/* Search Input */}
                    <div className="relative w-full lg:flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                        <Input
                            placeholder="Search for products..."
                            className="pl-12 h-14 rounded-2xl border-none bg-background/50 focus-visible:ring-primary shadow-sm text-base font-medium"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <X
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer hover:text-primary transition-colors"
                                size={18}
                                onClick={() => setSearchQuery("")}
                            />
                        )}
                    </div>

                    <div className="flex w-full lg:w-auto items-center gap-3">
                        {/* Category Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="h-14 px-6 rounded-2xl border-none bg-background/50 flex-1 lg:flex-none font-bold min-w-[140px]">
                                    {selectedCategory} <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="rounded-xl border-border bg-background/95 backdrop-blur-lg">
                                {categories.map((cat) => (
                                    <DropdownMenuItem key={cat} onClick={() => setSelectedCategory(cat)} className="font-bold uppercase text-[10px] tracking-widest cursor-pointer focus:bg-primary focus:text-white">
                                        {cat}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Sort Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="h-14 px-8 rounded-2xl font-black uppercase tracking-widest">
                                    <SlidersHorizontal className="mr-2 h-4 w-4" /> {sortBy === "Default" ? "Filter" : sortBy}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="rounded-xl border-border bg-background/95 backdrop-blur-lg">
                                {["Default", "Price: Low to High", "Price: High to Low", "Rating"].map((option) => (
                                    <DropdownMenuItem key={option} onClick={() => setSortBy(option)} className="font-bold uppercase text-[10px] tracking-widest cursor-pointer focus:bg-primary focus:text-white">
                                        {option}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </motion.div>
            </div>

            {/* Products Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <motion.div
                                key={product.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
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
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <Button size="icon" className="h-14 w-14 rounded-full shadow-2xl scale-50 group-hover:scale-100 transition-all duration-300">
                                            <ShoppingBag size={24} />
                                        </Button>
                                    </div>
                                </div>

                                <div className="p-8 flex flex-col flex-1">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">{product.category}</span>
                                        <span className="text-xl font-black">${product.price.toFixed(2)}</span>
                                    </div>
                                    <h3 className="text-2xl font-black tracking-tighter mb-3 leading-tight group-hover:text-primary transition-colors uppercase">{product.title}</h3>
                                    <p className="text-muted-foreground text-sm font-medium line-clamp-2 mb-8 leading-relaxed">{product.description}</p>
                                    <div className="mt-auto">
                                        <Link href={`/products/${product.id}`}>
                                            <Button variant="outline" className="w-full h-12 rounded-xl border-2 font-black uppercase tracking-widest hover:bg-foreground hover:text-background transition-all group/btn">
                                                View Details <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full py-20 text-center">
                            <p className="text-2xl font-black text-muted-foreground uppercase tracking-widest">No products found</p>
                            <Button variant="link" onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }} className="mt-4 font-bold text-primary">Clear all filters</Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ProductsPage;