"use client";
import Button from '@/Components/Button';
import React from 'react'
import github from "@/public/github.jpg"
import google from "@/public/google.jpg"

function AuthForm() {
  return (
    <div className="mt-6">
      <div className="flex flex-col gap-4">
        <Button
          icon={github}
        >
          Login with Github
        </Button>

        <Button
          icon={google}
        >
          Login with Google
        </Button>
      </div>
    </div>
  )
}

export default AuthForm