'use client';

import React, { useEffect } from 'react';
import { AuroraText } from '../../../components/magicui/aurora-text';
import { Montserrat } from 'next/font/google';
import Link from 'next/link';
import "./localcss/banner1.css"
import { useDispatch, useSelector } from 'react-redux';
import { getfetchMissionVissionObject } from '@/redux/features/Home/missionVissionObjectSlice';

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['600'],
});

function Vission_Mission_Objective() {

    const dispatch = useDispatch();
    const { mission_vission_object } = useSelector(state => state.misssionVissionObject)

    useEffect(() => {
        dispatch(getfetchMissionVissionObject())
    }, [dispatch])


    return (
        <div>
            <div className="max-w-[1536px] mx-auto pb-10 md:pb-20 lg:pb-30 md:pt-10 px-5">
                <div className=" mt-10 lg:mt-20 md:grid md:grid-cols-2 gap-10 lg:gap-20 flex flex-col-reverse md:flex-none ">
                    {
                        mission_vission_object
                            .filter(item => item.postType === 'Image')
                            .slice(-1)
                            .map((data, index) => (
                                <div className="flex items-center justify-center" key={data._id}>
                                    <div className="sticky">
                                        <img src={data.Image} alt="Mission Vision" className=" h-[350px] md:h-[430px] lg:h-[550px] xl:h-[660px]  w-full rounded-tl-[100px] md:rounded-tl-[130px] lg:rounded-tl-[200px] rounded-br-[100px] md:rounded-br-[130px] lg:rounded-br-[200px] rounded-xl shadow-lg  hover:shadow-lg shadow-[#576a7a] hover:shadow-[#39525c]" />
                                    </div>
                                </div>
                            ))
                    }
                    <div>
                        {
                            mission_vission_object.filter(item => item.postType === 'Text').slice(-3).map((data, index) => (
                                <div key={data.id}>
                                    <h1 className=" text-2xl lg:text-3xl xl:text-4xl font-extrabold capitalize leading-8 md:leading-10 lg:leading-16 xl:leading-24  lg:text-left text-[#83C1DA] pt-5 goudy-bookletter-1911-regular">
                                        <AuroraText>{data.Title}</AuroraText>
                                    </h1>
                                    <p className={` text-sm lg:text-lg xl:text-xl font-semibold text-black pt-3 md:pt-0`}>
                                        {data.Description?.split(' ').slice(0, 15).join(' ')}...
                                        <b className=" capitalize text-sm lg:text-lg xl:text-xl font-[500] text-blue-500 underline ml-2 border-blue-800">
                                            <Link href={`/${data.id}`}>see More</Link>
                                        </b>
                                    </p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Vission_Mission_Objective;
