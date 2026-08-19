"use client";

import React, { useState } from 'react'
import Input from '@/Components/Input'
import Button from '@/Components/Button'
import Link from 'next/link'
import { signupWithCredentail } from '@/Components/lib/action/signupWithCredentials.action';
import { useRouter } from 'next/navigation';
import ROUTES from '@/ROUTES';


interface FormData{
        username:string,
        email: string,
        password: string,
    }

    interface FormErrors {
  username?: string[];
  email?: string[];
  password?: string[];
  [key: string]: string[] | undefined;
}

function RegisterForm() {

    const [formData,setFormData]=useState<FormData>({
        username:"",
        email:"",
        password:"",
    })

    const router=useRouter();

    const [errors,setErrors]=useState<FormErrors | null>(null);

    const register=async(e : React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        setErrors(null);
        const result=await signupWithCredentail(formData);
 
        if(result.success){
            console.log('success');
            router.push(ROUTES.HOME)
        }
            if("details" in result && result.details){
                setErrors(result.details);
            }

            if("message" in result && result.message==="Email already exists"){
               setErrors({
                email: [result.message]
               })
            }

             if("message" in result && result.message==="Username already exists"){
               setErrors({
                username: [result.message]
               })
            }
    }

  return (
      <form className="space-y-5" onSubmit={register}>
          <Input
            type="text"
            label="Username"
            placeholder="Enter Username" onChange={e=>(
                setFormData((prev=>({...prev,username:e.target.value})))
            )}
          />
          {errors?.username && (
                <p>{errors.username[0]}</p>
            )}

          <Input
            type="email"
            label="Email"
            placeholder="Enter Email" onChange={e=>(
                setFormData((prev=>({...prev,email:e.target.value})))
            )}
          />
          {errors?.email && (
                <p>{errors.email[0]}</p>
            )}

          <Input
            type="password"
            label="Password"
            placeholder="Enter Password" onChange={e=>(
                setFormData((prev=>({...prev,password:e.target.value})))
            )}
          />
          {errors?.password && (
                <p>{errors.password[0]}</p>
            )}

          <Button type='submit'>Register</Button>

          <p className="text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              href="/Login"
              className="font-semibold text-slate-900 transition-colors hover:underline"
            >
              Sign In
            </Link>
          </p>
        </form>
  )
}

export default RegisterForm
