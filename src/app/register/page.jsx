import RegisterForm from "@/components/auth/RegisterForm";
import React, { Suspense } from "react"; 

const RegisterPage = () => {
  return (
    <div className="mt-28">
      {/* Suspense Boundary */}
      <Suspense fallback={<div className="text-center p-10 font-black uppercase tracking-widest animate-pulse">Loading Register...</div>}>
        <RegisterForm />
      </Suspense>
    </div>
  );
};

export default RegisterPage;