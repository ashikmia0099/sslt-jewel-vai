'use client'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getfetchDonationMedium } from '@/redux/features/donation/donationMediumSlice';

export default function Donation_Card() {
    
    const dispatch = useDispatch();
    const { donationMedium } = useSelector(state => state.donationMedium)

    useEffect(() => {
        dispatch(getfetchDonationMedium())
    }, [dispatch])


    return (
        <div className=' pb-10 '>
            <div className='max-w-[1536px] mx-auto '>
                <div className=' grid md:grid-cols-2 gap-y-10 xl:gap-y-22 gap-0 md:gap-10 xl:gap-20 px-5 xl:px-36 pb-16 xl:pb-36 pt-5 md:pt-10'>
                    {
                        donationMedium?.slice(-10).map((data) => (
                            <div key={data.id} className='px-5 xl:px-10 py-6 rounded-2xl shadow-xl shadow-[#91aab4]'>
                                <div className='h-16 w-16 bg-[#cfeefab7] rounded-sm flex items-center justify-center'>
                                    <img src={data.MFS_Bank_Image} alt={data.MFS_Bank_Name} className='' />
                                </div>
                                <h4 className='text-2xl font-bold text-black pt-3 goudy-bookletter-1911-regular'>{data.MFS_Bank_Name}</h4>
                                <p className='text-[16px] lg:text-lg font-semibold leading-6 pt-3'>{data.shortOverview}</p>
                                <div className='pt-4 space-y-1.5'>
                                    <h4 className='text-lg lg:text-xl font-bold text-[#0881b1]'>{data.FieldOne || ''}</h4>
                                    <h4 className='text-lg lg:text-xl font-bold text-[#0881b1]'>{data.FieldTwo || ''}</h4>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
