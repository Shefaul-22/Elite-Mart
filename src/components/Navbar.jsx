"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    LogOut,
    PlusCircle,
    LayoutDashboard,
    Settings,
    Sun,
    Moon,
    ShoppingBag
} from "lucide-react";

const Navbar = () => {
    const { data: session } = useSession();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Hydration mismatch 
    useEffect(() => {
        setMounted(true);
    }, []);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "All Products", path: "/products" },
        { name: "About Us", path: "/about" },
        { name: "Contact Us", path: "/contact" },
    ];

    return (
        // আপনার globals.css এর 'glass' ইউটিলিটি ক্লাসটি এখানে ব্যবহার করা হয়েছে
        <nav className="glass sticky top-0 z-50 w-full">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 text-2xl font-bold transition-transform hover:scale-105 active:scale-95">
                    <ShoppingBag className="h-7 w-7 text-primary" />
                    <span className="tracking-tight">
                        Elite<span className="text-slate-900 dark:text-white">Mart</span>
                    </span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            href={link.path}
                            className="relative text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Right Side: Theme Toggle & Auth */}
                <div className="flex items-center space-x-3">

                    {/* Theme Toggle Button */}
                    {mounted && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="rounded-full w-9 h-9 border border-border hover:bg-accent transition-all"
                        >
                            <Sun className="h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-500" />
                            <Moon className="absolute h-[1.1rem] w-[1.1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-blue-400" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                    )}

                    {session ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar className="h-9 w-9 cursor-pointer ring-2 ring-primary/10 hover:ring-primary/40 transition-all">
                                    <AvatarImage src={session.user?.image} alt={session.user?.name} />
                                    <AvatarFallback className="bg-primary text-primary-foreground">
                                        {session.user?.name?.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-60 p-2 shadow-xl border-border animate-in fade-in zoom-in-95">
                                <DropdownMenuLabel className="font-normal px-2 pb-2">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-semibold leading-none">{session.user?.name}</p>
                                        <p className="text-xs leading-none text-muted-foreground">{session.user?.email}</p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />

                                <DropdownMenuItem asChild className="rounded-md">
                                    <Link href="/dashboard" className="flex items-center cursor-pointer py-2">
                                        <LayoutDashboard className="mr-2 h-4 w-4 text-primary" /> Dashboard
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild className="rounded-md">
                                    <Link href="/dashboard/add-product" className="flex items-center cursor-pointer py-2">
                                        <PlusCircle className="mr-2 h-4 w-4 text-green-500" /> Add Product
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild className="rounded-md">
                                    <Link href="/dashboard/manage-products" className="flex items-center cursor-pointer py-2">
                                        <Settings className="mr-2 h-4 w-4 text-slate-500" /> Manage Products
                                    </Link>
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="text-red-600 dark:text-red-400 cursor-pointer focus:bg-red-50 dark:focus:bg-red-950/30 py-2 rounded-md"
                                    onClick={() => signOut()}
                                >
                                    <LogOut className="mr-2 h-4 w-4" /> Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Link href="/login">
                            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition-all active:scale-95 px-6">
                                Login
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;