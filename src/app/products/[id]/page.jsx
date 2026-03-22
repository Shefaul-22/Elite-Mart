"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    ShoppingBag,
    Star,
    Clock,
    ShieldCheck,
    Truck,
    Plus,
    Minus,
    Heart,
    Calendar,
    Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useParams } from "next/navigation";

// same as All Products Page 
const allProducts = [
    {
        id: 1,
        title: "Classic Leather Jacket",
        description: "Handcrafted from premium Italian calfskin leather with a matte finish. Perfect for all seasons.",
        price: 299.00,
        category: "Apparel",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?q=80&w=800&auto=format",
        dateAdded: "March 15, 2026",
        priority: "High Demand"
    },
    {
        id: 2,
        title: "Silver Chronograph",
        description: "Precision engineered timepiece featuring sapphire glass and water resistance up to 100m.",
        price: 185.00,
        category: "Watches",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=800&auto=format",
        dateAdded: "March 10, 2026",
        priority: "Best Seller"
    },
    {
        id: 3,
        title: "Minimalist Sneakers",
        description: "Breathable mesh upper with memory foam insole for ultimate comfort and daily durability.",
        price: 120.00,
        category: "Footwear",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format",
        dateAdded: "March 05, 2026",
        priority: "New Arrival"
    },
    {
        id: 4,
        title: "Premium Silk Scarf",
        description: "100% mulberry silk with hand-rolled edges. Features a unique geometric print design.",
        price: 75.00,
        category: "Accessories",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format",
        dateAdded: "February 28, 2026",
        priority: "Exclusive"
    },
    {
        id: 5,
        title: "Aviator Sunglasses",
        description: "Polarized lenses with a lightweight titanium frame. UV400 protection guaranteed.",
        price: 150.00,
        category: "Accessories",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1511499767390-a7eaa3c29511?q=80&w=800&auto=format",
        dateAdded: "February 20, 2026",
        priority: "Trending"
    },
    {
        id: 6,
        title: "Wool Blend Coat",
        description: "Tailored fit overcoat made from recycled wool. Warmth without the bulkiness.",
        price: 450.00,
        category: "Apparel",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1539533377285-b92441e7c8a9?q=80&w=800&auto=format",
        dateAdded: "February 15, 2026",
        priority: "Limited Edition"
    }
];

const ProductDetails = ({ params }) => {
    const [quantity, setQuantity] = useState(1);

    //  useParams() 
    const resolvedParams = useParams();
    const productId = resolvedParams?.id;

    // search according to url id
    const product = useMemo(() => {
        if (!productId) return null;

        return allProducts.find((p) => String(p.id) === String(productId));
    }, [productId]);

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-background ">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">Product Not Found</h2>
                    <p className="text-muted-foreground font-medium mb-6">The item you are looking for might have been removed.</p>
                    <Link href="/products">
                        <Button variant="outline" className="rounded-full px-8 font-black uppercase tracking-widest">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shop
                        </Button>
                    </Link>
                </motion.div>
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-background pb-20 pt-28 md:pt-36 px-4 md:px-8 lg:px-16">
            <div className="max-w-7xl mx-auto">

                {/* Back Button */}
                <Link href="/products">
                    <motion.button
                        whileHover={{ x: -5 }}
                        className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors mb-10"
                    >
                        <ArrowLeft size={18} /> Back to Collection
                    </motion.button>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

                    {/* Image Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="relative group rounded-[3.5rem] overflow-hidden border border-border aspect-square lg:aspect-auto lg:h-[700px] bg-secondary shadow-2xl"
                    >
                        <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-105"
                            priority
                        />
                        <div className="absolute top-8 left-8">
                            <Badge className="bg-primary/90 backdrop-blur-md text-primary-foreground font-black px-5 py-2 rounded-full uppercase tracking-widest text-[10px] border-none">
                                <Zap size={12} className="mr-1 fill-current" /> {product.priority}
                            </Badge>
                        </div>
                    </motion.div>

                    {/* Content Section */}
                    <div className="flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-8"
                        >
                            <div className="space-y-4">
                                <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] flex items-center gap-2">
                                    <span className="w-8 h-[2px] bg-primary"></span>
                                    {product.category}
                                </span>
                                <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] uppercase italic">
                                    {product.title}
                                </h1>
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-1.5 text-yellow-500">
                                        <Star size={20} className="fill-current" />
                                        <span className="text-foreground text-lg font-black">{product.rating}</span>
                                    </div>
                                    <div className="text-3xl font-black tracking-tight text-foreground/90">
                                        ${product.price.toFixed(2)}
                                    </div>
                                </div>
                            </div>

                            <p className="text-muted-foreground text-xl leading-relaxed font-medium max-w-xl">
                                {product.description}
                                <br />
                                <span className="text-sm mt-4 block italic opacity-70">
                                    Experience the ultimate blend of luxury and functionality with our premium {product.title.toLowerCase()}.
                                </span>
                            </p>

                            {/* Meta Info Box */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="p-5 rounded-3xl bg-secondary/30 border border-border/50 flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-background flex items-center justify-center shadow-sm">
                                        <Calendar size={20} className="text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-black text-muted-foreground mb-1 tracking-widest">Added on</p>
                                        <p className="text-sm font-bold tracking-tight">{product.dateAdded}</p>
                                    </div>
                                </div>
                                <div className="p-5 rounded-3xl bg-secondary/30 border border-border/50 flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-background flex items-center justify-center shadow-sm">
                                        <Truck size={20} className="text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-black text-muted-foreground mb-1 tracking-widest">Shipping</p>
                                        <p className="text-sm font-bold tracking-tight">Express Delivery</p>
                                    </div>
                                </div>
                            </div>

                            {/* Action Area */}
                            <div className="pt-6 space-y-6">
                                <div className="flex flex-col sm:flex-row items-center gap-4">
                                    {/* Quantity Controller */}
                                    <div className="flex items-center bg-secondary/50 rounded-2xl border border-border p-1.5 w-full sm:w-auto">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="rounded-xl h-12 w-12 hover:bg-background shadow-sm"
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        >
                                            <Minus size={16} />
                                        </Button>
                                        <span className="px-6 font-black text-xl min-w-[60px] text-center">{quantity}</span>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="rounded-xl h-12 w-12 hover:bg-background shadow-sm"
                                            onClick={() => setQuantity(quantity + 1)}
                                        >
                                            <Plus size={16} />
                                        </Button>
                                    </div>

                                    <Button className="w-full sm:flex-1 h-16 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                                        <ShoppingBag className="mr-3 h-5 w-5" /> Add to Shopping Bag
                                    </Button>

                                    <Button variant="outline" size="icon" className="h-16 w-16 rounded-2xl border-2 hidden sm:flex">
                                        <Heart size={20} />
                                    </Button>
                                </div>

                                <div className="flex items-center gap-3 text-muted-foreground text-[10px] font-black uppercase tracking-widest justify-center sm:justify-start">
                                    <ShieldCheck size={16} className="text-primary" />
                                    100% Authentic Product & Global Warranty
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;