"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
    ShoppingBag, Sun, Moon, LogOut, LayoutDashboard,
    Menu, X, LogIn, Home, Heart, Flame, Truck, LayoutGrid
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
    const { data: session } = useSession();
    const { theme, setTheme } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", path: "/", icon: Home },
        { name: "All Products", path: "/products", icon: LayoutGrid },
        { name: "New Arrivals", path: "/new-arrivals", icon: Flame, color: "text-emerald-500" },
        { name: "Free Delivery", path: "/delivery", icon: Truck, color: "text-blue-500" },
        { name: "Top Selling", path: "/top-selling", icon: Flame, color: "text-orange-500" },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100, x: "-50%", opacity: 0 }}
                animate={{ y: 0, x: "-50%", opacity: 1 }}
                className={cn(
                    "fixed top-4 left-1/2 z-[60] transition-all duration-500 rounded-full border",
                    "w-[95%] max-w-7xl mx-auto",
                    scrolled ? "glass shadow-2xl py-2 px-4 md:px-6 border-white/10" : "bg-transparent py-4 px-6 md:px-8 border-transparent"
                )}
            >
                <div className="flex items-center justify-between">
                    {/* Left: Menu + Logo */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden p-2 rounded-full bg-secondary/50 border border-white/10 text-foreground transition-transform active:scale-90"
                        >
                            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="bg-primary/10 p-2 rounded-xl border border-primary/20 group-hover:rotate-12 transition-transform">
                                <ShoppingBag className="h-5 w-5 text-primary" />
                            </div>
                            <h1 className="text-xl font-black tracking-tighter hidden sm:block">EliteMart</h1>
                        </Link>
                    </div>



                    {/* Center: Desktop Links with Glassmorphism */}
                    <div className="hidden md:flex items-center gap-2 glass-dark p-2 rounded-full border border-white/10 shadow-inner">
                        {
                            navLinks.slice(0, 4).map((link) => {
                                const isActive = pathname === link.path;
                                return (
                                    <Link
                                        key={link.path}
                                        href={link.path}
                                        className={cn(
                                            "relative px-6 py-2 text-sm font-bold transition-all duration-300 rounded-full",
                                            isActive ? "text-primary" : "text-foreground/60 hover:text-foreground"
                                        )}
                                    >
                                        <span className="relative z-10">{link.name}</span>
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeNav"
                                                className="absolute inset-0 nav-active-glow rounded-full -z-0"
                                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                            />
                                        )}
                                    </Link>
                                );
                            })}
                    </div>

                    {/* Right: Wishlist, Cart, Theme, User */}
                    <div className="flex items-center gap-2 md:gap-3">
                        <button className="p-2 hover:text-primary transition-colors hidden xs:block"><Heart size={20} /></button>
                        <button className="p-2 hover:text-primary transition-colors relative">
                            <ShoppingBag size={20} />
                            <span className="absolute top-1 right-1 bg-primary text-[8px] text-white w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">0</span>
                        </button>

                        {

                            mounted && (
                                <button
                                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                    className="p-2 rounded-full bg-secondary/50 border border-white/5 text-muted-foreground hover:text-primary transition-all"
                                >
                                    {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                                </button>
                            )}

                        {session ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Avatar className="h-8 w-8 md:h-9 md:w-9 cursor-pointer ring-2 ring-primary/20 hover:ring-primary transition-all">
                                        <AvatarImage src={session.user?.image} />
                                        <AvatarFallback className="bg-primary text-white text-xs">U</AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56 glass rounded-2xl p-2 border-white/10 shadow-2xl">
                                    <DropdownMenuLabel className="px-3 py-2 text-xs opacity-60">My Account</DropdownMenuLabel>
                                    <DropdownMenuItem asChild className="rounded-xl cursor-pointer">
                                        <Link href="/dashboard" className="flex items-center w-full">
                                            <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator className="bg-white/10" />
                                    <DropdownMenuItem onClick={() => signOut()} className="text-red-500 rounded-xl cursor-pointer">
                                        <LogOut className="mr-2 h-4 w-4" /> Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Link href="/login" className="hidden sm:block">
                                <Button className="rounded-full px-5 h-9 font-bold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 text-xs">
                                    Sign In
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Sidebar (Half Screen Left) */}
            <AnimatePresence>
                {
                    mobileOpen && (
                        <>
                            {/* Overlay */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setMobileOpen(false)}
                                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[70] md:hidden"
                            />

                            {/* Sidebar */}
                            <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "-100%" }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                className="fixed top-0 left-0 h-full w-[280px] bg-background z-[80] md:hidden flex flex-col shadow-2xl"
                            >
                                {/* Header Section (Fabrilife Style) */}
                                <div className="bg-neutral-950 p-6 pt-10 text-white relative">
                                    <button
                                        onClick={() => setMobileOpen(false)}
                                        className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                                    >
                                        <X size={18} />
                                    </button>

                                    <h2 className="text-xl font-bold mb-6 mt-2">Welcome to EliteMart</h2>

                                    <div className="flex gap-3 mt-4">
                                        <Link href="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                                            <button className="w-full bg-white text-black py-2.5 rounded-xl font-bold text-sm hover:bg-neutral-200 transition-colors">
                                                Login
                                            </button>
                                        </Link>
                                        <Link href="/register" className="flex-1" onClick={() => setMobileOpen(false)}>
                                            <button className="w-full bg-neutral-800 text-white py-2.5 rounded-xl font-bold text-sm border border-neutral-700 hover:bg-neutral-700 transition-colors">
                                                Register
                                            </button>
                                        </Link>
                                    </div>
                                </div>

                                {/* Links Section (Scrollable) */}
                                <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-1">
                                    {navLinks.map((link) => {
                                        const Icon = link.icon;
                                        const isActive = pathname === link.path;
                                        return (
                                            <Link
                                                key={link.path}
                                                href={link.path}
                                                onClick={() => setMobileOpen(false)}
                                                className={cn(
                                                    "flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 group",
                                                    isActive ? "bg-primary/10 text-primary" : "hover:bg-secondary/80 text-foreground/70"
                                                )}
                                            >
                                                <Icon size={20} className={cn("shrink-0", isActive ? "text-primary" : (link.color || "text-neutral-400 group-hover:text-foreground"))} />
                                                <span className="font-bold text-sm">{link.name}</span>
                                            </Link>
                                        );
                                    })}
                                </div>

                                {/* Bottom Footer Section (Optional) */}
                                <div className="p-6 border-t border-border mt-auto">
                                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest text-center">
                                        Premium Shopping Experience
                                    </p>
                                </div>
                            </motion.div>
                        </>
                    )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;