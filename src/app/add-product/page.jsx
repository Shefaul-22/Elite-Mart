"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { PlusCircle, Image as ImageIcon, DollarSign, TextQuote, AlignLeft, Send, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Swal from "sweetalert2";
import axios from "axios";
import { postProduct } from "@/actions/server/addproduct";

const AddProductPage = () => {
    const [loadingText, setLoadingText] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm({
        mode: "onChange"
    });

    // UX-এর জন্য Toast কনফিগারেশন
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: 'oklch(var(--card))',
        color: 'oklch(var(--foreground))',
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });

    const onSubmit = async (data) => {
        try {
            setLoadingText("Uploading Image...");
            const productImg = data.productImg[0];
            const formData = new FormData();
            formData.append("image", productImg);

            const image_API_URL = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`;
            const imgRes = await axios.post(image_API_URL, formData);
            const photoURL = imgRes.data.data.url;

            setLoadingText("Saving Product...");
            const productData = {
                title: data.title,
                price: data.price,
                shortDesc: data.shortDesc,
                fullDesc: data.fullDesc,
                image: photoURL,
            };

            const result = await postProduct(productData);

            if (result.acknowledged) {
                // UI Block না করে সুন্দর একটি Success Alert
                Swal.fire({
                    icon: 'success',
                    title: 'Product Added!',
                    text: 'Your new product is now live in the shop.',
                    showConfirmButton: false,
                    timer: 2000,
                    background: 'oklch(var(--card))',
                    color: 'oklch(var(--foreground))',
                    iconColor: '#10b981',
                    customClass: {
                        popup: 'rounded-[2.5rem] border-2 border-primary/20 shadow-2xl',
                    }
                });
                reset();
            } else {
                throw new Error("Failed to save product.");
            }
        } catch (error) {
            console.error("Submission Error:", error);
            Toast.fire({
                icon: 'error',
                title: error.message || 'Something went wrong!'
            });
        } finally {
            setLoadingText("");
        }
    };

    const ErrorMsg = ({ name }) => (
        <AnimatePresence>
            {errors[name] && (
                <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-red-500 text-[10px] font-black uppercase tracking-tighter flex items-center gap-1 mt-1"
                >
                    <AlertCircle size={10} /> {errors[name].message}
                </motion.p>
            )}
        </AnimatePresence>
    );

    return (
        <div className="min-h-screen bg-background pb-20 pt-28 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl mx-auto"
            >
                <div className="mb-10 text-center">
                    <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-4">
                        <PlusCircle size={32} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">
                        Add New <span className="text-primary italic">Product</span>
                    </h1>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-card border border-border p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden">

                    {/* Loading Overlay: সাবমিট করার সময় ফর্মের উপর একটি স্মুথ গ্লাস ইফেক্ট আসবে */}
                    <AnimatePresence>
                        {isSubmitting && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-background/60 backdrop-blur-md"
                            >
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                    className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full mb-4"
                                />
                                <p className="text-xs font-black uppercase tracking-widest animate-pulse text-primary">
                                    {loadingText || "Processing..."}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 text-muted-foreground">
                                <TextQuote size={14} /> Product Title
                            </label>
                            <Input
                                {...register("title", {
                                    required: "Title is required",
                                    minLength: { value: 3, message: "Minimum 3 characters" }
                                })}
                                placeholder="e.g. Premium Leather Bag"
                                className={`h-14 rounded-xl border-2 transition-all ${errors.title ? "border-red-500/50 focus-visible:ring-red-500" : "focus-visible:ring-primary"}`}
                            />
                            <ErrorMsg name="title" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 text-muted-foreground">
                                <DollarSign size={14} /> Price ($)
                            </label>
                            <Input
                                type="number"
                                step="0.01"
                                {...register("price", {
                                    required: "Price is required",
                                    min: { value: 1, message: "Price must be at least 1" }
                                })}
                                placeholder="299.00"
                                className={`h-14 rounded-xl border-2 transition-all ${errors.price ? "border-red-500/50 focus-visible:ring-red-500" : "focus-visible:ring-primary"}`}
                            />
                            <ErrorMsg name="price" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 text-muted-foreground">
                            <AlignLeft size={14} /> Short Description
                        </label>
                        <Input
                            {...register("shortDesc", {
                                required: "Short description is required",
                                maxLength: { value: 100, message: "Keep it under 100 characters" }
                            })}
                            placeholder="Brief catchy line about the product"
                            className={`h-14 rounded-xl border-2 transition-all ${errors.shortDesc ? "border-red-500/50 focus-visible:ring-red-500" : "focus-visible:ring-primary"}`}
                        />
                        <ErrorMsg name="shortDesc" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 text-muted-foreground">
                            <AlignLeft size={14} /> Full Description
                        </label>
                        <Textarea
                            {...register("fullDesc", {
                                required: "Detailed description is required",
                                minLength: { value: 20, message: "Tell us more (at least 20 characters)" }
                            })}
                            placeholder="Detailed product features..."
                            className={`min-h-[150px] rounded-xl border-2 py-4 transition-all ${errors.fullDesc ? "border-red-500/50 focus-visible:ring-red-500" : "focus-visible:ring-primary"}`}
                        />
                        <ErrorMsg name="fullDesc" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 text-muted-foreground">
                            <ImageIcon size={14} /> Product Image
                        </label>
                        <Input
                            type="file"
                            accept="image/*"
                            {...register("productImg", { required: "Product image is required" })}
                            className={`h-14 rounded-xl border-2 pt-3 transition-all cursor-pointer file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:uppercase file:bg-primary/10 file:text-primary ${errors.productImg ? "border-red-500/50 focus-visible:ring-red-500" : "focus-visible:ring-primary"}`}
                        />
                        <ErrorMsg name="productImg" />
                    </div>

                    <Button
                        disabled={isSubmitting}
                        className="w-full h-16 rounded-2xl bg-foreground text-background font-black uppercase tracking-[0.2em] hover:scale-[1.02] transition-transform active:scale-95 disabled:opacity-70"
                    >
                        <span className="flex items-center gap-2">Add Product <Send size={18} /></span>
                    </Button>
                </form>
            </motion.div>
        </div>
    );
};

export default AddProductPage;