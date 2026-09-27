import Link from "next/link";
import DataRenderer from "@/Components/DataRenderer";
import { GetBookmark } from "@/Components/lib/action/GetBookmark.action";

type BookmarkItem = {
  _id: string;
  createdAt?: string;
  message: {
    _id: string;
    name: string;
    content: string;
  } | null;
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    search?: string;
    filter?: string;
  }>;
}) {
  const {
    page,
    search = "",
    filter = "newest",
  } = await searchParams;

  const currentPage = Math.max(1, Number(page) || 1);

  const { success, data, message } = await GetBookmark({
    page: currentPage,
    pageSize: 10,
    search,
    filter,
  });

  const bookmarks = (data?.collection ?? []) as unknown as BookmarkItem[];

  function pageUrl(nextPage: number) {
    const params = new URLSearchParams({
      page: String(nextPage),
      search,
      filter,
    });

    return `/bookmark?${params.toString()}`;
  }

  return (
    <main className="min-h-screen bg-[#FAF8F4] px-4 py-10 text-[#252525] sm:px-6 lg:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <span className="mb-3 inline-flex rounded-full bg-[#FFF0E5] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#C75A24]">
              Your reading list
            </span>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Saved messages<span className="text-[#E87738]">.</span>
            </h1>

            <p className="mt-3 text-[#77736D]">
              Keep the conversations you want to come back to.
            </p>
          </div>

          <div className="w-fit rounded-2xl border border-[#E9E5DD] bg-white px-5 py-3 shadow-sm">
            <span className="block text-2xl font-bold text-[#E87738]">
              {bookmarks.length}
            </span>
            <span className="text-xs text-[#77736D]">
              On this page
            </span>
          </div>
        </div>

        <form
          action="/bookmark"
          className="mb-8 flex flex-col gap-3 rounded-2xl border border-[#E9E5DD] bg-white p-3 shadow-sm sm:flex-row"
        >
          <input
            type="search"
            name="search"
            defaultValue={search}
            placeholder="Search your saved messages"
            className="min-w-0 flex-1 rounded-xl bg-[#FAF8F4] px-4 py-3 text-sm outline-none placeholder:text-[#9A958E] focus:ring-2 focus:ring-[#E87738]/30"
          />

          <select
            name="filter"
            defaultValue={filter}
            className="rounded-xl bg-[#FAF8F4] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#E87738]/30"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>

          <button
            type="submit"
            className="rounded-xl bg-[#252525] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#E87738]"
          >
            Search
          </button>
        </form>

        <DataRenderer
          success={success}
          errorMessage={message}
          data={bookmarks}
          render={(items) => (
            <div className="grid gap-5 md:grid-cols-2">
              {items.map((bookmark) => {
                const savedMessage = bookmark.message;
                if (!savedMessage) return null;

                return (
                  <Link
                    key={bookmark._id}
                    href={`/contact/${savedMessage._id}`}
                    className="group flex min-h-56 flex-col rounded-2xl border border-[#E9E5DD] bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#E87738]/40 hover:shadow-lg"
                  >
                    <div className="mb-5 flex items-start justify-between gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF0E5] text-xl text-[#D9682D]">
                        ★
                      </div>

                      {bookmark.createdAt && (
                        <time className="text-xs text-[#9A958E]">
                          {new Date(bookmark.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                        </time>
                      )}
                    </div>

                    <h2 className="mb-2 text-lg font-semibold">
                      {savedMessage.name}
                    </h2>

                    <p className="line-clamp-3 whitespace-pre-wrap text-sm leading-6 text-[#77736D]">
                      {savedMessage.content}
                    </p>

                    <span className="mt-auto pt-6 text-sm font-semibold text-[#D9682D] group-hover:underline">
                      Read message <span aria-hidden="true">↗</span>
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        />

        {success && (currentPage > 1 || data?.isNext) && (
          <nav className="mt-9 flex items-center justify-center gap-4">
            {currentPage > 1 && (
              <Link
                href={pageUrl(currentPage - 1)}
                className="rounded-xl border border-[#E9E5DD] bg-white px-4 py-2 text-sm font-medium hover:border-[#E87738]"
              >
                ← Previous
              </Link>
            )}

            <span className="text-sm text-[#77736D]">
              Page {currentPage}
            </span>

            {data?.isNext && (
              <Link
                href={pageUrl(currentPage + 1)}
                className="rounded-xl border border-[#E9E5DD] bg-white px-4 py-2 text-sm font-medium hover:border-[#E87738]"
              >
                Next →
              </Link>
            )}
          </nav>
        )}
      </div>
    </main>
  );
}