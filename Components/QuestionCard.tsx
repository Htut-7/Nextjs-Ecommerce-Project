import { IContactDoc } from "@/database/contact.model";
import React from "react";

function QuestionCard({ message }: { message: IContactDoc }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
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
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {message.tags.map((tag) => (
          <span
            key={tag._id.toString()}
            className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
          >
            {tag.name}
          </span>
        ))}
      </div>

      <div className="rounded-lg bg-gray-50 p-4">
        <p className="text-sm leading-6 text-gray-700">
          {message.content}
        </p>
      </div>
    </div>
  );
}

export default QuestionCard;