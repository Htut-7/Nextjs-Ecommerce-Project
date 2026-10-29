"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

type ProfileTab = "messages" | "comments";

function ProfileTabs({
  messagesCount = 0,
  commentsCount = 0,
  messages,
  comments,
}: {
  messagesCount?: number;
  commentsCount?: number;
  messages: React.ReactNode;
  comments: React.ReactNode;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab: ProfileTab =
    searchParams.get("tab") === "comments" ? "comments" : "messages";

  const setTab = (tab: ProfileTab) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="mt-8">
      <div className="flex gap-1 rounded-xl border border-slate-200 bg-slate-100 p-1">
        <button
          type="button"
          onClick={() => setTab("messages")}
          className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
            activeTab === "messages"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          Messages
          <span className="ml-2 rounded-full bg-slate-200 px-2 py-0.5 text-xs font-medium text-slate-600">
            {messagesCount}
          </span>
        </button>
        <button
          type="button"
          onClick={() => setTab("comments")}
          className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
            activeTab === "comments"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          Comments
          <span className="ml-2 rounded-full bg-slate-200 px-2 py-0.5 text-xs font-medium text-slate-600">
            {commentsCount}
          </span>
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {activeTab === "messages" ? messages : comments}
      </div>
    </div>
  );
}

export default ProfileTabs;
