import React from 'react'
import ContactForm from '../../components/ContactForm'
import { GetMessage } from '@/Components/lib/action/GetMessage.action';
import { notFound } from 'next/navigation';


async function page({params}:{params: Promise<{id:string}>}) {

    const {id}=await params;

    const {data: message, success} =await GetMessage({
        messageId: id,
        name: '',
        email: '',
        content: '',
        tags: [],
    });

     if(!success) return notFound();
     console.log(message);

  return <ContactForm message={message} isEdit={true}/>

}

export default page
