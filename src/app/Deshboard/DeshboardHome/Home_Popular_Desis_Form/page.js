'use client'
import React from 'react'
import Home_Popular_Desis_Form from './Home_Popular_Desis_FormJsx/Home_Popular_Desis_Form'
import ProtectedRoute from '@/app/Router/protectedRoute'

function Page() {
  return (
    <ProtectedRoute>
      <div>
        <Home_Popular_Desis_Form></Home_Popular_Desis_Form>
      </div>
    </ProtectedRoute>

  )
}

export default Page