"use client";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
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
import { Menu, ShoppingCart, LogOut, PlusCircle, LayoutDashboard, Settings } from "lucide-react";

const Navbar = () => {
    const { data: session } = useSession();

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "All Products", path: "/products" },
        { name: "About Us", path: "/about" },
        { name: "Contact Us", path: "/contact" },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">

                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-blue-600">
                    Elite<span className="text-slate-900">Mart</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
                    {navLinks.map((link) => (
                        <Link key={link.path} href={link.path} className="hover:text-blue-600 transition">
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Right Side: Auth / Actions */}
                <div className="flex items-center space-x-4">
                    {session ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar className="h-9 w-9 cursor-pointer border-2 border-blue-100 hover:border-blue-400 transition">
                                    <AvatarImage src={session.user?.image} alt={session.user?.name} />
                                    <AvatarFallback>{session.user?.name?.charAt(0)}</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">{session.user?.name}</p>
                                        <p className="text-xs leading-none text-muted-foreground">{session.user?.email}</p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />

                                {/* Dashboard & Products (Conditional) */}
                                <DropdownMenuItem asChild>
                                    <Link href="/dashboard" className="flex items-center cursor-pointer">
                                        <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/dashboard/add-product" className="flex items-center cursor-pointer">
                                        <PlusCircle className="mr-2 h-4 w-4" /> Add Product
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/dashboard/manage-products" className="flex items-center cursor-pointer">
                                        <Settings className="mr-2 h-4 w-4" /> Manage Products
                                    </Link>
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="text-red-600 cursor-pointer focus:bg-red-50"
                                    onClick={() => signOut()}
                                >
                                    <LogOut className="mr-2 h-4 w-4" /> Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Link href="/login">
                            <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
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