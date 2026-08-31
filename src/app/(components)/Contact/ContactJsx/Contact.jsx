'use client'
import React, { useEffect } from 'react'
import { AuroraText } from '../../../../components/magicui/aurora-text'
import { FaMapMarkerAlt, FaPhoneAlt, FaRegClock } from 'react-icons/fa'
import { MdOutlineEmail } from 'react-icons/md'
import { Montserrat } from 'next/font/google';
import { useDispatch, useSelector } from 'react-redux'
import { fetchContactDataGet } from '@/redux/features/contact/contactSlice'

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['600',],
});


function Contact() {

    const dispatch = useDispatch();
    const { contactData } = useSelector(state => state.contact)

    useEffect(() => {
        dispatch(fetchContactDataGet())
    }, [dispatch])


    return (
        <div className='max-w-[1596px] mx-auto bg-white'>
            <div >
                <h1 className={` text-3xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold capitalize leading-10 md:leading-14 lg:leading-20 xl:leading-28 text-center px-5 md:px-[10%] xl:px-[20%] pt-16 goudy-bookletter-1911-regular`}>
                    <AuroraText>We Have love from You</AuroraText>
                </h1>
                <p className={` px-5 md:px-[10%] xl:px-[15%] text-[16px] md:text-xl xl:text-2xl leading-7 xl:leading-9 text-center capitalize py-10 ${montserrat.className}`}>SSLT fosters professional communication across Bangladesh by uniting experts in speech, hearing, and swallowing care. For inquiries, collaboration, or support, please explore our website or reach out via our official contact channels. We welcome engagement from professionals, stakeholders, and the public to strengthen our shared mission.</p>
            </div>
            <div className=' grid md:grid-cols-2 gap-y-10 xl:gap-y-22 gap-0 md:gap-10 xl:gap-20 px-5 xl:px-36 pb-16 xl:pb-36 pt-10 lg:pt-20'>
                {/* phone */}
                {
                    contactData.map((item) => {
                        if (item.postedType === "Phone") {
                            return (
                                <div key={item.id} className='px-5 xl:px-10 py-6 rounded-2xl shadow-xl shadow-[#91aab4] '>
                                    <div className=' h-16 w-16 bg-[#cfeefab7] rounded-sm flex items-center justify-center'>
                                        <FaPhoneAlt className=' text-3xl text-[#11aeec]' />
                                    </div>
                                    <h4 className=' text-2xl font-bold text-black pt-3 capitalize goudy-bookletter-1911-regular'>{item.postedType}</h4>
                                    <div className=' pt-4 space-y-1.5'>
                                        <h4 className=' text-lg lg:text-xl font-bold text-[#0881b1]'>
                                            +88{item.FieldOne}
                                        </h4>
                                        <h4 className=' text-lg lg:text-xl font-bold text-[#0881b1]'>
                                            +88{item.FieldTwo}
                                        </h4>
                                    </div>
                                </div>
                            )
                        }
                        // email
                        if (item.postedType === "Email") {
                            return (
                                <div key={item.id} className='px-5 xl:px-10 py-6 rounded-2xl shadow-xl shadow-[#91aab4] '>
                                    <div className=' h-16 w-16 bg-[#cfeefab7] rounded-sm flex items-center justify-center'>
                                        <MdOutlineEmail className=' text-3xl text-[#11aeec]' />
                                    </div>
                                    <h4 className=' text-2xl font-bold text-black pt-3 capitalize goudy-bookletter-1911-regular'>{item.postedType}</h4>
                                    <div className=' pt-4 space-y-1.5'>
                                        <h4 className=' text-lg lg:text-xl font-bold text-[#0881b1]'>
                                            {item.FieldOne}
                                        </h4>
                                        <h4 className=' text-lg lg:text-xl font-bold text-[#0881b1]'>
                                            {item.FieldTwo}
                                        </h4>
                                    </div>
                                </div>
                            )
                        }
                        // Location
                        if (item.postedType === "Address") {
                            return (
                                <div key={item.id} className='px-5 xl:px-10 py-6 rounded-2xl shadow-xl shadow-[#91aab4] '>
                                    <div className=' h-16 w-16 bg-[#cfeefab7] rounded-sm flex items-center justify-center '>
                                        <FaMapMarkerAlt className=' text-3xl text-[#11aeec]' />
                                    </div>
                                    <h4 className=' text-2xl font-bold text-black pt-3 capitalize goudy-bookletter-1911-regular'>{item.postedType}</h4>
                                    <div className=' pt-4 space-y-1.5'>
                                        <h4 className=' text-lg lg:text-xl font-bold text-[#0881b1]'>
                                            {item.FieldOne}
                                        </h4>
                                        <h4 className=' text-lg lg:text-xl font-bold text-[#0881b1]'>
                                            {item.FieldTwo}
                                        </h4>
                                    </div>
                                </div>
                            )
                        }
                        // time
                        if (item.postedType === "OpeningDayTime") {
                            return (
                                <div key={item.id} className='px-5 xl:px-10 py-6 rounded-2xl shadow-xl shadow-[#91aab4] '>
                                    <div className=' h-16 w-16 bg-[#cfeefab7] rounded-sm flex items-center justify-center'>
                                        <FaRegClock className=' text-3xl text-[#11aeec]' />
                                    </div>
                                    <h4 className=' text-2xl font-bold text-black pt-3 capitalize goudy-bookletter-1911-regular'>Opening Day and Time</h4>
                                    <div className=' pt-4 space-y-1.5'>
                                        <h4 className=' text-lg lg:text-xl font-bold text-[#0881b1]'>
                                            {item.FieldOne}
                                        </h4>
                                        <h4 className=' text-lg lg:text-xl font-bold text-[#0881b1]'>
                                            {item.FieldTwo}
                                        </h4>
                                    </div>
                                </div>
                            )
                        }
                    })
                }
            </div>
        </div>
    )
}

export default Contact