import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import SearchInput from '@/Components/SearchInput';
import Filter from '@/Components/Filter';

async function page({searchParams} : {searchParams: Promise<{search?:string, filter?:string}>}) {

    const res = await fetch('http://localhost:3001/blogs', {
        cache: "no-store"
    });

    const data = await res.json();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {search,filter}=await searchParams;
    

    return (
        <section className="bg-slate-50 py-16">
            <div className="mx-auto max-w-7xl px-6">

                <div className="mb-12 text-center">
                    <h2 className="text-4xl font-bold text-slate-900">
                        Latest Fashion Blogs
                    </h2>

                    <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-slate-600">
                        Stay inspired with the latest fashion trends, styling tips,
                        seasonal collections, and expert advice to help you build a
                        wardrobe you&apos;ll love.
                    </p>
                </div>

                <div className="mb-10 flex justify-center">
                    <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                        <SearchInput placeholder='Search Blogs'/>

                         <div className="border-t border-slate-200 pt-6">
            <div className="mb-3 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">
                    Filter by Category
                </h3>

                {filter && (
                    <span className="rounded-full bg-black px-3 py-1 text-sm font-medium text-white">
                        {filter}
                    </span>
                )}
            </div>

            <Filter />
        </div>
                    </div>
                 </div>

                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                    {data.map((d: {
                        id: number,
                        title: string,
                        author: string,
                        category: string,
                        date: string,
                        image: string,
                        description: string,
                        content: string
                    }) => (

                        <div
                            key={d.id}
                            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                        >

                            <Image
                                src={d.image}
                                alt={d.title}
                                width={600}
                                height={400}
                                className="h-60 w-full object-cover"
                            />

                            <div className="space-y-4 p-6">

                                <div className="flex items-center justify-between">
                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                                        {d.category}
                                    </span>

                                    <span className="text-sm text-slate-500">
                                        {d.date}
                                    </span>
                                </div>

                                <h2 className="line-clamp-2 text-2xl font-bold text-slate-900">
                                    {d.title}
                                </h2>

                                <p className="text-sm text-slate-500">
                                    By <span className="font-medium">{d.author}</span>
                                </p>

                                <p className="line-clamp-3 leading-7 text-slate-600">
                                    {d.description}
                                </p>

                                <Link
                                    href={`/blogs/`+d.id}
                                    className="inline-flex items-center rounded-xl bg-black px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
                                >
                                    Read More
                                </Link>

                            </div>

                        </div>

                    ))}
                </div>

            </div>
        </section>
    )
}

export default page