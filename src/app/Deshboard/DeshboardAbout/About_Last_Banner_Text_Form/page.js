'use client'

import React from 'react'
import About_Last_Banner_Text_Form from './About_Last_Banner_Text_FormJsx/About_Last_Banner_Text_Form'
import ProtectedRoute from '@/app/Router/protectedRoute'

function Page() {
  return (
    <ProtectedRoute>
      <div>
        <About_Last_Banner_Text_Form></About_Last_Banner_Text_Form>
      </div>
    </ProtectedRoute>

  )
}

export default Page




