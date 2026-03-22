"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Eye, Package, Loader2 } from "lucide-react";
import { getProducts, deleteProduct } from "@/actions/server/addproduct"; 
import Swal from "sweetalert2";
import Image from "next/image";

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
        setLoading(false);
    };

    const handleDelete = async (id) => {
      
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This product will be permanently removed!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "oklch(var(--primary))",
            cancelButtonColor: "#ef4444",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, keep it",
            background: "oklch(var(--card))",
            color: "oklch(var(--foreground))",
            customClass: {
                popup: 'rounded-[2rem]',
                confirmButton: 'rounded-xl px-6 py-3 font-bold uppercase tracking-widest',
                cancelButton: 'rounded-xl px-6 py-3 font-bold uppercase tracking-widest'
            }
        });

        if (result.isConfirmed) {
            try {
               
                Swal.fire({
                    title: 'Deleting...',
                    allowOutsideClick: false,
                    didOpen: () => { Swal.showLoading(); }
                });

                const res = await deleteProduct(id);

                if (res.success) {
                    // UI  (Optimistic Update)
                    setProducts((prev) => prev.filter(item => item._id !== id));

                    Swal.fire({
                        title: "Deleted!",
                        text: "Product has been removed.",
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false,
                        background: "oklch(var(--card))",
                        color: "oklch(var(--foreground))",
                    });
                } else {
                    throw new Error(res.message);
                }
            } catch (error) {
                Swal.fire({
                    title: "Error!",
                    text: error.message || "Failed to delete product.",
                    icon: "error",
                    confirmButtonColor: "#ef4444",
                });
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
                <p className="text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">Loading Collection</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pt-28 pb-20 px-4 md:px-10">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="inline-flex p-2 rounded-lg bg-primary/10 text-primary mb-3">
                        <Package size={20} />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
                        Manage <span className="text-primary italic">Inventory</span>
                    </h1>
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Total Stock</p>
                    <p className="text-4xl font-black text-primary">{products.length}</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto">
                {/* --- DESKTOP VIEW (Table) --- */}
                <div className="hidden md:block overflow-hidden rounded-[2rem] border border-border bg-card shadow-2xl">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-muted/50 border-b border-border">
                                <th className="p-6 text-[10px] font-black uppercase tracking-widest">Product</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-widest">Price</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence mode="popLayout">
                                {products.map((item) => (
                                    <motion.tr
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        key={item._id}
                                        className="border-b border-border/50 hover:bg-muted/30 transition-colors group"
                                    >
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-muted border border-border group-hover:scale-105 transition-transform">
                                                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-sm uppercase tracking-tight">{item.title}</h3>
                                                    <p className="text-xs text-muted-foreground line-clamp-1 max-w-[300px]">{item.shortDesc}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6 font-black text-primary text-lg">${item.price}</td>
                                        <td className="p-6">
                                            <div className="flex items-center justify-center gap-2">
                                                <button className="p-3 rounded-xl bg-muted hover:bg-primary hover:text-primary-foreground transition-all">
                                                    <Eye size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item._id)}
                                                    className="p-3 rounded-xl bg-muted hover:bg-red-500 hover:text-white transition-all"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>

                {/* --- MOBILE VIEW (Cards) --- */}
                <div className="grid grid-cols-1 gap-6 md:hidden">
                    <AnimatePresence mode="popLayout">
                        {products.map((item) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                                key={item._id}
                                className="bg-card border border-border p-5 rounded-[2rem] shadow-xl relative overflow-hidden"
                            >
                                <div className="flex gap-4">
                                    <div className="relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 border border-border">
                                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                                    </div>
                                    <div className="flex flex-col justify-between py-1 flex-1">
                                        <div>
                                            <h3 className="font-black text-sm uppercase tracking-tighter leading-tight">{item.title}</h3>
                                            <p className="text-[10px] text-primary font-bold mt-1">${item.price}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="flex-1 h-10 px-4 rounded-xl bg-muted flex items-center justify-center hover:bg-primary/10">
                                                <Eye size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item._id)}
                                                className="flex-1 h-10 px-4 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {products.length === 0 && !loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20 border-2 border-dashed border-border rounded-[3rem]"
                    >
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">Empty Inventory</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default ManageProducts;