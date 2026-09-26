import Link from 'next/link'
import React from 'react'
import Button from './Button'
import ROUTES from "@/ROUTES"
import { auth } from '@/auth'
import { signOut } from '@/auth'
import { redirect } from 'next/navigation'

async function Nav() {

   const session=await auth();
   const user=session?.user;

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <h2 className="text-2xl font-bold text-slate-900">
          ShopSphere
        </h2>

        <div>
          <ul className="flex items-center gap-8 text-sm font-medium text-slate-600">
            <Link href={ROUTES.HOME} className="transition-colors hover:text-black">
              Home
            </Link>

            <Link href={ROUTES.PRODUCT} className="transition-colors hover:text-black">
              Products
            </Link>

            <Link href={ROUTES.TAGS} className="transition-colors hover:text-black">
              Tags
            </Link>

            <Link href={ROUTES.BLOGS} className="transition-colors hover:text-black">
              Blogs
            </Link>

            <Link href={ROUTES.COMMUNITY} className="transition-colors hover:text-black">
              Community
            </Link>

            <Link href={ROUTES.CONTACT} className="transition-colors hover:text-black">
              Contact
            </Link>
          </ul>
        </div>

        <div className="flex items-center gap-4">
          {!user && <>
            <Link
            href="/Register"
            className="text-sm font-medium text-slate-700 transition-colors hover:text-black"
          >
            Register
          </Link>

          <Link
            href="/Login"
            className="text-sm font-medium text-slate-700 transition-colors hover:text-black"
          >
            Login
          </Link>
          </>}

          <div className="flex items-center gap-3">
           {user && 
            <>
              <form action={async ()=>{
                "use server"

                await signOut({redirect:false});
                return redirect(ROUTES.LOGIN)

              }}>
                 <Button type='submit'>Logout</Button>
              </form>

            <Link
              href="/profile"
              className="text-sm font-medium text-slate-700 transition-colors hover:text-black"
            >
              Profile
            </Link>
            </>
           }
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav