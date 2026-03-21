"use client";
import React from "react";
import { motion } from "framer-motion";
import { Truck, ShieldCheck, RefreshCcw, Headset, Sparkles, Diamond } from "lucide-react";

const features = [
    {
        icon: <Truck className="w-8 h-8" />,
        title: "Global Shipping",
        description: "Experience seamless worldwide delivery with our elite logistics partners.",
        delay: 0.1,
    },
    {
        icon: <ShieldCheck className="w-8 h-8" />,
        title: "Secure Checkout",
        description: "Your transactions are protected by industry-leading 256-bit encryption.",
        delay: 0.2,
    },
    {
        icon: <RefreshCcw className="w-8 h-8" />,
        title: "Easy Returns",
        description: "Not satisfied? Enjoy a hassle-free 30-day return policy on all items.",
        delay: 0.3,
    },
    {
        icon: <Headset className="w-8 h-8" />,
        title: "24/7 Support",
        description: "Our dedicated concierge team is always here to assist your luxury journey.",
        delay: 0.4,
    },
];

const Features = () => {
    return (
        <section className="w-full  relative overflow-hidden">
            {/* Background Decorative Line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            {/* --- Updated Header --- */}
            <div className="flex flex-col items-center text-center mb-16 space-y-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-[10px] md:text-xs font-black text-primary ring-1 ring-primary/20 uppercase tracking-[0.3em]"
                >
                    <Diamond size={14} className="animate-pulse" /> The Elite Standard
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-5xl font-black tracking-tighter text-foreground"
                >
                    Your Trust,  <span className="text-primary italic">Our Signature</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-muted-foreground font-medium max-w-xl mx-auto leading-relaxed"
                >
                    From the moment you browse to the second your order arrives, we ensure every step reflects the luxury you deserve.
                </motion.p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">

                {
                    features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.8,
                                delay: feature.delay,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                            className="group relative flex flex-col items-center text-center p-8 rounded-[2.5rem] transition-all duration-500 hover:bg-card hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] border border-transparent hover:border-border"
                        >
                            {/* Icon Container with Glow */}
                            <div className="relative mb-8">
                                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-700" />
                                <div className="relative w-20 h-20 rounded-[1.5rem] bg-secondary flex items-center justify-center text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-white group-hover:-translate-y-2 group-hover:rotate-[8deg] shadow-sm">
                                    {feature.icon}
                                </div>
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-black tracking-tight text-foreground mb-4 uppercase">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed font-medium px-2">
                                {feature.description}
                            </p>

                            {/* Interactive Underline */}
                            <div className="absolute bottom-6 w-0 h-1 bg-primary/40 rounded-full transition-all duration-500 group-hover:w-16" />
                        </motion.div>
                    ))}
            </div>

            {/* Trust Badges - Enhanced */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-24 py-8 border-t border-border/50 flex flex-wrap justify-center items-center gap-6 md:gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-1000"
            >
                {["Authenticity Guaranteed", "Premium Materials", "Ethical Sourcing"].map((text, i) => (
                    <React.Fragment key={i}>
                        <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-foreground hover:text-primary transition-colors cursor-default">
                            {text}
                        </span>
                        {i < 2 && <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-primary/30" />}
                    </React.Fragment>
                ))}
            </motion.div>
        </section>
    );
};

export default Features;