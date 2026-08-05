"use client";

import React, { useState } from "react";
import Input from "@/Components/Input";
import Editor from "@/Components/Editor";
import Button from "@/Components/Button";

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tag,setTag]=useState<string[]>(['technical', 'usage']);
  const [newTag,setNewTag]=useState("");
  const [value,setValue]=useState('');

  const enterHandler=(e: React.KeyboardEvent<HTMLInputElement>)=>{

    if(e.key==='Enter'){
        if(!tag.includes(newTag)){
            setTag([...tag,newTag]);
            setNewTag("");
        }else{
            Error('Error');
        }
    }
  }

  return (
    <section className="bg-slate-50 py-16">
  <div className="mx-auto max-w-4xl px-6">
    <div className="space-y-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">

      <div className="text-center">
        <h2 className="text-4xl font-bold text-slate-900">
          Get in Touch
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-slate-500">
          Have a question, feedback, or project idea? Fill out the form
          below and provide as much detail as possible. We&apos;ll review your
          message and get back to you as soon as we can.
        </p>
      </div>

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

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700">
          Message
        </label>

        <div className="overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm">
          <Editor value={value} onChange={(v)=>setValue(v)} label="any question"/>
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-slate-700">
          Tags
        </label>

        <Input
          type="text"
          placeholder="Press Enter to add a tag..."
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyDown={enterHandler}
        />

        <div className="flex flex-wrap gap-2">
          {tag.map((t, i) => (
            <span
              key={i}
              className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700"
            >
              #{t}
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-end border-t border-slate-200 pt-6">
        <Button className="px-8">
          Send Message
        </Button>
      </div>

    </div>
  </div>
</section>
  );
}

export default ContactForm;