'use client'

import React, { useEffect, useState } from 'react'
import { FaClinicMedical, FaNetworkWired } from 'react-icons/fa'
import { FaUserDoctor } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import { getfetchSecondBanner } from '@/redux/features/Home/SecondHeroSlice'

export default function BannerDynamicData({ id }) {
  
  const [singledata, setSingleData] = useState(null)
  const dispatch = useDispatch();
  const { secondBanner, loading } = useSelector(state => state.secondBanner)

  useEffect(() => {
    dispatch(getfetchSecondBanner())
  }, [dispatch])

  useEffect(() => {
    if (secondBanner.length > 0 && id) {
      const found = secondBanner.find(data => data.id?.toString() === id)
      setSingleData(found)
    }
  }, [secondBanner, id])

  if (!singledata) return null;


  return (
    <div className='max-w-[1536px] mx-auto pt-8 lg:pt-16'>
      <div className='px-5 lg:px-[5%] pb-20'>
        <div className=' justify-between  mx-auto'>
          <div className=' px-0 xl:px-20 pb-10 lg:pb-20'>
            <div className=' grid lg:grid-cols-3 gap-10 px-5 lg:px-20 py-12 rounded-3xl shadow-lg shadow-[#91aab4] border-t-4 border-x-2 border-[#91aab4]'>
              <div className=' lg:col-span-1 flex items-center justify-center'>
                <img src={singledata?.SingleImage} alt='teacher image' className=' rounded-lg lg:rounded-4xl shadow-lg shadow-[#91aab4] h-32 w-32 md:h-40 md:w-40 lg:h-60 lg:w-60 xl:h-80 xl:w-80' />
              </div>
              <div className=' lg:col-span-2 flex items-center justify-center'>
                <div className=' space-y-2.5'>
                  <h1 className=' text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold capitalize text-center lg:text-left flex items-center gap-x-2'>
                    <FaUserDoctor />
                    <span className='text-[#000000] text-lg md:text-xl lg:text-2xl xl:text-3xl goudy-bookletter-1911-regular'>{singledata?.Doctor_Name}</span>
                  </h1>
                  <p className=' text-[16px] md:text-lg lg:text-xl xl:text-2xl font-semibold flex items-center gap-x-2 goudy-bookletter-1911-regular'>
                    <FaNetworkWired />
                    {singledata?.Doctor_Position}
                  </p>
                  <p className='text-[16px] md:text-lg lg:text-xl xl:text-2xl font-semibold flex items-center gap-x-2 goudy-bookletter-1911-regular'>
                    <FaClinicMedical />
                    {singledata?.Working_place}
                  </p>
                  <p className=' pr-0 lg:pr-5 pl-2 text-[12px] lg:text-[16px] xl:text-lg text-center lg:text-left'>
                    {singledata?.Description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          {singledata?.dynamicDescriptions?.map((data, index) => (
            <div key={index} className='col-span-5 px-3 lg:px-8 overflow-auto pt-2'>
              <h3 className=' text-xl lg:text-2xl font-bold pb-5 goudy-bookletter-1911-regular'>{data?.title || 'Description Title'}</h3>
              <p className=' text-sm lg:text-lg font-semibold'>{data?.description || 'No description available'}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
