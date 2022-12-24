import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  const {data: session} = useSession()
  return (
    <nav className='sticky top-0 left-0 w-full p-3 text-white bg-zinc-800 flex items-center justify-between'>
      <h1 className="text-lg">
        <Link href="/">
          Adudu
        </Link>
      </h1>
      <ul className="flex items-center gap-3 text-xs">
        <li>
            <Link href="/users">
                Users
            </Link>
        </li>
        <li>
            <Link href="/">
                Inbox
            </Link>
        </li>
        <li>
          {
            session?.user && <Link href="/api/auth/signout">Sign Out</Link>
          }
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
