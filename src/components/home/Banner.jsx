"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Banner = () => {
    return (
        <div className="relative flex min-h-[600px] w-full items-center justify-center overflow-hidden bg-background px-6">

            {/* Background Gradients মুছে ফেলা হয়েছে */}

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="z-10 w-full max-w-4xl rounded-3xl border border-border bg-card/50 p-12 text-center shadow-xl backdrop-blur-md"
            >
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-5xl font-black tracking-tight text-transparent md:text-7xl"
                >
                    Elevate Your Style
                </motion.h1>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-6 text-lg text-muted-foreground md:text-xl"
                >
                    Exclusive collections for the elite. Experience the future of premium shopping.
                </motion.p>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-10 flex flex-wrap justify-center gap-4"
                >
                    <Button size="lg" className="h-14 bg-primary px-8 text-lg hover:opacity-90">
                        Explore Collection
                    </Button>
                    <Button size="lg" variant="outline" className="h-14 border-primary px-8 text-lg text-primary hover:bg-primary/5">
                        View Offers
                    </Button>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Banner;