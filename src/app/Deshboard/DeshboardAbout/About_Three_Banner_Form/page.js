'use client'
import React from 'react'
import About_Three_Banner_Form from './About_Three_Banner_FormJsx/About_Three_Banner_Form'
import ProtectedRoute from '@/app/Router/protectedRoute'

function Page() {
  return (
    <ProtectedRoute>
      <div>
        <About_Three_Banner_Form></About_Three_Banner_Form>
      </div>
    </ProtectedRoute>

  )
}

export default Page