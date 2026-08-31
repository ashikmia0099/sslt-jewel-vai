'use client'
import React from 'react'
import Home_Three_Banner_List from './Home_Three_BannerJsx/Home_Three_Banner_List'
import ProtectedRoute from '@/app/Router/protectedRoute'

function Page() {
  return (
    <ProtectedRoute>
      <div>
        <Home_Three_Banner_List></Home_Three_Banner_List>
      </div>
    </ProtectedRoute>

  )
}

export default Page