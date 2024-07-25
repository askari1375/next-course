import React from 'react'
import Link from 'next/link'

const NavBar = () => {
  return (
    <div>
      <div className='flex bg-slate-200 p-5'>
        <Link href="/" className='mr-5'>Next.js</Link>
        <Link href="/users">Users</Link>
      </div>
    </div>
  )
}

export default NavBar
