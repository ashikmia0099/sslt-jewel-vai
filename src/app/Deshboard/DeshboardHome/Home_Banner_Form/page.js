'use client'
import React from 'react'
import Home_Banner_Form from './Home_Banner_FormJsx/Home_Banner_Form'
import ProtectedRoute from '@/app/Router/protectedRoute'

function Page() {
  return (
    <ProtectedRoute>
      <div>
        <Home_Banner_Form></Home_Banner_Form>
      </div>
    </ProtectedRoute>

  )
}

export default Page