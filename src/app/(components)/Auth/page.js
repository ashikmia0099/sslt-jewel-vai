'use client'
import React from 'react'
import SignIn from './SignIn/SignInJsx/SignIn'
import PublicRoute from '@/app/Router/publicRoute'

function Page() {

  
  return (
    <PublicRoute>
      <div>
        <SignIn></SignIn>
      </div>
    </PublicRoute>

  )
}

export default Page