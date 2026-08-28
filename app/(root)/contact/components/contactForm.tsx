"use client";

import React, { useState } from "react";
import Input from "@/Components/Input";
import Editor from "@/Components/Editor";
import Button from "@/Components/Button";
import { Bounce, toast } from "react-toastify";
import { MessageCreate } from "@/Components/lib/action/messageCreate.action";
import { useRouter } from "next/navigation";
import ROUTES from "@/ROUTES";
import { IContact } from "@/database/contact.model";

function ContactForm({message, isEdit=false}:{
  message?: IContact,
  isEdit: boolean,
}) {
  const [name, setName] = useState(message?.name ?? "");
  const [email, setEmail] = useState(message?.email ?? "");
  const [tags,setTags]=useState<string[]>(message?.tags?.map(tag=>tag.name) ?? []);
  const [newTag,setNewTag]=useState("");
  const [content,setContent]=useState(message?.content ?? "");
  const router=useRouter();

  const enterHandler=(e: React.KeyboardEvent<HTMLInputElement>)=>{

    if(e.key==='Enter'){
        if(!tags.includes(newTag)){
            setTags([...tags,newTag]);
            setNewTag("");
        }else{
            Error('Error');
        }
    }
  }

  const submit=async(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();

    try{
      if(isEdit && message){
        const result= await MessageCreate({
        name,
        email,
        content,
        tags
      })
      if(result.success && result.data){
        toast.success('Message Update Successfully', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });
               const path= router.push(ROUTES.MESSAGE_DETAILS(result.data?._id))
               console.log("REDIRECT:", path);
      }
      }
     const result= await MessageCreate({
        name,
        email,
        content,
        tags
      })
      console.log("RESULT:", result);
      if(result.success && result.data){
        toast.success('Message Create Successfully', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });
               const path= router.push(ROUTES.MESSAGE_DETAILS(result.data?._id))
               console.log("REDIRECT:", path);
      }
      
    }catch(e){
      if(e instanceof Error){
                toast.error('Sign In Failed', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });
            }
    }
  }

  return (
    <form className="bg-slate-50 py-16" onSubmit={submit}>
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
          <Editor value={content} onChange={(v)=>setContent(v)} label="any question"/>
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
          {tags.map((t, i) => (
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
        <Button type='submit' className="px-8">
          {isEdit ? "Update Message": "Send Message"}
        </Button>
      </div>

    </div>
  </div>
</form>
  );
}

export default ContactForm;