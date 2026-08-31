'use client'
import React from 'react'
import Home_Communiction_Hearing_List from './Home_Communiction_Hearing_ListJsx/Home_Communiction_Hearing_List'
import ProtectedRoute from '@/app/Router/protectedRoute'

function Page() {
  return (
    <ProtectedRoute>
      <div>
        <Home_Communiction_Hearing_List></Home_Communiction_Hearing_List>
      </div>
    </ProtectedRoute>

  )
}


export default Page