"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Banner = () => {
    return (
        <div className="relative h-[500px] w-full overflow-hidden bg-slate-900 flex items-center justify-center text-white">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center space-y-6 z-10"
            >
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter">
                    Elite <span className="text-blue-500">Mart</span>
                </h1>
                <p className="text-lg text-slate-300 max-w-lg mx-auto">
                    Discover a premium shopping experience with our curated collection of elite products.
                </p>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg">
                    Shop Now
                </Button>
            </motion.div>

            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-blue-600 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-600 rounded-full blur-[150px]"></div>
            </div>
        </div>
    );
};

export default Banner;