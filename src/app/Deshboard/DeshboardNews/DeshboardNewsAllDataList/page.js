'use client'
import React from 'react'
import DeshboardNewsAllDataList from './DeshboardNewsAllDataListJsx/DeshboardNewsAllDataList'
import ProtectedRoute from '@/app/Router/protectedRoute'

function Page() {
  return (
    <ProtectedRoute>
      <div>
        <DeshboardNewsAllDataList></DeshboardNewsAllDataList>
      </div>
    </ProtectedRoute>

  )
}

export default Page