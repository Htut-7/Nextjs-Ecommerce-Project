import CommentForm from "@/Components/CommentForm";
import CommentList from "@/Components/CommentList";
import { GetComments } from "@/Components/lib/action/GetComments.action";
import { GetMessage } from "@/Components/lib/action/GetMessage.action";
import { IncreaseView } from "@/Components/lib/action/IncreaseView.action";
import Preview from "@/Components/Preview";
import { notFound } from "next/navigation";
import { after } from "node:test";
import React from "react";
import { success } from "zod";

async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: message } = await GetMessage({
    messageId: id,
    name: "",
    email: "",
    content: "",
    tags: [],
  });

  if (!message) {
    notFound();
  }

  after(async()=>{
    await IncreaseView({
      messageId: id,
    })
  });

  const {
    success,
    message: commentMessage,
    data: commentData
  }=await GetComments({
    page: 1,
    pageSize: 10,
    filter: "latest",
    messageId: id
  })

  const {comments= [], totalComments=0} = commentData || {};

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="rounded-xl border border-gray-700 p-6">
        <h1 className="mb-6 text-3xl font-bold">
          Message Details
        </h1>

        <div className="space-y-5">
          <div>
            <p className="text-sm text-gray-400">Name</p>
            <p className="text-lg font-medium">
              {message.name}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Email</p>
            <p className="text-lg">
              {message.email}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Message</p>
            <div className="mt-2 whitespace-pre-wrap text-gray-300">
              <Preview content={message.content}/>
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm text-gray-400">Tags</p>

            <div className="flex flex-wrap gap-2">
              {message.tags?.map((tag: { _id: { toString: () => React.Key | null | undefined; }; name: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }) => (
                <span
                  key={tag._id.toString()}
                  className="rounded-full bg-gray-800 px-3 py-1 text-sm"
                >
                  {tag.name}
                </span>
              ))}
            </div>

            <div className="my-3">
              <CommentList errorMessage={commentMessage} success={success} comments={comments} totalComments={totalComments}/>
            </div>

            <div className="my-3">
              <CommentForm messageId={id} userName={message.name} userEmail={message.email} userContent={message.content}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;