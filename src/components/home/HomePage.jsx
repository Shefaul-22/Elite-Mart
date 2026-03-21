"use client";
import React from "react";
import { motion } from "framer-motion";
import Banner from "./Banner";
import Categories from "./Categories";
import NewArrivals from "./NewArrivals";
import FlashSale from "./FlashSale";
import Features from "./Features";
import Reviews from "./Reviews";
import FAQ from "./FAQ";

const HomePage = ({ session }) => {

    // Elite Reveal Animation Config
    const revealAnimation = {
        hidden: {
            opacity: 0,
            y: 60,
            scale: 0.98
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 1,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
            }
        }
    };

    return (
        <div className="flex flex-col gap-y-20 md:gap-y-36  overflow-hidden">

            {/* 1. Hero / Banner - No reveal animation usually looks better here */}
            <section>
                <Banner />
            </section>

            <div className="flex flex-col gap-y-24 md:gap-y-32">

                {/* 2. Top Categories */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={revealAnimation}
                    className="max-w-7xl mx-auto px-6 w-full"
                >
                    <Categories />
                </motion.section>

                {/* 3. New Arrivals */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={revealAnimation}
                    className="max-w-7xl mx-auto px-6 w-full"
                >
                    <NewArrivals />
                </motion.section>

                {/* 4. Promotional Banner */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={revealAnimation}
                >
                    <FlashSale />
                </motion.section>

                {/* 5. Trust Badges & Features */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={revealAnimation}
                    className="max-w-7xl mx-auto px-6 w-full"
                >
                    <Features />
                </motion.section>

                {/* 6. Customer Testimonials */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={revealAnimation}
                    className="w-full"
                >
                    <Reviews />
                </motion.section>

                {/* 7. FAQ & Support */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={revealAnimation}
                    className="max-w-5xl mx-auto px-6 w-full"
                >
                    <FAQ />
                </motion.section>

            </div>

            {/* Development Session Info */}

            {/* {process.env.NODE_ENV === "development" && session && (
                <div className="fixed bottom-4 left-4 z-50 bg-black/80 text-white p-2 rounded-lg text-[10px] backdrop-blur-md">
                     Logged in as {session.user.email}
                </div>
            )} */}

        </div>
    );
};

export default HomePage;