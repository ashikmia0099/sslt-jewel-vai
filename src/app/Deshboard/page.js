'use client'
import React from 'react'
import DeshboardLoginUserAllList from './DeshboardLoginUser/DeshboardLoginUserAllList/DeshboardLoginUserAllListJsx/DeshboardLoginUserAllList'
import ProtectedRoute from '../Router/protectedRoute'

function Page() {
  return (
    <ProtectedRoute>
      <div >
        <DeshboardLoginUserAllList></DeshboardLoginUserAllList>
      </div>
    </ProtectedRoute>


  )
}

export default Page