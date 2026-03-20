"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Loader2, ArrowRight, User, Camera, Image as ImageIcon } from "lucide-react";

import Logo from "../Logo";
import { postUser } from "@/actions/server/auth";
import { SocialButtons } from "./SocialButtons";


const RegisterForm = () => {

  const params = useSearchParams();
  const router = useRouter();
  const callback = params.get("callbackUrl") || "/";
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Processing");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // check photo selected or not
  const selectedPhoto = watch("photo");

  const onSubmit = async (data) => {
    // 1. Gmail Validation
    if (!data.email.endsWith("gmail.com")) {
      Swal.fire({
        icon: "warning",
        title: "Gmail Only",
        text: "Please use a valid @gmail.com account.",
        confirmButtonColor: "var(--primary)",
      });
      return;
    }

    setLoading(true);

    try {
      // 2. Image Upload to ImgBB
      setLoadingText("Uploading Image...");
      const profileImg = data.photo[0];
      const formData = new FormData();
      formData.append("image", profileImg);

      // 
      const image_API_URL = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`;

      const imgRes = await axios.post(image_API_URL, formData);
      const photoURL = imgRes.data.data.url;

      // 3. Register User (Saving to DB)
      setLoadingText("Creating Account...");
      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
        image: photoURL,
      };

      const result = await postUser(userData);

      if (result.acknowledged) {
        // 4. Auto Login after Registration
        setLoadingText("Signing you in...");
        const loginResult = await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
          callbackUrl: callback,
        });

        if (loginResult.ok) {
          await Swal.fire({
            icon: "success",
            title: "Welcome!",
            text: "Registration Successful.",
            timer: 2000,
            showConfirmButton: false,
            background: "oklch(var(--card))",
            color: "oklch(var(--foreground))",
          });
          router.push(callback);
        }
      } else {
        setLoading(false);
        Swal.fire({ icon: "error", title: "Oops!", text: "User already exists or failed to save." });
      }
    } catch (error) {
      setLoading(false);
      console.error("Registration Error:", error);
      Swal.fire({ icon: "error", title: "Error", text: error.message || "Something went wrong!" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-10 relative overflow-hidden">

      {/* Full-Screen Loading Overlay */}
      <AnimatePresence>
        {
          loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-md flex flex-col items-center justify-center gap-4"
            >
              <Loader2 className="h-12 w-12 text-primary animate-spin" />
              <div className="text-center">
                <p className="text-lg font-black uppercase tracking-widest animate-pulse">{loadingText}</p>
              </div>
            </motion.div>
          )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10"
      >
        <div className="bg-card/50 backdrop-blur-xl border border-border rounded-[2.5rem] p-8 shadow-2xl">
          <div className="flex flex-col items-center mb-6">
            <Logo />
            <h2 className="text-2xl font-bold mt-4">Join EliteMart as Member</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest ml-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  {...register("name", { required: "Name is required" })}
                  className="w-full bg-secondary/30 border border-border rounded-2xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>

              {
                errors.name && <p className="text-[10px] text-destructive font-bold ml-1">{errors.name.message}</p>
              }
            </div>

            {/* Profile Photo Upload */}
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest ml-1">Profile Photo</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors z-10">
                  <Camera />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  {...register("photo", { required: "Photo is required" })}
                  className="file:hidden w-full bg-secondary/30 border border-border rounded-2xl py-3.5 pl-12 pr-4 text-sm text-muted-foreground cursor-pointer focus:ring-2 focus:ring-primary/20 outline-none"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  {selectedPhoto?.[0] ? <span className="text-xs text-primary font-bold">Selected!</span> : <ImageIcon className="h-4 w-4 opacity-30" />}
                </div>
              </div>

              {
                errors.photo && <p className="text-[10px] text-destructive font-bold ml-1">{errors.photo.message}</p>
              }
            </div>

            {/* Email Address */}
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest ml-1">Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  {...register("email", { required: "Email is required" })}
                  className="w-full bg-secondary/30 border border-border rounded-2xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="hello@gmail.com"
                />
              </div>
              {errors.email && <p className="text-[10px] text-destructive font-bold ml-1">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Min 6 characters" }
                  })}
                  className="w-full bg-secondary/30 border border-border rounded-2xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
              {
                errors.password && <p className="text-[10px] text-destructive font-bold ml-1">{errors.password.message}</p>
              }
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-primary hover:bg-primary/70 text-primary-foreground font-black py-4 rounded-2xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 uppercase text-xs tracking-widest mt-6 cursor-pointer"
            >
              Create Account <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border"></span></div>
            <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest">
              <span className="bg-card px-4 text-muted-foreground">Or</span>
            </div>
          </div>

          <SocialButtons></SocialButtons>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Already have an account? <Link href="/login" className="text-primary font-black hover:underline">Sign In</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterForm;