'use client'

import React from 'react'
import About_Title_Text from './About_Title_TextJsx/About_Title_Text'
import ProtectedRoute from '@/app/Router/protectedRoute'

function Page() {
  return (
    <ProtectedRoute>
      <div>
        <About_Title_Text></About_Title_Text>
      </div>
    </ProtectedRoute>

  )
}

export default Page