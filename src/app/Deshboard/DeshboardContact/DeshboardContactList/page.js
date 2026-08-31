'use client'

import React from 'react'
import DeshboardContactList from './DeshboardContactListJsx/DeshboardContactList'
import ProtectedRoute from '@/app/Router/protectedRoute'

function Page() {
  return (
    <ProtectedRoute>
      <div>
        <DeshboardContactList></DeshboardContactList>
      </div>
    </ProtectedRoute>

  )
}

export default Page