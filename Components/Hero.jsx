import React from 'react'
import { IoSparklesOutline } from "react-icons/io5";
import Button from './Button';

function Hero() {
  return (
    <section className="bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="mx-auto flex min-h-[85vh] max-w-7xl flex-col items-center justify-center px-6 text-center">

        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-700 shadow-sm">
          <IoSparklesOutline className="text-lg" />
          New Season Collection 2026
        </span>

        <h2 className="mt-8 max-w-4xl text-5xl font-extrabold leading-tight text-slate-900 lg:text-7xl">
          Discover Your Perfect Style
        </h2>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          Shop the latest fashion trends with premium clothing, footwear, and
          accessories. From everyday essentials to statement pieces, find
          everything you need to elevate your wardrobe.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button className="w-48">
            Shop Now
          </Button>

          <Button className="w-48" variant='secondary'>
            Explore Collection
          </Button>
        </div>

      </div>
    </section>
  )
}

export default Hero