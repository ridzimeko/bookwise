import Header from '@/components/Header'
import React, { ReactNode } from 'react'

function layout({ children }: { children: ReactNode }) {
  return (
    <main className='root-container'>
       <div className="mx-auto max-w-7xl">
            <Header />
            <div className="mt-20 pb-10">
                {children}
            </div>
       </div>
    </main>
  )
}

export default layout
