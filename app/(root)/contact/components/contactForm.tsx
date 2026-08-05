"use client";

import React, { useState } from "react";
import Input from "@/Components/Input";
import Editor from "@/Components/Editor";
import Button from "@/Components/Button";

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-4xl px-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-bold text-slate-900">
              Get in Touch
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-500">
              Have a question, feedback, or project idea? Fill out the form
              below and provide as much detail as possible. We&apos;ll review your
              message and get back to you as soon as we can.
            </p>
          </div>

          <form className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Input
                type="text"
                label="Username"
                placeholder="Enter your username"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <Input
                type="email"
                label="Email Address"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Message
              </label>

              <div className="overflow-hidden rounded-2xl border border-slate-300 bg-white">
                <Editor />
              </div>
            </div>

            <div className="flex justify-end">
              <Button className="px-8">
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;