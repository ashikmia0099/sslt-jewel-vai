'use client'
import React from 'react'
import DeshboardContactForm from './DeshboardContactJsx/DeshboardContactForm'
import ProtectedRoute from '@/app/Router/protectedRoute'

function Page() {
  return (
    <ProtectedRoute>
      <div>
        <DeshboardContactForm></DeshboardContactForm>
      </div>
    </ProtectedRoute>

  )
}

export default Page