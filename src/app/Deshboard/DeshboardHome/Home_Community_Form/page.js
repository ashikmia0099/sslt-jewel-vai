'use client'

import React from 'react'
import Home_Community_Form from './Home_Community_FormJsx/Home_Community_Form'
import ProtectedRoute from '@/app/Router/protectedRoute'

function Page() {
  return (
    <ProtectedRoute>
      <div>
        <Home_Community_Form></Home_Community_Form>
      </div>
    </ProtectedRoute>

  )
}

export default Page