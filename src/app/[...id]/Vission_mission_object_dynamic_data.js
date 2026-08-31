'use client'

import React, { useEffect, useState } from 'react'
import { AuroraText } from '../../components/magicui/aurora-text';
import { Montserrat } from 'next/font/google';
import { useDispatch, useSelector } from 'react-redux';
import { getfetchMissionVissionObject } from '@/redux/features/Home/missionVissionObjectSlice';

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['600'],
});


function Vission_mission_object_dynamic_data({ id }) {

    const dispatch = useDispatch();
    const { mission_vission_object } = useSelector(state => state.misssionVissionObject)
    const [singledata, setSingleData] = useState(null)

    useEffect(() => {
        dispatch(getfetchMissionVissionObject())
    }, [dispatch])

    useEffect(() => {
        if (mission_vission_object.length > 0 && id) {
            const found = mission_vission_object.find(data => data.id?.toString() === id)
            setSingleData(found)
        }
    }, [mission_vission_object, id])

    if (!singledata) return null;

    return (
        <div className='max-w-[1596px] mx-auto bg-white'>
            <div className='border-b-2'>
                <h1 className={`text-3xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold capitalize leading-10 md:leading-14 lg:leading-20 xl:leading-24 text-center px-5 md:px-[10%] xl:px-[20%] pt-7 lg:pt-16 goudy-bookletter-1911-regular`}>
                    <AuroraText>SSLT  {singledata?.Title}</AuroraText>
                </h1>
                <p className={`px-5 md:px-[10%] xl:px-[15%] text-[16px] md:text-lg xl:text-xl leading-7 xl:leading-9 text-center py-10 font-semibold ${montserrat.className}`}>
                    {singledata?.Description}
                </p>
            </div>
            <div className='grid md:grid-cols-7 pt-20 pb-20'>
                <div className=' md:col-span-2  px-5 md:px-2.5 lg:px-5'>
                    <h1 className='text-2xl font-bold  py-2 pb-6 goudy-bookletter-1911-regular'>Table Of Content : </h1>
                    <div className=' pl-2 pr-6 space-y-4'>
                        <h1 className=' text-lg font-semibold border-b-2 text-[#B6B3B1] border-black py-2 px-2'>{singledata?.title}</h1>
                        {
                            singledata?.dynamicDescriptions?.map((allobject, index) => (
                                <div key={index}>
                                    <h1 className=' text-sm lg:text-[16px] xl:text-lg font-semibold border-b-2 text-[#B6B3B1] border-black py-2 px-2'>{allobject?.title}</h1>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className='md:col-span-5 px-5 lg:px-8 overflow-auto pt-2'>
                    <div >
                        <h3 className='  text-lg lg:text-xl xl:text-2xl font-bold pb-2 pt-5 goudy-bookletter-1911-regular'>{singledata?.title} </h3>
                        <p className=' text-sm lg:text-[16px] xl:text-lg font-semibold'> {singledata.Description} </p>
                    </div>
                    {
                        singledata?.dynamicDescriptions?.map((allobject, index) => (
                            <div key={index}>
                                <h3 className='text-lg lg:text-xl xl:text-2xl font-bold pb-2 pt-5 goudy-bookletter-1911-regular'>{allobject.title} </h3>
                                <p className='text-sm lg:text-[16px] xl:text-lg font-semibold'> {allobject.description} </p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Vission_mission_object_dynamic_data