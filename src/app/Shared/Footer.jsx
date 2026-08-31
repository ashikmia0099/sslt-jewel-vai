'use client'

import ssltLogo from '../../../public/images/ssltLogo.png'
import Image from 'next/image'
import { FaArrowRight, FaFacebook, FaWhatsapp, FaYoutube } from 'react-icons/fa'
import { FaLocationDot, FaXTwitter } from 'react-icons/fa6'
import Link from 'next/link'
import { BsLinkedin } from "react-icons/bs";
import { MdOutlineMail } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { getfetchFooter } from '@/redux/features/footer/footerSlice'
import { useEffect } from 'react'
import { fetchContactDataGet } from '@/redux/features/contact/contactSlice'


function Footer() {


    const dispatch = useDispatch();
    const { footerData } = useSelector(state => state.footer)
    const { contactData } = useSelector(state => state.contact)

    useEffect(() => {
        dispatch(getfetchFooter())
    }, [dispatch])



    useEffect(() => {
        dispatch(fetchContactDataGet())
    }, [dispatch])


    return (
        <div className='bg-gradient-to-b from-[#000000] to-[#000000] relative z-0 pb-10 lg:pb-5'>
            <div className='py-0 md:py-5 lg:py-10 max-w-[1536px] mx-auto'>
                <div className='grid md:grid-cols-9 md:gap-0 lg:gap-20'>
                    <div className='md:col-span-3 pt-5 md:pt-10'>
                        <div className='flex items-center justify-center p-5 md:p-10'>
                            <Image src={ssltLogo} alt="SSL Logo" className='h-full  w-full' />
                        </div>
                    </div>
                    <div className='md:col-span-6 pt-5 lg:pt-10 flex items-center justify-center px-5 md:px-0'>
                        <div>
                            <h1 className=' text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-[#84C2DB] font-bold capitalize leading-8 md:leading-10 lg:leading-12 xl:leading-16 pr-0 lg:pr-40 goudy-bookletter-1911-regular'>
                                Join Our Worldclass Community
                            </h1>
                            <Link href="/Donation">
                                <button className='btn text-xl lg:text-2xl mt-5 rounded-full border-none bg-[#84C2DB] text-black goudy-bookletter-1911-regular'>
                                    Get Donation <FaArrowRight />
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='lg:grid lg:grid-cols-9 gap-20 pt-10 px-5 md:px-16 lg:px-0 flex flex-col-reverse '>
                    <div className='md:col-span-3 flex gap-3 items-center justify-center'>
                        {
                            footerData.filter(item => item.selectedType === 'Facebook').slice(-1).map((data) => (
                                <a key={data.id} href={data.socialLink} target='_blank' >
                                    <FaFacebook className='text-3xl text-white' />
                                </a>
                            ))
                        }
                        {
                            footerData.filter(item => item.selectedType === 'Youtube').slice(-1).map((data) => (
                                <a key={data.id} href={data.socialLink} target='_blank' >
                                    <FaYoutube className='text-3xl text-white' />
                                </a>
                            ))
                        }
                        {
                            footerData.filter(item => item.selectedType === 'Twitter').slice(-1).map((data) => (
                                <a key={data.id} href={data.socialLink} target='_blank' >
                                    <FaXTwitter className='text-3xl text-white' />
                                </a>
                            ))
                        }
                        {
                            footerData.filter(item => item.selectedType === 'Linkedin').slice(-1).map((data) => (
                                <a key={data.id} href={data.socialLink} target='_blank' >
                                    <BsLinkedin className='text-3xl text-white' />
                                </a>
                            ))
                        }
                    </div>

                    {/* Right */}
                    <div className='md:col-span-6'>
                        <div className='grid md:grid-cols-2'>
                            {/* Features */}
                            <div>
                                <h1 className=' text-2xl xl:text-3xl font-bold text-white pb-3 goudy-bookletter-1911-regular'>Features</h1>
                                <ul className='pl-2 space-y-1.5'>

                                    <li className=' text-[16px] lg:text-lg xl:text-xl font-medium text-[#ffffff]'> <Link href={'/'}>Home</Link> </li>
                                    <li className=' text-[16px] lg:text-lg xl:text-xl font-medium text-[#ffffff]'> <Link href={'/About'}>About Us</Link> </li>
                                    <li className=' text-[16px] lg:text-lg xl:text-xl font-medium text-[#ffffff]'> <Link href={'/News'}>News and Update</Link> </li>
                                    <li className=' text-[16px] lg:text-lg xl:text-xl font-medium text-[#ffffff]'> <Link href={'/Gallary'}>Gallary</Link> </li>
                                    <li className=' text-[16px] lg:text-lg xl:text-xl font-medium text-[#ffffff]'> <Link href={'/Contact'}>Contact</Link> </li>
                                    <li className=' text-[16px] lg:text-lg xl:text-xl font-medium text-[#ffffff]'> <Link href={'/Donation'}>Donate</Link> </li>
                                </ul>
                            </div>
                            {/* Contact */}
                            <div>
                                <h1 className='text-2xl xl:text-3xl font-bold text-white pb-3 pt-6 md:pt-0 goudy-bookletter-1911-regular'>Contact Us</h1>
                                <ul className='pl-2  space-y-3'>
                                    {
                                        contactData.filter(item => item.postedType === 'Phone').slice(-1).map((data) => (
                                            <>
                                                <li className='text-[16px] lg:text-lg xl:text-xl font-medium text-white flex items-center gap-3'>
                                                    <FaWhatsapp className='text-xl' /> +88{data.FieldOne}
                                                </li>
                                                <li className='text-[16px] lg:text-lg xl:text-xl font-medium text-white flex items-center gap-3'>
                                                    <FaWhatsapp className='text-xl' /> +88{data.FieldTwo}
                                                </li>
                                            </>
                                        ))
                                    }
                                    {
                                        contactData.filter(item => item.postedType === 'Email').slice(-1).map((data) => (
                                            <>
                                                <li className='text-[16px] lg:text-lg xl:text-xl font-medium text-white flex items-center gap-3'>
                                                    <MdOutlineMail className='text-xl' /> {data.FieldOne}
                                                </li>
                                                <li className='text-[16px] lg:text-lg xl:text-xl font-medium text-white flex items-center gap-3'>
                                                    <MdOutlineMail className='text-xl' /> {data.FieldTwo}
                                                </li>
                                            </>
                                        ))
                                    }
                                    {
                                        contactData.filter(item => item.postedType === 'Address').slice(-1).map((data) => (
                                            <>
                                                <li className='text-[16px] lg:text-lg xl:text-xl font-medium text-white flex items-center gap-3 capitalize'>
                                                    <FaLocationDot className='text-xl' /> {data.FieldOne}
                                                </li>
                                            </>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Footer