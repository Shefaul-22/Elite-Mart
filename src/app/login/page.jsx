import LoginForm from "@/components/auth/LoginForm";
import React, { Suspense } from "react"; 

const LoginPage = () => {
    return (
        <div className="mt-28">
            {/* Suspense Boundary  */}
            <Suspense fallback={<div className="text-center p-10 font-black uppercase tracking-widest animate-pulse">Loading Login...</div>}>
                <LoginForm />
            </Suspense>
        </div>
    );
};

export default LoginPage;