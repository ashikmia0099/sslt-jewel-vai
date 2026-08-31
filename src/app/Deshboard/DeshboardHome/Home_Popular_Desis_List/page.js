'use client'

import React from 'react'
import Home_Popular_Desis_LIst from './Home_Popular_Desis_LIstJsx/Home_Popular_Desis_LIst'
import ProtectedRoute from '@/app/Router/protectedRoute'

function Page() {
  return (
    <ProtectedRoute>
      <div>
        <Home_Popular_Desis_LIst></Home_Popular_Desis_LIst>
      </div>
    </ProtectedRoute>

  )
}

export default Page