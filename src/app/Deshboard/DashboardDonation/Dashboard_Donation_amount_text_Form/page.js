'use client'
import React from 'react'
import Dashboard_Donation_amount_text_Form from './Dashboard_Donation_amount_text_Formjsx/Dashboard_Donation_amount_text_Form'
import ProtectedRoute from '@/app/Router/protectedRoute'

function Page() {
  return (
    <ProtectedRoute>
      <div>
        <Dashboard_Donation_amount_text_Form></Dashboard_Donation_amount_text_Form>
      </div>
    </ProtectedRoute>

  )
}


export default Page