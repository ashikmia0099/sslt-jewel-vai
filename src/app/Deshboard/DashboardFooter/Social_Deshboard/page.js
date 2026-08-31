'use client'

import React from 'react'
import Social_Deshboard from './Social_DeshboardJsx/Social_Deshboard'
import ProtectedRoute from '@/app/Router/protectedRoute'


function Page() {
  return (
    <ProtectedRoute>
      <div>
        <Social_Deshboard></Social_Deshboard>
      </div>
    </ProtectedRoute>

  )
}


export default Page