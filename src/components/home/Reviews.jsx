"use client";
import React from "react";
import { Star, Quote, Sparkles } from "lucide-react";
import Image from "next/image";

const reviews = [
    {
        id: 1,
        name: "Alex Thompson",
        role: "Fashion Designer",
        comment: "The quality of the leather jacket exceeded my expectations. Truly elite craftsmanship!",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "Sarah Jenkins",
        role: "Verified Buyer",
        comment: "Fastest shipping I've ever experienced for premium apparel. The packaging was luxury too.",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop"
    },
    {
        id: 3,
        name: "Michael Chen",
        role: "Style Influencer",
        comment: "Found my signature style here. The watches are masterpiece pieces for any collection.",
        rating: 4,
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
    },
    {
        id: 4,
        name: "Elena Rodriguez",
        role: "Luxury Collector",
        comment: "Customer service is top-notch. They helped me find the perfect fit for my gala event.",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
    }
];

const Reviews = () => {
    
    const duplicatedReviews = [...reviews, ...reviews];

    return (
        <div className="w-full overflow-hidden">
            {/* Section Header */}
            <div className="flex flex-col items-center text-center mb-16">
                <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-[10px] md:text-xs font-black text-primary ring-1 ring-primary/20 uppercase tracking-[0.3em] mb-4">
                    <Sparkles size={14} /> Global Community
                </div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground">
                    What Our <span className="text-primary italic">Elite</span> Members Say
                </h2>
            </div>

            {/* Marquee Container */}
            <div className="relative flex w-full">
                <div className="flex animate-marquee gap-8 whitespace-nowrap">
                    {duplicatedReviews.map((review, index) => (
                        <div
                            key={index}
                            className="w-[350px] md:w-[450px] flex-shrink-0 bg-card border border-border p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500 group relative overflow-hidden"
                        >
                            {/* Background Quote Icon */}
                            <Quote className="absolute -right-4 -top-4 w-24 h-24 text-primary/5 -rotate-12 transition-transform group-hover:rotate-0 duration-700" />

                            {/* Stars */}
                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={16}
                                        className={i < review.rating ? "fill-primary text-primary" : "text-muted-border"}
                                    />
                                ))}
                            </div>

                            {/* Comment */}
                            <p className="text-lg md:text-xl font-medium text-foreground leading-relaxed whitespace-normal mb-8 italic">
                                "{review.comment}"
                            </p>

                            {/* User Info */}
                            <div className="flex items-center gap-4">
                                <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-primary/20">
                                    <Image
                                        src={review.avatar}
                                        alt={review.name}
                                        fill
                                        className="object-cover"
                                        sizes="40px"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-black text-sm uppercase tracking-widest text-foreground">
                                        {review.name}
                                    </h4>
                                    <p className="text-xs font-bold text-primary uppercase opacity-70">
                                        {review.role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Reviews;