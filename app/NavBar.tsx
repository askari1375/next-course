'use client';
import React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

const NavBar = () => {
  const {status, data: session } = useSession();

  return (
    <div>
      <div className='flex bg-slate-200 p-5 space-x-3'>
        <Link href="/" className='mr-5'>Next.js</Link>
        <Link href="/users">Users</Link>        
        {status === 'loading' && <div>Loading ...</div>}
        {status === 'authenticated' &&
        <div>
          {session.user!.name}
          <Link href="/api/auth/signout" className='ml-3 mr-3'>Sign Out</Link>
          </div>}
        {status === 'unauthenticated' &&
        <div>          
          <Link href="/api/auth/signin">Login</Link>
          <Link href="/auth/register" className='ml-4'>Register</Link>
        </div>}
        {status === 'authenticated' && <Link href='/settings'>Settings</Link>}
      </div>
    </div>
  )
}

export default NavBar
