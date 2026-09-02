import { auth } from "@/auth";
import DataRenderer from "@/Components/DataRenderer";
import Hero from "@/Components/Hero";

import { GetTagMessages } from "@/Components/lib/action/GetTagMessages.action";
import QuestionCard from "@/Components/QuestionCard";


export default async function Page({searchParams,params}:{
    params: Promise<{id:string}>
  searchParams: Promise<{
    [key:string]:string
  }>
}) {

  //  const {data}=await api.products.getByName('Wireless Bluetooth Headphones');
  //  console.log(data);
  const {id}=await params;
  const{page,pageSize,search}=await searchParams;

  const {success, data, message, detail}=await GetTagMessages({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    search: search || "",
    tagId: id,
  })

  const {messages=[], tag}=data || {};

  return (
    <div>
      <Hero/>

      <div className="mx-auto mt-8 w-full max-w-4xl px-4">
  <h2 className="mb-6 text-2xl font-semibold text-gray-900">
    {tag?.name}
  </h2>

    <div className="space-y-4">
      <DataRenderer success={success} errorMessage={message} data={messages} 
      render={(messages)=>messages.map((message,i)=><QuestionCard message={message} key={i}/>)}/>
    </div>
</div>

    </div>
    

  );
}