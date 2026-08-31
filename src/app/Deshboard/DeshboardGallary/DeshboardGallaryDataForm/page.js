'use client'
import React from 'react'
import DeshboardGallaryDataForm from './DeshboardGallaryDataFormJsx/DeshboardGallaryDataForm'
import ProtectedRoute from '@/app/Router/protectedRoute'

function Page() {
  return (
    <ProtectedRoute>
      <div>
        <DeshboardGallaryDataForm></DeshboardGallaryDataForm>
      </div>
    </ProtectedRoute>

  )
}


export default Page