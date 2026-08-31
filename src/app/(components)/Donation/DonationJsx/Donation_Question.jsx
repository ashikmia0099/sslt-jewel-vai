'use client'
import React, { useEffect } from 'react'
import { AuroraText } from '../../../../components/magicui/aurora-text'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../../../../components/ui/accordion"
import { Montserrat } from 'next/font/google';
import { useDispatch, useSelector } from 'react-redux'
import { getfetchDonationFAQ } from '@/redux/features/donation/donationFAQSlice'
const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['600',], 
});


export default function Donation_Question() {

    const dispatch = useDispatch();
    const { donationFAQ } = useSelector(state => state.donationFAQ)

    useEffect(() => {
        dispatch(getfetchDonationFAQ())
    }, [dispatch])

    return (
        <div className=' pb-10 '>
            <div className='max-w-[1536px] mx-auto '>
                <div className=' grid lg:grid-cols-2 px-5 md:px-20 pb-10 mb:pb-32'>
                    <div>
                        <div className=' '>
                            <div className=' text-center lg:text-left sticky pt-0 lg:pt-16 xl:pt-0  text-3xl md:text-5xl lg:text-6xl xl:text-8xl font-extrabold uppercase leading-10 md:leading-14 lg:leading-16 xl:leading-24 goudy-bookletter-1911-regular'>
                                <h1 className=''> <AuroraText> Frequently Asked Questions </AuroraText></h1>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Accordion type="single" collapsible className="w-full">
                            {donationFAQ.slice(-10).map((data, index) => (
                                <AccordionItem key={data.id} value={`item-${index}`}>
                                    <AccordionTrigger className={` p-0 font-bold text-[16px] md:text-xl lg:text-lg 2xl:text-2xl pt-5 pb-1.5${montserrat.className}`}>{data.Title_Name}</AccordionTrigger>
                                    <AccordionContent className="flex flex-col gap-4 text-balance">
                                        <p className=" text-[12px] md:text-sm 2xl:text-lg font-semibold pt-3">{data.Description}</p>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>
        </div>
    )
}
