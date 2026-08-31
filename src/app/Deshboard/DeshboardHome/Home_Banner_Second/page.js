'use client'
import React from 'react'
import Home_Banner_Second from './Home_Banner_SecondJsx/Home_Banner_Second'
import ProtectedRoute from '@/app/Router/protectedRoute'

function Page() {
  return (
    <ProtectedRoute>
      <div>
        <Home_Banner_Second></Home_Banner_Second>
      </div>
    </ProtectedRoute>

  )
}

export default Page