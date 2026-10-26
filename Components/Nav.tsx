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

  console.log("Navbar session user ID:", user?.id);

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <h2 className="text-2xl font-bold text-slate-900">
          ShopSphere
        </h2>

        <div>
          <ul className="flex items-center gap-8 text-sm font-medium text-slate-600">
  <li><Link href={ROUTES.HOME}>Home</Link></li>
  <li><Link href={ROUTES.PRODUCT}>Products</Link></li>
  <li><Link href={ROUTES.BOOKMARK}>Bookmark</Link></li>
  <li><Link href={ROUTES.BLOGS}>Blogs</Link></li>
  <li><Link href={ROUTES.COMMUNITY}>Community</Link></li>
  <li><Link href={ROUTES.CONTACT}>Contact</Link></li>
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
              href={ROUTES.PROFILE(user.id as string)}
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