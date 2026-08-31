'use client'
import React from 'react'
import About_Three_Banner_List from './About_Three_Banner_ListJsx/About_Three_Banner_List'
import ProtectedRoute from '@/app/Router/protectedRoute'

function Page() {
  return (
    <ProtectedRoute>
      <div>
        <About_Three_Banner_List></About_Three_Banner_List>
      </div>
    </ProtectedRoute>

  )
}

export default Page