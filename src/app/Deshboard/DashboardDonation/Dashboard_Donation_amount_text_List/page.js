'use client'

import React from 'react'
import Dashboard_Donation_amount_text_List from './Dashboard_Donation_amount_text_ListJsx/Dashboard_Donation_amount_text_List'
import ProtectedRoute from '@/app/Router/protectedRoute'

function Page() {
  return (
    <ProtectedRoute>
      <div>
        <Dashboard_Donation_amount_text_List></Dashboard_Donation_amount_text_List>
      </div>
    </ProtectedRoute>

  )
}

export default Page