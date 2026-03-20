"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import { SocialButtons } from "./SocialButtons";
import Logo from "../Logo";

const LoginForm = () => {
  const params = useSearchParams();
  const router = useRouter();
  const callback = params.get("callbackUrl") || "/";
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true); // Blocks the UI
    const { email, password } = data;

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: callback,
      });

      if (result?.error) {
        setLoading(false); // Unblock to show the error alert
        Swal.fire({
          icon: "error",
          title: "Access Denied",
          text: "Invalid email or password. Please try again.",
          confirmButtonColor: "var(--primary)",
          background: "oklch(var(--card))",
          color: "oklch(var(--foreground))",
        });
      } else {
        // Success Alert
        await Swal.fire({
          icon: "success",
          title: "Welcome Back!",
          text: "Login successful. Redirecting...",
          timer: 1500,
          showConfirmButton: false,
        });
        router.push(callback);
      }
    } catch (error) {
      setLoading(false);
      console.error("Login Error:", error);
      Swal.fire({
        icon: "warning",
        title: "Connection Error",
        text: "Could not reach the server. Please check your internet.",
      });
    } finally {
      // We don't setLoading(false) here if successful to keep the UI clean until redirect
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 overflow-hidden relative transition-colors duration-500">

      {/* --- Full-Screen UI Blocking Overlay --- */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-md flex flex-col items-center justify-center gap-4 cursor-wait"
          >
            <div className="relative">
              <Loader2 className="h-16 w-16 text-primary animate-spin" />
              <div className="absolute inset-0 h-16 w-16 border-4 border-primary/10 rounded-full"></div>
            </div>
            <div className="text-center">
              <p className="text-xl font-black text-foreground uppercase tracking-[0.3em] animate-pulse">
                Authenticating
              </p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-2">
                Securing your session, please wait
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md z-10"
      >
        {/* Main Card */}
        <div className="bg-card/50 dark:bg-neutral-900/50 backdrop-blur-xl border border-border rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden">

          <div className="flex justify-center">
            <Logo />
          </div>

          <div className="flex justify-center mt-4">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Login to Account</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-foreground uppercase tracking-widest ml-1">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground group-focus-within:text-primary transition-colors" />
                <input
                  {...register("email", { required: "Email is required" })}
                  type="email"
                  placeholder="name@example.com"
                  className={`w-full bg-secondary/30 dark:bg-white/5 border ${errors.email ? "border-destructive" : "border-border"
                    } rounded-2xl py-4 pl-12 pr-4 text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all`}
                />
              </div>
              {
                errors.email && (
                  <p className="text-[10px] text-destructive font-bold ml-1 uppercase">
                    {errors.email.message}
                  </p>
                )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] font-black text-foreground uppercase tracking-widest">
                  Password
                </label>
                <Link
                  href="#"
                  className="text-[10px] text-primary/90 hover:text-primary/70 font-black tracking-tighter transition-colors"
                >
                  FORGOT PASSWORD?
                </Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground group-focus-within:text-primary transition-colors" />
                <input
                  {...register("password", { required: "Password is required" })}
                  type="password"
                  placeholder="••••••••"
                  className={`w-full bg-secondary/30 dark:bg-white/5 border ${errors.password ? "border-destructive" : "border-border"
                    } rounded-2xl py-4 pl-12 pr-4 text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all`}
                />
              </div>
              {
                errors.password && (
                  <p className="text-[10px] text-destructive font-bold ml-1 uppercase">
                    {errors.password.message}
                  </p>
                )}
            </div>

            {/* Submit Button */}
            <button
              disabled={loading}
              type="submit"
              className="w-full group bg-primary hover:bg-primary/90 text-primary-foreground font-black py-4 rounded-2xl shadow-xl shadow-primary/20 transition-all active:scale-[0.97] flex items-center justify-center cursor-pointer gap-3 overflow-hidden relative"
            >
              <span className="relative z-10 uppercase text-xs tracking-[0.2em]">
                Sign In Now
              </span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform relative z-10" />
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border"></span>
            </div>
            <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest">
              <span className="bg-card dark:bg-neutral-900 px-4 text-foreground/60">
                OR
              </span>
            </div>
          </div>

          <div className="relative">
            <SocialButtons />
          </div>

          <p className="text-center text-muted-foreground text-sm mt-10">
            New here?{" "}
            <Link
              href={`/register?callbackUrl=${callback}`}
              className="text-primary font-black hover:text-primary/80 transition-colors underline-offset-4 hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 flex flex-col items-center gap-2">
          <p className="text-[10px] text-muted-foreground/40 uppercase tracking-[0.4em] text-center">
            EliteMart Cloud Security • 2026
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginForm;