import { auth } from "@/auth";
import Hero from "@/Components/Hero";
import { GetMessages } from "@/Components/lib/action/GetMessages.action";


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

  const {messages}=data || {};

  return (
    <div>
      <Hero/>

      <div className="mx-auto mt-8 w-full max-w-4xl px-4">
  <h2 className="mb-6 text-2xl font-semibold text-gray-900">
    Customer&apos;s Messages
  </h2>

  <div className="space-y-4">
    {messages?.map((message) => (
      <div
        key={message._id.toString()}
        className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
      >
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {message.name}
            </h3>

            <p className="text-sm text-gray-500">
              {message.email}
            </p>
          </div>

          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
            Message
          </span>

          <div className="mt-4 flex flex-wrap gap-2">
            {message.tags.map((tag) => (
              <span
                key={tag._id.toString()}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
              >
                {tag.name}
              </span>
            ))}
          </div>

        </div>

        <div className="rounded-lg bg-gray-50 p-4">
          <p className="text-sm leading-6 text-gray-700">
            {message.content}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>

    </div>
    

  );
}