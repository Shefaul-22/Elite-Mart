"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Chrome } from "lucide-react";

const LoginPage = () => {
    return (
        <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-slate-50 px-4">
            <Card className="w-full max-w-md border-none shadow-lg">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-3xl font-bold tracking-tight text-blue-600">
                        Welcome Back
                    </CardTitle>
                    <CardDescription className="text-slate-500">
                        Login to your Elite Mart account to continue
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 py-8">
                    <Button
                        variant="outline"
                        className="flex h-12 w-full items-center justify-center gap-3 border-slate-200 text-lg font-medium hover:bg-slate-50 transition-all"
                        onClick={() => signIn("google", { callbackUrl: "/" })}
                    >
                        <Chrome className="h-5 w-5 text-red-500" />
                        Continue with Google
                    </Button>

                    <div className="relative mt-4">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-slate-200" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-slate-500">
                                Secure Authentication
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default LoginPage;