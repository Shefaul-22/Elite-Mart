import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Logo = () => {
    return (
        <Link href="/" className="flex items-center gap-2.5 group">
            {/* Animated Icon Container */}
            <div className="bg-primary/10 p-2 rounded-xl border border-primary/20 group-hover:rotate-12 transition-all duration-300 shadow-sm">
                <ShoppingBag className="h-5 w-5 text-primary" />
            </div>

            {/* Text Section (Visible on all devices) */}
            <div className="flex flex-col leading-tight">
                <h1 className="text-lg md:text-xl font-black tracking-tighter flex items-center">
                    <span className="text-foreground">Elite</span>
                    <span className="text-primary">Mart</span>
                </h1>
                {/* Subtitle */}
                <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/60">
                    Premium Shop
                </p>
            </div>
        </Link>
    );
};

export default Logo;