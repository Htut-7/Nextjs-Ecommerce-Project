"use client";

import React, { useState } from 'react';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import { ToogleBookmarkAction } from './lib/action/ToogleBookmarkAction';
import { Bounce, toast } from 'react-toastify';

function ToogleBookmark({messageId, } : {
    messageId: string,
    // saved: boolean,
}) {

    const [isSave,setIsSave]=useState(false);

    const handleSave=async()=>{
        const {success, data, message}=await ToogleBookmarkAction({
            messageId,
        });

        if(success && data){
            setIsSave(data.saved);
        }else{
              toast.error(message, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
                transition: Bounce,
              });
            }
}

  return (
    <div>
      {!isSave ? <button
          className="flex items-center justify-center w-10 h-10 rounded-full bg-card/60 hover:bg-main/15 text-gray-300 hover:text-main transition-all duration-200 active:scale-90"
          onClick={handleSave}
          aria-label="Save bookmark"
          title="Save bookmark"
        >
          <FaRegBookmark size={20} />
        </button> : 

        <button
          className="flex items-center justify-center w-10 h-10 rounded-full bg-card/60 hover:bg-main/15 text-gray-300 hover:text-main transition-all duration-200 active:scale-90"
          onClick={handleSave}
          aria-label="Remove bookmark"
          title="Remove bookmark"
        >
          <FaBookmark size={20} />
        </button>}
    </div>
  )
}

export default ToogleBookmark
