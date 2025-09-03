"use client";

import AuthForm from '@/components/AuthForm'
import { signInSchema } from '@/lib/validation'
import React from 'react'

function Page() {
  return (
   <AuthForm 
    type="SIGN_IN"
    schema={signInSchema}
    defaultValues={{
        email: '',
        password: ''
    }}
    onSubmit={(values) => {}}
   />
  )
}

export default Page
