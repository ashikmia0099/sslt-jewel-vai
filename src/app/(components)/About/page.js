import React from 'react'

import About_Section_1 from './AboutJsx/About_Section_1'

export const metadata = {
  title: 'SSLT | ABOUT',
  description: 'This is the about page',
}



function Page() {
  return (
    <div className=''>
      <About_Section_1></About_Section_1>
    </div>
  )
}

export default Page