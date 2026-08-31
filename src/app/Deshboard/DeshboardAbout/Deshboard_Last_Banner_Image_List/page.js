'use client'
import React from 'react'
import Deshboard_Last_Banner_Image_List from './Deshboard_Last_Banner_Image_ListJsx/Deshboard_Last_Banner_Image_List'
import ProtectedRoute from '@/app/Router/protectedRoute'

function Page() {
  return (
    <ProtectedRoute>
      <div>
        <Deshboard_Last_Banner_Image_List></Deshboard_Last_Banner_Image_List>
      </div>
    </ProtectedRoute>

  )
}

export default Page