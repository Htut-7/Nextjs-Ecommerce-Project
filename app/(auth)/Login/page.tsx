"use client";

import Input from "@/Components/Input";
import Button from "@/Components/Button";
import AuthForm from "../components/AuthForm";
import Link from "next/link";

export default function Page() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-10">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">

          <h2 className="text-3xl font-bold text-slate-900">
            Welcome Back
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Sign in to your ShopSphere account to continue shopping, manage
            your orders, and explore the latest products.
          </p>
        </div>

        <div className="space-y-5">
          <Input
            type="email"
            label="Email"
            placeholder="Enter Email"
          />

          <Input
          type="password"
            label="Password"
            placeholder="Enter Password"
          />

          <div className="flex items-center justify-between text-sm">
           <Input label="Remember me" type='checkbox'/>

            <button className="font-medium text-black hover:underline">
              Forgot Password?
            </button>
          </div>

          <Button>Login</Button>

          <p className="text-center text-sm text-slate-500">
        Don&apos;t have an account?{" "}
        <Link
            href="/Register"
            className="font-semibold text-slate-900 transition-colors hover:underline"
        >
            Sign Up
        </Link>
</p>
        </div>

        <div className="my-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-slate-200"></div>

          <span className="text-sm text-slate-400">OR</span>

          <div className="h-px flex-1 bg-slate-200"></div>
        </div>

        <AuthForm />
      </div>
    </section>
  );
}