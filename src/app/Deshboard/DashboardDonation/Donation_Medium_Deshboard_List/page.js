'use client'

import React from 'react'
import Donation_Medium_Deshboard_List from './Donation_Medium_Deshboard_ListJsx/Donation_Medium_Deshboard_List'
import ProtectedRoute from '@/app/Router/protectedRoute'

function Page() {
  return (
    <ProtectedRoute>
      <div>
        <Donation_Medium_Deshboard_List></Donation_Medium_Deshboard_List>
      </div>
    </ProtectedRoute>


  )
}


export default Page