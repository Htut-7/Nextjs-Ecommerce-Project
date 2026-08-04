import React from 'react'
import Image from 'next/image';
import { CiStar } from "react-icons/ci";
import Link from 'next/link';

async function page() {

    const res = await fetch('http://localhost:3001/products', {
        cache: "no-store"
    });

    const data = await res.json();

    return (
        <section className="bg-slate-50 py-16">
            <div className="mx-auto max-w-7xl px-6">

                <div className="mb-12 text-center">
                    <h2 className="text-4xl font-bold text-slate-900">
                        Our Products
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-slate-500">
                        Explore our carefully curated collection of fashion essentials,
                        from everyday basics to the latest trends, designed to match every
                        style and occasion.
                    </p>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {data.map((d: {
                        id: number,
                        name: string,
                        category: string,
                        brand: string,
                        price: number,
                        rating: number,
                        stock: number,
                        image: string,
                        description: string
                    }) => (

                        <div
                            key={d.id}
                            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                        >

                            <Image
                                src={d.image}
                                alt={d.name}
                                width={400}
                                height={500}
                                className="h-80 w-full object-cover"
                            />

                            <div className="space-y-3 p-5">

                                <div className="flex items-center justify-between">
                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                                        {d.category}
                                    </span>

                                    <div className="flex items-center gap-1 text-yellow-500">
                                        <CiStar className="text-lg" />
                                        <span className="text-sm font-medium text-slate-700">
                                            {d.rating}
                                        </span>
                                    </div>
                                </div>

                                <h3 className="text-lg font-semibold text-slate-900">
                                    {d.name}
                                </h3>

                                <h4 className="text-sm text-slate-500">
                                    Brand: {d.brand}
                                </h4>

                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold text-slate-900">
                                        ${d.price}
                                    </span>

                                    <span className="text-sm text-slate-500">
                                        Stock: {d.stock}
                                    </span>
                                </div>

                                <Link
                                    href={`/detail/${d.id}`}
                                    className="mt-2 flex w-full items-center justify-center rounded-xl bg-black px-4 py-3 font-semibold text-white transition hover:bg-slate-800"
                                >
                                    Check Detail
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