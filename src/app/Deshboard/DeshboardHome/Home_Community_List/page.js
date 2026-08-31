'use client'

import React from 'react'
import Home_Community_List from './Home_Community_ListJsx/Home_Community_List'
import ProtectedRoute from '@/app/Router/protectedRoute'

function Page() {
  return (
    <ProtectedRoute>
      <div>
        <Home_Community_List></Home_Community_List>
      </div>
    </ProtectedRoute>

  )
}


export default Page