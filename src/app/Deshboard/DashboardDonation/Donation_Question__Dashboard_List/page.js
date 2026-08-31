'use client'

import React from 'react'
import Donation_Question__Dashboard_List from './Donation_Question__Dashboard_ListJsx/Donation_Question__Dashboard_List'
import ProtectedRoute from '@/app/Router/protectedRoute'

function Page() {
  return (
    <ProtectedRoute>
      <div>
        <Donation_Question__Dashboard_List></Donation_Question__Dashboard_List>
      </div>
    </ProtectedRoute>

  )
}


export default Page