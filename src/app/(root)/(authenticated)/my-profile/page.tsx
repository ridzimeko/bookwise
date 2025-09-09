import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'
import React from 'react'

function Page() {
  return (
    <form action={async () => {
        'use server'

        await signOut()
    }}
    className='mb-10'
    >
        <Button>Logout</Button>
    </form>
  )
}

export default Page
