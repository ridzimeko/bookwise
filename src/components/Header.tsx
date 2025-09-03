
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function Header() {
    const pathname = usePathname()

  return (
    <header className='flex justify-between gap-5 my-10'>
      <Link href="/" className='flex flex-row items-center gap-8'>
        <Image src="/logo.svg" width={40} height={40} alt='BookWise logo' />
      </Link>

      <ul className='flex flex-row items-center gap-8'>
        <li>
            <Link href="/" className='text-base cursor-pointer capitalize'>Home</Link>
        </li>
        <li>
            <Link href="/search">Search</Link>
        </li>
        <li>
            Account
        </li>
      </ul>
    </header>
  )
}

export default Header
