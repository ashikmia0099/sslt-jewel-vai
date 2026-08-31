'use client'

import React from 'react'
import Donation_Question_Deshboard from './Donation_Question_DeshboardJsx/Donation_Question_Deshboard'
import ProtectedRoute from '@/app/Router/protectedRoute'

function Page() {
  return (
    <ProtectedRoute>
      <div>
        <Donation_Question_Deshboard></Donation_Question_Deshboard>
      </div>
    </ProtectedRoute>

  )
}


export default Page