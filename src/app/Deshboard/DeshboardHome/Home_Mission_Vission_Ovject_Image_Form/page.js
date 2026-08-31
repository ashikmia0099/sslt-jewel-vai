'use client'

import React from 'react'
import Home_Mission_Vission_Ovject_Image_Form from './Home_Mission_Vission_Ovject_Image_FormJsx/Home_Mission_Vission_Ovject_Image_Form'
import ProtectedRoute from '@/app/Router/protectedRoute'

function Page() {
  return (
    <ProtectedRoute>
      <div>
        <Home_Mission_Vission_Ovject_Image_Form></Home_Mission_Vission_Ovject_Image_Form>
      </div>
    </ProtectedRoute>

  )
}

export default Page