'use client'

import React from 'react'
import Home_Founding_Member_Data_List from './Home_Founding_Member_DataJsx/Home_Founding_Member_Data'
import ProtectedRoute from '@/app/Router/protectedRoute'

function Page() {
  return (
    <ProtectedRoute>
      <div>
        <Home_Founding_Member_Data_List></Home_Founding_Member_Data_List>
      </div>
    </ProtectedRoute>

  )
}

export default Page