'use client'

import React from 'react'
import Home_Communication_HelthCare from './Home_Communication_HelthCareJsx/Home_Communication_HelthCare'
import ProtectedRoute from '@/app/Router/protectedRoute'

function Page() {
  return (
    <ProtectedRoute>
      <div>
        <Home_Communication_HelthCare></Home_Communication_HelthCare>
      </div>
    </ProtectedRoute>

  )
}

export default Page