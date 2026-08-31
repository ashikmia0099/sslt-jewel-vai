import React from 'react'
// import profileimage from '../../../../public/images/blogsimages/Container.png'
import Image from 'next/image'
import { MdSettingsSuggest } from 'react-icons/md'
import { FaUserAlt } from 'react-icons/fa'
import { IoMdLogOut } from 'react-icons/io'

function Sidebarfooter() {
    return (
        <div className=' border-t py-2 '>

            <li className="flex-col gap-3 py-2 px-5 list-none">
                <div className="flex items-center gap-3">
                    <span className="text-2xl text-white"><IoMdLogOut /></span>
                    <span className="text-xl font-semibold text-white">Sign Out</span>
                </div>
            </li>
            <li className="flex-col gap-3 py-2 px-5 list-none">
                <div className="flex items-center gap-3">
                    <span className="text-2xl text-white"><FaUserAlt /></span>
                    <span className="text-xl font-semibold text-white">Profile</span>
                </div>
            </li>
           
        </div>
    )
}

export default Sidebarfooter