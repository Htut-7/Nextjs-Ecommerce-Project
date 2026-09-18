import { GetMessage } from "@/Components/lib/action/GetMessage.action";
import Preview from "@/Components/Preview";
import { notFound } from "next/navigation";
import React from "react";

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
            <p className="mt-2 whitespace-pre-wrap text-gray-300">
              <Preview content={message.content}/>
            </p>
          </div>

          <div>
            <p className="mb-2 text-sm text-gray-400">Tags</p>

            <div className="flex flex-wrap gap-2">
              {message.tags?.map((tag) => (
                <span
                  key={tag._id.toString()}
                  className="rounded-full bg-gray-800 px-3 py-1 text-sm"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;