import React from 'react'
import Sidebar from './Sidebar/Sidebar'



function DeshboardLayouts({ children }) {
  
  return (
    <div className=' grid grid-cols-12 max-w-[1596px] mx-auto bg-[#191919] h-[100vh] mt-8'>
      <div className=' col-span-3  border-r grid  grid-rows-12 h-[100vh]'>
        
        <div className='row-span-11  overflow-y-auto mt-10'>
        <Sidebar></Sidebar>
        </div>
      
      </div>
      <div className=' col-span-9 h-[100vh] overflow-y-auto'>
        <main>
          {children}
        </main>
      </div>
     
      
    </div>
  )
}

export default DeshboardLayouts


