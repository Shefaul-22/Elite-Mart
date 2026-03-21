"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag, Sparkles } from "lucide-react";
import Link from "next/link";
import Typewriter from "typewriter-effect"; 

const Banner = () => {

    const currentYear = new Date().getFullYear();

    return (
        <div className="relative w-full overflow-hidden bg-background  pb-12 pt-28 md:pb-20 min-h-[70vh] flex items-center">

            {/* 1. Dynamic Background Element */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-[0.03] dark:opacity-[0.05]"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}>
                </div>
                <div className="absolute top-[-5%] left-[-5%] w-[30%] h-[30%] bg-primary/10 blur-[100px] rounded-full"></div>
                <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] bg-purple-500/10 blur-[120px] rounded-full"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

                    {/* 2. Left Side: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col items-start text-left z-10"
                    >
                        {/* Headline Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-[10px] md:text-xs font-black text-primary ring-1 ring-primary/20 uppercase tracking-[0.2em] mb-6 shadow-sm"
                        >
                            <Sparkles size={14} className="animate-pulse" />
                            Elite Collections • {currentYear}
                        </motion.div>

                        {/* Headline with Typewriter Library */}
                        <div className="font-black text-5xl md:text-6xl tracking-tighter text-foreground ">
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                Discover <br />
                                <span className="text-primary italic">Your Own</span> <br />
                            </motion.span>

                            <div className="text-foreground flex gap-3 h-[1.2em]">
                                <Typewriter
                                    options={{
                                        strings: ['Style', 'Fashion', 'Identity'],
                                        autoStart: true,
                                        loop: true,
                                        cursorClassName: "text-primary animate-pulse", 
                                        wrapperClassName: "text-foreground" 
                                    }}
                                />
                            </div>
                        </div>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="mt-6 text-base text-muted-foreground/80 max-w-md leading-relaxed font-medium"
                        >
                            Experience the pinnacle of premium fashion. Our curated collections are designed for those who define excellence.
                        </motion.p>

                        {/* Primary CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="mt-10 flex flex-wrap gap-5 items-center"
                        >
                            <Button size="lg" className="group rounded-full h-14 bg-primary px-8 text-sm font-black uppercase tracking-widest text-white shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all active:scale-95">
                                <ShoppingBag className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                                Shop Now
                            </Button>

                            <Link href="/products" className="group flex items-center gap-2 text-xs font-black uppercase tracking-tighter text-foreground hover:text-primary transition-colors">
                                Browse Catalogue <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-2" />
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* 3. Right Side: Adjusted Image Size */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: 50 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="relative  items-center justify-center lg:justify-end hidden md:flex"
                    >
                        <div className="absolute inset-0 flex items-center justify-center lg:justify-end lg:right-10 -z-10">
                            <div className="w-[80%] h-[70%] border border-primary/10 rounded-full animate-[spin_20s_linear_infinite]" />
                        </div>

                        <div className="relative w-[60%] sm:w-[60%] lg:w-[70%] aspect-[4/5] rounded-[2.5rem] overflow-hidden border-[10px] border-card shadow-2xl group">
                            <img
                                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop"
                                alt="Elite Fashion"
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>

                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute bottom-4 left-0 lg:left-10 glass p-4 rounded-2xl border border-white/10 shadow-xl hidden md:block"
                        >
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-white">
                                    <Sparkles size={18} />
                                </div>
                                <div>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-primary leading-none">New Trend</p>
                                    <p className="text-xs font-bold mt-1">Premium Quality</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Banner;