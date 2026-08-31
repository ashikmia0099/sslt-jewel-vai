'use client'

import React from 'react'
import Home_Communication_HelthCare_List from './Home_Communication_HelthCare_ListJsx/Home_Communication_HelthCare_List'
import ProtectedRoute from '@/app/Router/protectedRoute'

function Page() {
  return (
    <ProtectedRoute>
      <div>
        <Home_Communication_HelthCare_List></Home_Communication_HelthCare_List>
      </div>
    </ProtectedRoute>

  )
}


export default Page