import { notFound } from 'next/navigation';
import React from 'react'
import Image from 'next/image';
import Button from '@/Components/Button';
import Link from 'next/link';
import { IoIosArrowRoundBack } from "react-icons/io";
import { CiBookmark } from "react-icons/ci";

const blogData = async (id: string) => {
    const res = await fetch('http://localhost:3001/blogs/' + id, {
        cache: "no-store"
    });

    if (!res.ok) {
        notFound();
    }

    return res.json();
}

export const generateMetadata = async ({ params }: { params: { id: string } }) => {
    const data = await blogData(params.id);

    return {
        title: "Blog Post | " + data.title
    }
}

async function page({ params }: { params: { id: string } }) {
    const data = await blogData(params.id)

    return (
        <section className="bg-slate-50 py-16">
            <div className="mx-auto max-w-5xl px-6">
                <Link
          href="/blogs"
          className="mb-8 inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
        >
          <IoIosArrowRoundBack className="text-2xl" />
          Back to Blogs
        </Link>

                <div className="overflow-hidden rounded-3xl bg-white shadow-lg">

                    <Image
                        src={data.image}
                        alt="image"
                        width={1200}
                        height={600}
                        className="h-[420px] w-full object-cover"
                    />

                    <div className="space-y-6 p-8">

                        <div className="flex flex-wrap items-center gap-4">
                            <span className="rounded-full bg-slate-100 px-4 py-1 text-sm font-medium text-slate-700">
                                {data.category}
                            </span>

                            <span className="text-sm text-slate-500">
                                {data.date}
                            </span>
                        </div>

                        <h2 className="text-4xl font-bold leading-tight text-slate-900">
                            {data.title}
                        </h2>

                        <p className="text-slate-500">
                            Author:
                            <span className="ml-1 font-medium text-slate-700">
                                {data.author}
                            </span>
                        </p>

                        <strong className="block text-lg leading-8 text-slate-700">
                            {data.description}
                        </strong>

                        <div className="border-t border-slate-200 pt-6">
                            <p className="leading-8 text-slate-600">
                                {data.content}
                            </p>
                        </div>

                        <div className="pt-4">
                            <Button className="w-48">
                                <CiBookmark className='text-3xl font-bold'/>
                            </Button>
                        </div>

                    </div>

                </div>

            </div>
        </section>
    )
}

export default page