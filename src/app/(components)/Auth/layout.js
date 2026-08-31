import React from 'react'
import Authfiles from './AuthJsx/Authfiles'


function AuthLayout({ children }) {
    return (
        <div className="bg-white">
            <div className=' grid md:grid-cols-2 max-w-[1596px] mx-auto md:gap-20 lg:gap-10 xl:gap-0  px-4 lg:px-5 xl:10 py-10 md:py-20 lg:py-5 xl:py-20 h-full lg:max-h-screen items-center'>
            <div className='  '>
                <Authfiles></Authfiles>
            </div>
            <div className='  '>
                <main>
                    {children}
                </main>
            </div>
        </div>
        </div>
    )
}

export default AuthLayout