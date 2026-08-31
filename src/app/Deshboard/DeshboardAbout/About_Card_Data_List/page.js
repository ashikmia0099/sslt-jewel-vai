'use client'

import React from 'react'
import About_Card_Data_List from './About_Card_Data_ListJsx/About_Card_Data_List'
import ProtectedRoute from '@/app/Router/protectedRoute'

function Page() {
  return (
    <ProtectedRoute>
      <div>
        <About_Card_Data_List></About_Card_Data_List>
      </div>
    </ProtectedRoute>

  )
}

export default Page