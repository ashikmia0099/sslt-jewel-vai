'use client'
import React from 'react'
import SignUp from './SignupJsx/SignUp'
import PublicRoute from '@/app/Router/publicRoute'


function Page() {
  return (
    <PublicRoute>
      <div>
        <SignUp></SignUp>
      </div>
    </PublicRoute>

  )
}

export default Page