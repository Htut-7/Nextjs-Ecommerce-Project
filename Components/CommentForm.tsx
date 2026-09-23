"use client";

import React, { useState } from 'react';
import Editor from './Editor';
import Button from './Button';
import { CreateComment } from './lib/action/CreateComment.action';
import { Bounce, toast } from 'react-toastify';
import { GenerateComment } from './lib/action/GenerateComment.action';

function CommentForm({messageId, userName, userEmail, userContent} : {messageId: string, userName: string, userEmail: string, userContent: string})  {

    const [content,setContent]=useState("");
    const [loading,setLoading]=useState(false);

    const submit=async (e: React.FormEvent<HTMLFormElement>)=>{
        try{
            e.preventDefault();
            const result=await CreateComment({
                messageId,
                content,
            })
            console.log(result);
            if(result.success){
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
                setContent("");
      }else{
        toast.error(result.message || "Failed to create comment", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
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

    const generateAiComment=async()=>{
      try{
        setLoading(true);

        const result=await GenerateComment({
          userComment: userContent,
          commentContent: content,
          name: userName,
          email: userEmail,
        });

        if(result.success && result.data){
          setContent(result.data.comment);
        }else{
          toast.error(result.message || "Failed to generate Ai Comment");
        }
      }catch(e){
       if(e instanceof Error){
                            toast.error(e.message, {
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
      setLoading(false);
    }

  return (
    <form onSubmit={submit}>
        <div className='mt-3'>
            <Editor value={content} onChange={(v)=>setContent(v)} label="any question"/>
        </div>
        <div className='flex justify-end'>
            <div className='w-[50%] flex space-x-3'>
              <div className='w-[50%]'>
                <Button type='button' variant='outline' onClick={generateAiComment}>
                  {loading ? "Loading..." : "Generate Ai Comment"}
                </Button>
              </div>
              <div className='w-[50%]'>
                <Button type='submit'>Submit Comment</Button>
              </div>
            </div>
        </div>
    </form>
  )
}

export default CommentForm
