'use client'

import React from 'react'
import Home_Founding_member_Form from './Home_Founding_member_FormJsx/Home_Founding_member_Form'
import ProtectedRoute from '@/app/Router/protectedRoute'

function Page() {
  return (
    <ProtectedRoute>
      <div>
        <Home_Founding_member_Form></Home_Founding_member_Form>
      </div>
    </ProtectedRoute>

  )
}


export default Page