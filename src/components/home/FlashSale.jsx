"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Timer } from "lucide-react";
import Image from "next/image";

const FlashSale = () => {
    return (
        <div className="w-full px-6 md:px-10">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative w-full max-w-7xl mx-auto overflow-hidden rounded-[3rem] bg-primary group"
            >
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-black/10 -skew-x-12 translate-x-20 z-0" />
                <Zap className="absolute top-10 right-10 text-white/10 w-64 h-64 -rotate-12 group-hover:scale-110 transition-transform duration-1000" />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-12 p-10 md:p-20">

                    {/* Left Side: Text Content */}
                    <div className="text-white space-y-8">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-xs font-black uppercase tracking-widest backdrop-blur-md border border-white/10">
                            <Timer size={16} className="animate-pulse" />
                            Limited Time Offer • Ends in 24h
                        </div>

                        <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9]">
                            Season <br />
                            <span className="text-secondary italic">Clearance</span> <br />
                            Sale Up to 60%
                        </h2>

                        <p className="text-lg text-white/80 max-w-md font-medium leading-relaxed">
                            Don&apos;t miss out on our most exclusive collection at unbeatable prices.
                            Elevate your wardrobe with premium pieces today.
                        </p>

                        <div className="flex flex-wrap gap-6 pt-4">
                            <Button size="lg" className="bg-white text-primary hover:bg-secondary hover:text-white rounded-full h-16 px-10 text-sm font-black uppercase tracking-widest shadow-2xl transition-all active:scale-95">
                                Claim Discount
                            </Button>
                            <button className="flex items-center gap-2 text-sm font-black uppercase tracking-tighter hover:underline decoration-2 underline-offset-8 transition-all">
                                View Sale Items <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Right Side: Product Image Showcase */}
                    <div className="relative hidden lg:block">
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="relative aspect-square w-full max-w-md mx-auto"
                        >
                            {/* Image Border/Frame */}
                            <div className="absolute inset-0 border-[15px] border-white/20 rounded-full animate-[spin_30s_linear_infinite]" />

                            <div className="relative h-full w-full rounded-full overflow-hidden border-8 border-white shadow-2xl">
                                <Image
                                    src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop"
                                    alt="Sale Showcase"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>

                            {/* Discount Floating Badge */}
                            <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-secondary flex flex-col items-center justify-center text-white shadow-2xl border-4 border-white rotate-12">
                                <span className="text-xs font-black leading-none uppercase">Save</span>
                                <span className="text-2xl font-black">60%</span>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </motion.div>
        </div>
    );
};

export default FlashSale;