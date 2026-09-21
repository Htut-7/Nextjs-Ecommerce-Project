"use client";

import React, { useState } from 'react';
import Editor from './Editor';
import Button from './Button';
import { CreateComment } from './lib/action/CreateComment.action';
import { Bounce, toast } from 'react-toastify';

function CommentForm({messageId} : {messageId: string})  {

    const [content,setContent]=useState("");

    const submit=async (e: React.FormEvent<HTMLFormElement>)=>{
        try{
            e.preventDefault();
            const result=await CreateComment({
                messageId,
                content,
            })
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
    <form onSubmit={submit}>
        <div className='mt-3'>
            <Editor value={content} onChange={(v)=>setContent(v)} label="any question"/>
        </div>
        <div className='flex justify-end'>
            <Button type='submit'>Submit Comment</Button>
        </div>
    </form>
  )
}

export default CommentForm
