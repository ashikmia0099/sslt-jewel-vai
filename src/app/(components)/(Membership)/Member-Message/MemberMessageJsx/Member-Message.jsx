"use client";

import React, { useEffect } from 'react'
import { AuroraText } from '../../../../../components/magicui/aurora-text'
import { Montserrat } from 'next/font/google';
import { useDispatch, useSelector } from 'react-redux';
import { getfetchFoundingMember } from '@/redux/features/Home/founderMessageSlice';
const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['600',],
});

function Member_Message() {

    const dispatch = useDispatch();
    const { foundingMemberData } = useSelector(state => state.foundingMember)

    useEffect(() => {
        dispatch(getfetchFoundingMember())
    }, [dispatch])


    return (
        <div className='max-w-[1596px] mx-auto bg-white'>
            <div >
                <h1 className={`text-3xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold uppercase leading-10 md:leading-14 lg:leading-20 xl:leading-28 text-center px-5 md:px-[10%]  pt-5 lg:pt-16 goudy-bookletter-1911-regular`}>
                    <AuroraText>Message From Founders And Members</AuroraText>
                </h1>
                <p className={`px-5 md:px-[10%] xl:px-[15%] text-[16px] md:text-xl xl:text-2xl leading-7 xl:leading-9 text-center py-10 ${montserrat.className}`}>Meet the dedicated professionals who serve as the current Executive Committee (EC) members of the Society of Speech & Language Therapists (SSLT). These individuals are committed to advancing the fields of communication, swallowing, and hearing health, while also safeguarding the rights and practice of our members. Through their leadership, expertise, and unwavering dedication, they ensure that SSLT remains a strong advocate for professional standards, ethical practices, and the well-being of both the members and the communities we serve.</p>
            </div>
            {
                foundingMemberData.filter(item => item.ChooseFoundingMemberType === "Pesident").slice(-1).map((data, index) => (
                    <div className=' px-5 xl:px-20 pb-10 lg:pb-20'>
                        <div className=' grid lg:grid-cols-3 gap-10 px-5 lg:px-20 py-12 rounded-3xl shadow-lg shadow-[#91aab4] border-t-4 border-x-2 border-[#91aab4]'>
                            <div className=' lg:col-span-1 flex items-center justify-center'>
                                <img src={data.Choose_Image} alt="pesident image" className=' rounded-lg lg:rounded-4xl shadow-lg shadow-[#718891] h-20 w-20 md:h-40 md:w-40 lg:h-60 lg:w-60 xl:h-80 xl:w-80' />
                            </div>
                            <div className=' lg:col-span-2 flex items-center justify-center'>
                                <div>
                                    <h1 className=' text-black font-bold text-2xl lg:text-3xl xl:text-4xl pb-3 text-center lg:text-left goudy-bookletter-1911-regular'>Message from the President</h1>
                                    <h1 className=' text-black font-semibold text-lg lg:text-xl xl:text-2xl pb-3 text-center lg:text-left goudy-bookletter-1911-regular'>Dear Members and Visitors</h1>
                                    <p className=' pr-0 lg:pr-5 pl-2 text-[12px] lg:text-[16px] xl:text-lg text-center lg:text-left'>
                                        {data.Description}
                                    </p>
                                    <div className=' pt-6'>
                                        <p className=' text-[16px] xl:text-lg font-semibold goudy-bookletter-1911-regular'>
                                            Warm regards,
                                        </p>
                                        <h3 className=' text-lg lg:text-2xl font-bold goudy-bookletter-1911-regular'>
                                            {data.Name}
                                        </h3>
                                        <p className='text-[16px] lg:text-lg font-semibold goudy-bookletter-1911-regular'>
                                            President, Society of Speech & Language Therapists (SSLT)
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
            <div className=' grid xl:grid-cols-2 gap-7 pb-20 px-5 2xl:px-0'>
                {
                    foundingMemberData.filter(item => item.ChooseFoundingMemberType === "Secretary").slice(-1).map((data, index) => (
                        <div className=' pb-10 lg:pb-20' key={data._id}>
                            <div className=' px-5 lg:px-20 py-12 rounded-3xl shadow-lg shadow-[#91aab4] border-t-4 border-x-2 border-[#91aab4'>
                                <div className='  flex items-center justify-center'>
                                    <img src={data.Choose_Image} alt="pesident image" className=' rounded-lg lg:rounded-4xl shadow-lg shadow-[#718891] h-20 w-20 md:h-40 md:w-40 lg:h-60 lg:w-60 xl:h-80 xl:w-80' />
                                </div>
                                <div className='  flex items-center justify-center pt-10'>
                                    <div>
                                        <h1 className=' text-black font-bold text-2xl lg:text-3xl xl:text-4xl pb-3 text-center lg:text-left goudy-bookletter-1911-regular'>Message from the General Secretary</h1>
                                        <h1 className=' text-black font-semibold text-lg lg:text-xl xl:text-2xl pb-3 text-center lg:text-left goudy-bookletter-1911-regular'>Dear Members and Colleagues</h1>
                                        <p className=' pr-0 lg:pr-5 pl-2 text-[12px] lg:text-[16px] xl:text-lg text-center lg:text-left'>
                                            {data.Description}
                                        </p>
                                        <div className=' pt-6'>
                                            <p className=' text-[16px] xl:text-lg font-semibold goudy-bookletter-1911-regular'>
                                                Best regards,,
                                            </p>
                                            <h3 className=' text-lg lg:text-2xl font-bold goudy-bookletter-1911-regular'>
                                                {data.Name}
                                            </h3>
                                            <p className='text-[16px] lg:text-lg font-semibold goudy-bookletter-1911-regular'>
                                                General Secretary, Society of Speech & Language Therapists (SSLT)
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
                {/* Founding Memver */}
                {
                    foundingMemberData.filter(item => item.ChooseFoundingMemberType === "Founding").slice(-1).map((data, index) => (
                        <div className=' pb-10 lg:pb-20' key={data._id}>
                            <div className=' px-5 lg:px-20 py-12 rounded-3xl shadow-lg shadow-[#91aab4] border-t-4 border-x-2 border-[#91aab4]'>
                                {/* image */}
                                <div className='  flex items-center justify-center'>
                                    <img src={data.Choose_Image} alt="pesident image" className=' rounded-lg lg:rounded-4xl shadow-lg shadow-[#718891] h-20 w-20 md:h-40 md:w-40 lg:h-60 lg:w-60 xl:h-80 xl:w-80' />
                                </div>
                                {/* text- */}
                                <div className='  flex items-center justify-center pt-10'>
                                    <div>
                                        <h1 className=' text-black font-bold text-2xl lg:text-3xl xl:text-4xl pb-3 text-center lg:text-left goudy-bookletter-1911-regular'>Message from Founding Members</h1>
                                        <p className=' pr-0 lg:pr-5 pl-2 text-[12px] lg:text-[16px] xl:text-lg text-center lg:text-left'>
                                            {data.Description}
                                        </p>
                                        <div className=' pt-6'>
                                            <p className=' text-[16px] xl:text-lg font-semibold'>
                                                Best regards,,
                                            </p>
                                            <h3 className=' text-lg lg:text-2xl font-bold'>
                                                {data.Name}
                                            </h3>
                                            <p className='text-[16px] lg:text-lg font-semibold'>
                                                Founding Members, Society of Speech & Language Therapists (SSLT)
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Member_Message