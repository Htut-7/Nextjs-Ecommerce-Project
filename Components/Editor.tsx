'use client'

import { useEditor, EditorContent, useEditorState  } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Heading from '@tiptap/extension-heading'
import { BulletList, ListItem } from '@tiptap/extension-list'
import { OrderedList } from '@tiptap/extension-list'
import Link from '@tiptap/extension-link'
import { FaBold, FaItalic, FaLink, FaCode } from "react-icons/fa";
import { MdFormatListBulleted } from "react-icons/md";
import { AiOutlineOrderedList } from "react-icons/ai";
import { useCallback } from 'react'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import { all, createLowlight } from 'lowlight'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import "highlight.js/styles/github-dark.css";


const lowlight = createLowlight(all)

// This is only an example, all supported languages are already loaded above
// but you can also register only specific languages to reduce bundle-size
lowlight.register('html', html)
lowlight.register('css', css)
lowlight.register('js', js)
lowlight.register('ts', ts)


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Editor = ({value,onChange,label} : {value?: string, onChange: (value:string)=>void; label?:string}) => {
  const editor = useEditor({
    editorProps:{
        attributes:{
            class: "prose  max-w-none my-2 p-2 min-h-[300px] rounded-lg "
        },
    },
    extensions: [StarterKit,Bold,Italic,BulletList, ListItem,OrderedList,
        Heading.configure({
        levels: [1, 2, 3],
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        markdownLinks: true,
        defaultProtocol: 'https',
        protocols: ['http', 'https'],
        isAllowedUri: (url, ctx) => {
          try {
            // construct URL
            const parsedUrl = url.includes(':')
              ? new URL(url)
              : new URL(`${ctx.defaultProtocol}://${url}`)

            // use default validation
            if (!ctx.defaultValidate(parsedUrl.href)) {
              return false
            }

            // disallowed protocols
            const disallowedProtocols = ['ftp', 'file', 'mailto']
            const protocol = parsedUrl.protocol.replace(':', '')

            if (disallowedProtocols.includes(protocol)) {
              return false
            }

            // only allow protocols specified in ctx.protocols
            const allowedProtocols = ctx.protocols.map(p => (typeof p === 'string' ? p : p.scheme))

            if (!allowedProtocols.includes(protocol)) {
              return false
            }

            // disallowed domains
            const disallowedDomains = ['example-phishing.com', 'malicious-site.net']
            const domain = parsedUrl.hostname

            if (disallowedDomains.includes(domain)) {
              return false
            }

            // all checks have passed
            return true
          } catch {
            return false
          }
        },
        shouldAutoLink: url => {
          try {
            // construct URL
            const parsedUrl = url.includes(':') ? new URL(url) : new URL(`https://${url}`)

            // only auto-link if the domain is not in the disallowed list
            const disallowedDomains = ['example-no-autolink.com', 'another-no-autolink.com']
            const domain = parsedUrl.hostname

            return !disallowedDomains.includes(domain)
          } catch {
            return false
          }
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content: value || "",
    onUpdate({editor}){
      onChange(editor.getHTML());
    },
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
  })

  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run()

      return
    }

    // update link
    try {
      editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    } catch (e) {
      if(e instanceof Error){
        alert ('Error');
      }
    }
  }, [editor])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const editorState = useEditorState({
    editor,
    selector: ctx => ({
      isLink: ctx.editor?.isActive('link'),
    }),
  })

  if (!editor) {
    return null
  }

  return (
        <>
        <div className='overflow-hidden rounded-2xl bg-white'>
            <div className='flex flex-wrap items-center gap-2 border-b border-slate-200 bg-slate-50 p-3 px-3 py-2'>
                 <button
                    onClick={() => editor?.chain().focus().toggleBold().run()}
                    className={editor?.isActive('bold') ? 'is-active' : ''}
                >
                    <FaBold />
                </button>

                <button
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            className={editor?.isActive('italic') ? 'is-active' : ''}
          >
            <FaItalic />
          </button>

            <button
            onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
            className={editor?.isActive("heading", {level:1}) ? 'is-active' : ''}
          >
            H1
          </button>
          <button
            onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor?.isActive("heading" , {level:2}) ? 'is-active' : ''}
          >
            H2
          </button>
          <button
            onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
            className={editor?.isActive('heading', {level:3}) ? 'is-active' : ''}
          >
            H3
          </button>

          <button
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            className={editor?.isActive('bulletList') ? 'is-active' : ''}
          >
            <MdFormatListBulleted />
          </button>

        <button
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            className={editor?.isActive('orderList') ? 'is-active' : ''}
          >
            <AiOutlineOrderedList />
          </button>

          <button onClick={setLink} className={editor?.isActive('link') ? 'is-active' : ''}>
            <FaLink />
          </button>

          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor?.isActive('code') ? 'is-active' : ''}
          >
            <FaCode />
          </button>

         </div>

         <EditorContent editor={editor} />
        </div>
            
 
        </>


    
  )
}

export default Editor