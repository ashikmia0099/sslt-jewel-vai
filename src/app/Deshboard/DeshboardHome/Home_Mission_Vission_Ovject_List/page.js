'use client'
import React from 'react'
import Home_Mission_Vission_Ovject_List from './Home_Mission_Vission_Ovject_ListJsx/Home_Mission_Vission_Ovject_List'
import ProtectedRoute from '@/app/Router/protectedRoute'

function Page() {
  return (
    <ProtectedRoute>
      <div>
        <Home_Mission_Vission_Ovject_List></Home_Mission_Vission_Ovject_List>
      </div>
    </ProtectedRoute>

  )
}


export default Page