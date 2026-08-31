'use client'
import React from 'react'
import DeshboardNewsAllDataForm from './DeshboardNewsAllDataFormJsx/DeshboardNewsAllDataForm'
import ProtectedRoute from '@/app/Router/protectedRoute'

function Page() {
  return (
    <ProtectedRoute>
      <div>
        <DeshboardNewsAllDataForm></DeshboardNewsAllDataForm>
      </div>
    </ProtectedRoute>

  )
}

export default Page