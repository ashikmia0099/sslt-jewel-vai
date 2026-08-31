'use client'
import React from 'react'
import DeshboardGallaryDataList from './DeshboardGallaryDataListJsx/DeshboardGallaryDataList'
import ProtectedRoute from '@/app/Router/protectedRoute'

function Page() {
  return (
    <ProtectedRoute>
      <div>
        <DeshboardGallaryDataList></DeshboardGallaryDataList>
      </div>
    </ProtectedRoute>

  )
}
export default Page