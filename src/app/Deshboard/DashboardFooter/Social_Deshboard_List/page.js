'use client'

import React from 'react'
import Social_Deshboard_List from './Social_Deshboard_ListJsx/Social_Deshboard_List'
import ProtectedRoute from '@/app/Router/protectedRoute'

function Page() {
  return (
    <ProtectedRoute>
      <div>
        <Social_Deshboard_List></Social_Deshboard_List>
      </div>
    </ProtectedRoute>

  )
}


export default Page