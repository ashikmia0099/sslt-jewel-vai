'use client'

import React, { useEffect, useState } from 'react'
import { AuroraText } from '../../../../components/magicui/aurora-text';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['600'],
});


function Objectives() {

    const [objects, setObject] = useState([])

    useEffect(() => {

        fetch('jsonData/object.json')
            .then(res => res.json())
            .then(data => {
                setObject(data)
            })

    }, [])


    return (
        <div className='max-w-[1596px] mx-auto bg-white'>
            <div className='border-b-2'>
                <h1 className={`text-3xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold uppercase leading-10 md:leading-14 lg:leading-20 xl:leading-28 text-center px-5 md:px-[10%] xl:px-[20%] pt-7 lg:pt-16`}>
                    <AuroraText>SSLT <br /> Objectives</AuroraText>
                </h1>
                <p className={`px-5 md:px-[10%] xl:px-[15%] text-[16px] md:text-lg xl:text-2xl leading-7 xl:leading-9 text-center py-10 ${montserrat.className}`}>
                  To explore and promote the use of innovative technologies, such as telepractice and digital tools, to enhance the accessibility and quality of services for individuals with communication and swallowing disorders.
                </p>
            </div>
            <div className='grid grid-cols-7 pt-20 pb-20'>
                <div className=' col-span-2  px-5'>
                    <h1 className=' text-2xl font-bold  py-2 pb-6'>Table Of Content : </h1>
                    <div className=' pl-2 pr-6 space-y-4'>
                        {
                            objects.map((allobject, index) => (
                                <div key={index}>
                                    <h1 className=' text-lg font-semibold border-b-2 text-[#B6B3B1] border-black py-2 px-2'>{allobject.title}</h1>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className=' col-span-5  px-8 overflow-auto pt-2'>
                    {
                        objects.map((allobject, index) => (
                            <div key={index}>
                                <h3 className=' text-2xl font-bold pb-5'>{allobject.title} </h3>
                                <p className=' text-lg font-semibold'> {allobject.description} </p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Objectives