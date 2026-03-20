"use client";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc"; // Colorful Google Icon
import { motion } from "framer-motion";
import Swal from "sweetalert2";

export const SocialButtons = () => {


  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/";

  // const handleSignIn = async () => {
  //   await signIn("google", {
  //     callbackUrl: callbackUrl,
  //   });
  // };

  const handleSignIn = async () => {
    // 1. Initial "Processing" Feedback
    Swal.fire({
      title: "Connecting...",
      text: "Preparing secure connection to Google",
      showConfirmButton: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
      background: "oklch(var(--primary))",
      color: "oklch(var(--primary))",
    });

    try {
      const result = await signIn("google", {
        callbackUrl: callbackUrl,
        redirect: false, // Manual redirect control
      });

      if (result?.error) {
        Swal.fire({
          icon: "error",
          title: "Connection Failed",
          text: "Could not initialize Google Sign-In.",
          confirmButtonColor: "var(--primary)",
        });
      } else if (result?.url) {
        // 2. SUCCESS ALERT before redirect
        await Swal.fire({
          icon: "success",
          title: "Ready to Sign In",
          text: "Redirecting you to Google safely.",
          timer: 1500,
          showConfirmButton: false,
          background: "oklch(var(--card))",
          color: "oklch(var(--foreground))",
        });

        // 3. Final Redirect
        window.location.href = result.url;
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 gap-3">
      <motion.button
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleSignIn}
        className={
          "group relative flex items-center justify-center gap-3 w-full py-1 cursor-pointer rounded-2xl " +
          "bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 " +
          "text-neutral-700 dark:text-white font-bold text-sm transition-all duration-300 " +
          "hover:bg-neutral-50 dark:hover:bg-white/10 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] " +
          "dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)]"
        }
      >
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

        <div className="bg-white p-2 rounded-xl shadow-sm border border-neutral-100 group-hover:scale-110 transition-transform duration-300">
          <FcGoogle className="h-5 w-5" />
        </div>

        <span className="relative z-10 tracking-tight">Continue with Google</span>

        {/* Subtle arrow that appears on hover */}
        <div className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 absolute right-6">
          <div className="w-1.5 h-1.5 border-t-2 border-r-2 border-primary rotate-45" />
        </div>
      </motion.button>
    </div>
  );
};