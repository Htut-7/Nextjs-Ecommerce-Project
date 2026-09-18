import React from 'react'
import {Code} from "bright";

function Preview({content}: {content: string}) {

    Code.theme={
        light: "github-light",
        dark: "github-dark",
        lightSelector: "html.light",
    }

  return (
    <div 
    className="
        prose
        prose-inverted
        max-w-none
        prose-headings:text-white
        prose-p:text-gray-300
        prose-a:text-blue-400
        prose-strong:text-white
        prose-code:text-pink-400
        prose-pre:bg-gray-900
        prose-pre:border
        prose-pre:border-gray-700
        prose-pre:rounded-lg
        prose-pre:p-4
      " 
    dangerouslySetInnerHTML={{__html: content}}/>
  )
}

export default Preview
