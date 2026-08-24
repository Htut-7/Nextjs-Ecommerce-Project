"use client";

import { signinWithCredentials } from "@/Components/lib/action/signinWithCredentials.action";
import AuthForm from "../components/AuthForm";
import RegisterForm from "../components/AuthenticationForm";

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

        <RegisterForm type="login" submitAction={signinWithCredentials}/>

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