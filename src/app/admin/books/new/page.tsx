import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function Page() {
  return (
    <>
        <Button asChild className='back-btn'>
            <Link href="/admin/books">Go Back</Link>
        </Button>

        <div className="w-full max-w-2xl">
            <p>Book Form</p>
        </div>
    </>
  )
}

export default Page
