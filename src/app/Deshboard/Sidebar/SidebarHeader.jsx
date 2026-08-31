import React from 'react'
// import profileimage from '../../../../public/images/blogsimages/Container.png'
import Image from 'next/image'
import { IoMdLogOut } from 'react-icons/io'

function SidebarHeader() {
  return (
    <div className=' border-b pb-5'>

      <div className=' flex items-center gap-5 px-5 py-2 pt-5'>
        
        {/* text */}
        <div>
          <h4 className=' text-xl font-semibold text-[#ffffff]'>Ashik Ahammed</h4>
          <h4 className=' text-lg  text-[#747474] font-semibold'>Admin</h4>
        </div>
        <div className=' -mt-6'>

          <li className="flex-col gap-3  px-5 list-none">
            <div className="flex items-center gap-3">
              <span className="text-2xl text-white"><IoMdLogOut /></span>
              <span className="text-xl font-semibold text-white">Sign Out</span>
            </div>
          </li>
          

        </div>
      </div>
    </div>
  )
}

export default SidebarHeader