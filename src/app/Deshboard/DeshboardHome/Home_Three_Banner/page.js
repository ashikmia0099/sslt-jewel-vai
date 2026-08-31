'use client'
import React from 'react'
import Home_Three_Banner from './Home_Three_BannerJsx/Home_Three_Banner'
import ProtectedRoute from '@/app/Router/protectedRoute'

function Page() {
  return (
    <ProtectedRoute>
      <div>
        <Home_Three_Banner></Home_Three_Banner>
      </div>
    </ProtectedRoute>

  )
}

export default Page