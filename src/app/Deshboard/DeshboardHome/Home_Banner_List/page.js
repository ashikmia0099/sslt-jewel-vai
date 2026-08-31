'use client'
import React from 'react'
import Home_Banner_List from './Home_Banner_ListJsx/Home_Banner_List'
import ProtectedRoute from '@/app/Router/protectedRoute'

function Page() {
  return (
    <ProtectedRoute>
      <div>
        <Home_Banner_List></Home_Banner_List>
      </div>
    </ProtectedRoute>

  )
}
export default Page