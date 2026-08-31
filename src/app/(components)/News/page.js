import React from 'react'
import News from './NewsJsx/News'

export const metadata = {
  title: 'SSLT | NEWS',
  description: 'This is the News page',
}

function Page() {
  return (
    <div>
        <News></News>
    </div>
  )
}

export default Page