'use client'
import React from 'react'
import SignIn from './SignInJsx/SignIn'
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