"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
    Sun, Moon, LogOut, LayoutDashboard,
    Menu, X, Home, Flame, Truck, LayoutGrid,
    LogIn
} from "lucide-react";
import { FaCartShopping, FaRegHeart } from "react-icons/fa6";

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
import Logo from "./Logo";

const Navbar = () => {
    const { data: session } = useSession();
    const { theme, setTheme } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();

    // data from redux
    const [cartCount, setCartCount] = useState(0);
    const [wishlistCount, setWishlistCount] = useState(0);

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

    if (!mounted) return null;

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
                    {/* Left: Logo */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden p-2 rounded-full bg-secondary/50 border border-white/10 text-foreground transition-transform active:scale-90"
                        >
                            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>

                        <Logo></Logo>
                    </div>

                    {/* Center: Links (Desktop) */}
                    <div className="hidden md:flex items-center gap-2 glass-dark p-2 rounded-full border border-white/10 shadow-inner">
                        {navLinks.slice(0, 4).map((link) => {
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

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2 md:gap-3">

                        {/* Wishlist Icon */}
                        <Link href="/wishlist" className="group relative p-2 text-foreground/70 hover:text-primary transition-all duration-300 hidden xs:block">

                            <FaRegHeart
                                size={20}
                                className={cn(
                                    "group-hover:scale-110 transition-transform duration-300 flex-shrink-0 text-foreground/70", // Default style
                                    wishlistCount > 0 && "text-red-500 fill-red-500/20 stroke-red-500 stroke-[2px]" // Active style (Solid Red)
                                )}
                            />

                            {wishlistCount > 0 && (
                                <span className="absolute top-1 right-1 bg-primary text-[8px] text-white w-4 h-4 rounded-full flex items-center justify-center font-bold border-2 border-background animate-pulse">
                                    {wishlistCount}
                                </span>
                            )}
                            <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-neutral-900 text-white text-[10px] rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl border border-white/10 z-[70]">
                                Wishlist
                            </span>
                        </Link>

                        {/* Cart Icon */}
                        <Link href="/cart" className="group relative p-2 text-foreground/70 hover:text-primary transition-all duration-300">
                            <FaCartShopping size={20} className="group-hover:scale-110 transition-transform" />
                            {
                                cartCount > 0 && (
                                    <span className="absolute top-1 right-1 bg-primary text-[8px] text-white w-4 h-4 rounded-full flex items-center justify-center font-bold border-2 border-background">
                                        {cartCount}
                                    </span>
                                )}
                            <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-neutral-900 text-white text-[10px] rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl border border-white/10 z-[70]">
                                Cart
                            </span>
                        </Link>

                        {/* Theme Toggle */}
                        <button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="p-2 rounded-full bg-secondary/50 border border-white/5 text-muted-foreground hover:text-primary transition-all active:rotate-90 duration-300"
                        >
                            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                        </button>

                        {/* Profile/Login */}
                        {session ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Avatar className="h-9 w-9 cursor-pointer ring-2 ring-primary/20 hover:ring-primary transition-all">
                                        <AvatarImage src={session.user?.image || ""} />
                                        <AvatarFallback className="bg-primary text-white text-xs">U</AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56 glass rounded-2xl p-2 border-white/10 shadow-2xl z-[100]">
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
                                <Button className="rounded-full px-5 h-9 font-black bg-primary hover:bg-primary/90 text-white text-[10px] uppercase tracking-widest flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-primary/20 cursor-pointer">
                                    <LogIn className="h-3.5 w-3.5" />
                                    <span>Sign In</span>
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[70] md:hidden"
                        />
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 left-0 h-full w-[280px] bg-background z-[80] md:hidden flex flex-col border-r border-white/10"
                        >
                            <div className="bg-neutral-950 p-6 pt-10 text-white relative">
                                <button onClick={() => setMobileOpen(false)} className="absolute top-4 right-4 p-2 bg-white/10 rounded-full">
                                    <X size={18} />
                                </button>
                                <h2 className="text-xl font-bold">EliteMart</h2>
                                <div className="flex gap-3 mt-6">
                                    <Link href="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                                        <button className="w-full bg-white text-black py-2.5 rounded-xl font-bold text-sm">Login</button>
                                    </Link>
                                    <Link href="/register" className="flex-1" onClick={() => setMobileOpen(false)}>
                                        <button className="w-full bg-neutral-800 text-white py-2.5 rounded-xl font-bold text-sm border border-neutral-700">Join</button>
                                    </Link>
                                </div>
                            </div>

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
                                                "flex items-center gap-4 px-5 py-4 rounded-2xl transition-all",
                                                isActive ? "bg-primary/10 text-primary" : "hover:bg-secondary/80 text-foreground/70"
                                            )}
                                        >
                                            <Icon size={20} className={cn(isActive ? "text-primary" : (link.color || "text-neutral-400"))} />
                                            <span className="font-bold text-sm">{link.name}</span>
                                        </Link>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;