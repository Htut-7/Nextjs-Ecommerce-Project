import { auth } from "@/auth";
import DataRenderer from "@/Components/DataRenderer";
import Hero from "@/Components/Hero";
import { GetMessages } from "@/Components/lib/action/GetMessages.action";
import QuestionCard from "@/Components/QuestionCard";
import Link from "next/link";

export default async function Page({searchParams}:{
  searchParams: Promise<{
    [key:string]:string
  }>
}) {

  //  const {data}=await api.products.getByName('Wireless Bluetooth Headphones');
  //  console.log(data);
  const session=await auth();
  const{page,pageSize,filter,search}=await searchParams;

  const {success, data, message, detail}=await GetMessages({
    page: Number(page) || 1,
    pageSize: Number(page) || 10,
    filter: filter || "",
    search: search || ""
  })

  const {messages=[]}=data || {};

  return (
    <div>
      <Hero/>

      <div className="mx-auto mt-8 w-full max-w-4xl px-4">
  <h2 className="mb-6 text-2xl font-semibold text-gray-900">
    Customer&apos;s Messages
  </h2>

    <div className="space-y-4">
      <DataRenderer success={success} errorMessage={message} data={messages} 
      // eslint-disable-next-line react/jsx-key
      render={(messages)=>messages.map((message,i)=>(<Link href={`/contact/${message._id}`}><QuestionCard message={message} key={i}/></Link>))}/>
    </div>
</div>

    </div>
    

  );
}