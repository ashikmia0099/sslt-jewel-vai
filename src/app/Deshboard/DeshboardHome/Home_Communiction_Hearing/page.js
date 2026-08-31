'use client'
import React from 'react'
import Home_Communiction_Hearing from './Home_Communiction_HearingJsx/Home_Communiction_Hearing'
import ProtectedRoute from '@/app/Router/protectedRoute'

function Page() {
  return (
    <ProtectedRoute>
      <div>
        <Home_Communiction_Hearing></Home_Communiction_Hearing>
      </div>
    </ProtectedRoute>

  )
}

export default Page