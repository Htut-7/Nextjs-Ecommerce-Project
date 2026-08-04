import { notFound } from 'next/navigation';
import React from 'react'
import Image from 'next/image';
import { CiStar } from "react-icons/ci";
import Link from 'next/link';
import { IoIosArrowRoundBack } from "react-icons/io";

const postData = async (id: string) => {
  const res = await fetch('http://localhost:3001/products/' + id, {
    cache: "no-store"
  });

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

export const generateMetadata=async({params} : {params: {id:string}})=>{
    const data=await postData(params.id);
    return{
        title: "ShopSphere | " + data.name
    }
};


async function page({ params }: { params: { id: string } }) {
  const data = await postData(params.id);

  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-6">

        <Link
          href="/products"
          className="mb-8 inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
        >
          <IoIosArrowRoundBack className="text-2xl" />
          Back to Products
        </Link>

        <div className="grid gap-12 rounded-3xl bg-white p-8 shadow-lg lg:grid-cols-2">

          <div className="overflow-hidden rounded-2xl">
            <Image
              src={data.image}
              alt={data.name}
              width={600}
              height={700}
              className="h-full w-full object-cover transition duration-300 hover:scale-105"
            />
          </div>

          <div className="flex flex-col justify-center">

            <span className="mb-4 w-fit rounded-full bg-slate-100 px-4 py-1 text-sm font-medium text-slate-600">
              {data.category}
            </span>

            <h1 className="text-4xl font-bold text-slate-900">
              {data.name}
            </h1>

            <p className="mt-3 text-lg text-slate-500">
              Brand: <span className="font-medium text-slate-700">{data.brand}</span>
            </p>

            <div className="mt-5 flex items-center gap-6">

              <span className="text-4xl font-bold text-slate-900">
                ${data.price}
              </span>

              <div className="flex items-center gap-1 rounded-full bg-yellow-50 px-3 py-1">
                <CiStar className="text-xl text-yellow-500" />
                <span className="font-medium text-slate-700">
                  {data.rating}
                </span>
              </div>

            </div>

            <p className="mt-5 text-base text-slate-600">
              <span className="font-semibold text-slate-900">
                Stock:
              </span>{" "}
              {data.stock} Available
            </p>

            <p className="mt-6 leading-7 text-slate-600">
              {data.description}
            </p>

            <div className="mt-8 flex gap-4">

              <button className="rounded-xl bg-black px-8 py-3 font-semibold text-white transition hover:bg-slate-800">
                Add to Cart
              </button>

              <button className="rounded-xl border border-slate-300 bg-white px-8 py-3 font-semibold text-slate-700 transition hover:bg-slate-100">
                Add to Wishlist
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}

export default page