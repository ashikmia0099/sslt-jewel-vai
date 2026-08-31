'use client'

import React, { useEffect, useState } from 'react'
import { AuroraText } from '../../../../components/magicui/aurora-text';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['600'],
});

function GeneralMember() {

    const [generalJson, setgeneralJson] = useState([])

    useEffect(() => {

        fetch('/jsonData/general_member.json')
            .then(res => res.json())
            .then(data => (
                setgeneralJson(data)
            ))
    }, [])

    return (
        <div className='max-w-[1596px] mx-auto bg-white'>
            <div className='border-b-2'>
                <h1 className={`text-3xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold capitalize leading-10 md:leading-14 lg:leading-20 xl:leading-24 text-center px-5 md:px-[10%] xl:px-[20%] pt-7 lg:pt-16 goudy-bookletter-1911-regular`}>
                    <AuroraText>Membership Benefits for General Members</AuroraText>
                </h1>
                <p className={`px-5 md:px-[10%] xl:px-[15%] text-[16px] md:text-lg xl:text-2xl leading-7 xl:leading-9 text-center py-10 ${montserrat.className}`}>
                    As a qualified professional in communication, hearing, and swallowing healthcare, full membership with the Society of Speech & Language Therapists (SSLT) offers numerous valuable benefits.
                </p>
            </div>
            <div className='grid md:grid-cols-7 pt-20 pb-20'>
                <div className=' md:col-span-2  px-5 md:px-2.5 lg:px-5'>
                    <h1 className=' text-2xl font-bold  py-2 pb-6 goudy-bookletter-1911-regular'>Table Of Content : </h1>
                    <div className=' pl-2 pr-6 space-y-4'>
                        {
                            generalJson?.map((data) => (
                                <h1 className=' text-sm lg:text-[16px] xl:text-lg font-semibold border-b-2 text-[#B6B3B1] border-black py-2 px-2'>{data.title}</h1>
                            ))
                        }
                    </div>
                </div>
                <div className=' md:col-span-5 px-5 lg:px-8 overflow-auto pt-2'>
                    {
                        generalJson?.map((data) => (
                            <>
                                <h3 className=' text-lg lg:text-xl xl:text-2xl font-bold pb-2 pt-5 goudy-bookletter-1911-regular'>{data.title} </h3>
                                <p className=' text-sm lg:text-[16px] xl:text-lg font-semibold'> {data.description} </p>
                            </>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default GeneralMember