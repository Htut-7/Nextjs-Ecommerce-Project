"use client";

import React from "react";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import AuthForm from "../components/AuthForm";
import Link from "next/link";

function Page() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-10">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900">
            Create Your Account
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Join ShopSphere today to discover amazing products, save your
            favourites, track your orders, and enjoy a seamless shopping
            experience.
          </p>
        </div>

        <div className="space-y-5">
          <Input
            type="text"
            label="Username"
            placeholder="Enter Username"
          />

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

          <Button>Register</Button>

          <p className="text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              href="/Login"
              className="font-semibold text-slate-900 transition-colors hover:underline"
            >
              Sign In
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

export default Page;