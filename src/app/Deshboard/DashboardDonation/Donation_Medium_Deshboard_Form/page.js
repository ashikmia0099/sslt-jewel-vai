'use client'

import React from 'react'
import Donation_Medium_Deshboard_Form from './Donation_Medium_Deshboard_FormJsx/Donation_Medium_Deshboard_Form'
import ProtectedRoute from '@/app/Router/protectedRoute'

function Page() {
  return (
    <ProtectedRoute>
      <div>
        <Donation_Medium_Deshboard_Form></Donation_Medium_Deshboard_Form>
      </div>
    </ProtectedRoute>

  )
}

export default Page