import { IComment } from "@/database/comment.model";
import React from "react";
import Preview from "./Preview";

function CommentCard({ comment }: { comment: IComment }) {
  const authorName =
    ((comment as any)?.author?.name as string) || "Anonymous";

  const authorEmail =
    ((comment as any)?.author?.email as string) || "";

  const initial = authorName.charAt(0).toUpperCase() || "?";

  const createdAt = comment.createdAt
    ? new Date(comment.createdAt).toLocaleString()
    : "";

  return (
    <article className="group my-5 w-full rounded-2xl border border-tertiary bg-secondary/60 p-5 shadow-sm transition-all duration-300 hover:border-gray-600 hover:shadow-md">
      <header className="mb-4 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-slate-700 to-slate-900 text-sm font-semibold text-white shadow">
            {initial}
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="truncate text-sm font-semibold text-white">
                {authorName}
              </p>

              <span className="rounded-full bg-tertiary px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-gray-400">
                Member
              </span>
            </div>

            {authorEmail && (
              <p className="mt-0.5 truncate text-xs text-gray-500">
                {authorEmail}
              </p>
            )}
          </div>
        </div>

        <time className="shrink-0 text-xs text-gray-500">
          {createdAt}
        </time>
      </header>

      <div className="rounded-xl border border-tertiary bg-primary/40 px-4 py-4">
        <div className="prose prose-invert max-w-none text-sm leading-relaxed text-gray-300">
          <Preview content={comment.content} />
        </div>
      </div>
    </article>
  );
}

export default CommentCard;