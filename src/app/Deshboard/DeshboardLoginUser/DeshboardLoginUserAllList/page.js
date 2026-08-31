'use client'
import React from 'react'
import DeshboardLoginUserAllList from './DeshboardLoginUserAllListJsx/DeshboardLoginUserAllList'
import ProtectedRoute from '@/app/Router/protectedRoute'

function Page() {
    return (
        <ProtectedRoute>
            <div>
                <DeshboardLoginUserAllList></DeshboardLoginUserAllList>
            </div>
        </ProtectedRoute>

    )
}

export default Page 