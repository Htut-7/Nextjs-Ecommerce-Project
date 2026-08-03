"use client";
import Button from '@/Components/Button';
import React from 'react'
import github from "@/public/github.jpg"
import google from "@/public/google.jpg"
import { signIn } from 'next-auth/react';
import { Bounce, toast } from 'react-toastify';

function AuthForm() {

    const oAuthSignIn=async(type: "google" | "github")=>{
        try{
            await signIn(type,{
                redirectTo: '/'
            })
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
    <div className="mt-6">
      <div className="flex flex-col gap-4">
        <Button onClick={()=>oAuthSignIn('github')}
          icon={github}
        >
          Login with Github
        </Button>

        <Button onClick={()=>oAuthSignIn("google")}
          icon={google}
        >
          Login with Google
        </Button>
      </div>
    </div>
  )
}

export default AuthForm