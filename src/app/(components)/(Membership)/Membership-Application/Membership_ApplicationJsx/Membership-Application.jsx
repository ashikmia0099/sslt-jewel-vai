import React from 'react'
import { AuroraText } from '../../../../../components/magicui/aurora-text';
import { Montserrat } from 'next/font/google';


const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['600'],
});


function Membership_Application() {
    return (
        <div className='max-w-[1596px] mx-auto bg-white'>
            <div className='border-b-2'>
                <h1 className={`text-3xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold capitalize leading-10 md:leading-14 lg:leading-20 xl:leading-24 text-center px-5 md:px-[10%] xl:px-[20%] pt-7 lg:pt-16 goudy-bookletter-1911-regular`}>
                    <AuroraText>Membership Application Requierments</AuroraText>
                </h1>
                <p className={`px-5 md:px-[10%]  text-[16px] md:text-lg xl:text-2xl leading-7 xl:leading-9 text-center py-10 ${montserrat.className}`}>
                    To apply for membership in the Society of Speech & Language Therapists (SSLT), please follow the steps below.
                </p>
            </div>
            {/* grid section */}
            <div className='grid md:grid-cols-7 pt-20 pb-20'>
                {/* grid  left section */}
                <div className=' md:col-span-2  px-5 md:px-2.5 lg:px-5 goudy-bookletter-1911-regular'>
                    <h1 className=' text-2xl font-bold  py-2 pb-6'>Table Of Content : </h1>
                    <div className=' pl-2 pr-6 space-y-4'>
                        <h1 className=' text-sm lg:text-[16px] xl:text-lg font-semibold border-b-2 text-[#B6B3B1] border-black py-2 px-2 '>Initial Request</h1>
                        <h1 className=' text-sm lg:text-[16px] xl:text-lg font-semibold border-b-2 text-[#B6B3B1] border-black py-2 px-2'>Submission of Application Form</h1>
                        <h1 className=' text-sm lg:text-[16px] xl:text-lg font-semibold border-b-2 text-[#B6B3B1] border-black py-2 px-2'>Payment of Membership Fees</h1>
                        <h1 className=' text-sm lg:text-[16px] xl:text-lg font-semibold border-b-2 text-[#B6B3B1] border-black py-2 px-2'>Review and Approval</h1>
                    </div>
                </div>
                {/* grid middle section */}
                <div className=' md:col-span-5 px-5 lg:px-8 overflow-auto pt-2'>
                    <div>
                        <h3 className=' text-lg lg:text-xl xl:text-2xl font-bold pb-2 pt-5 goudy-bookletter-1911-regular'>Initial Request</h3>
                        <div className=' px-3'>
                            <p className=' text-sm lg:text-lg  '> <span className='text-sm lg:text-lg xl:text-xl font-bold'>1.</span> Send an email to ssltsbangladesh@gmail.com requesting a membership application form </p>
                            <p className=' text-sm lg:text-lg'> <span className='text-sm lg:text-lg xl:text-xl font-bold'>2. For General Members : </span> Attach copies of all your academic certificates:</p>
                            <ul className=' px-3 lg:px-6 pt-6'>
                                <li className=' text-sm md:text-[16px] lg:text-lg font-semibold'> 	SSC Certificate</li>
                                <li className=' text-sm md:text-[16px] lg:text-lg font-semibold'> 	HSC  Certificate</li>
                                <li className=' text-sm md:text-[16px] lg:text-lg font-semibold'> 	Bachelor’s Degree Certificate</li>
                                <li className=' text-sm md:text-[16px] lg:text-lg font-semibold'> 	Internship Certificate</li>
                                <li className=' text-sm md:text-[16px] lg:text-lg font-semibold'> 	Post-Graduation Certificate</li>
                                <li className=' text-sm md:text-[16px] lg:text-lg font-semibold'> 	Your National Identity Card</li>
                                <li className=' text-sm md:text-[16px] lg:text-lg font-semibold'> 	A recent passport-sized photograph</li>
                            </ul>
                            <p className=' text-sm lg:text-lg font-semibold pt-6'> <span className='text-sm lg:text-lg xl:text-xl font-bold'>3. For Student Members : </span>Attach copies of all your academic certificates:</p>
                            <ul className=' px-6 pt-6'>
                                <li className='text-sm md:text-[16px] lg:text-lg font-semibold'> 	SSC Certificate</li>
                                <li className='text-sm md:text-[16px] lg:text-lg font-semibold'> 	HSC  Certificate</li>
                                <li className='text-sm md:text-[16px] lg:text-lg font-semibold'> 	Your National Identity Card or Birth Certificate</li>
                                <li className='text-sm md:text-[16px] lg:text-lg font-semibold'> 	Student ID Card</li>
                                <li className='text-sm md:text-[16px] lg:text-lg font-semibold'> 	A recent passport-sized photograph</li>
                            </ul>
                        </div>
                    </div>
                    <div className=' pt-10'>
                        <h3 className=' text-lg lg:text-xl xl:text-2xl font-bold pb-2 pt-5 goudy-bookletter-1911-regular'>Submission of Application Form</h3>
                        <div className=' px-3'>
                            <p className='text-sm lg:text-lg'> <span className='text-sm lg:text-lg xl:text-xl font-bold'>1.</span>	After carefully completing the application form, submit the hard copy to the Executive Committee (EC) of SSLT. </p>
                            <p className=' pt-3'> <span className='text-sm lg:text-lg xl:text-xl font-bold'>2. Along with the application form, include the following documents: </span></p>
                            <ul className=' px-6 pt-6'>
                                <li className='text-sm md:text-[16px] lg:text-lg font-semibold'> 	Three (3) recent passport-sized photographs</li>
                                <li className='text-sm md:text-[16px] lg:text-lg font-semibold'> 	Copies of all academic certificates</li>
                                <li className='text-sm md:text-[16px] lg:text-lg font-semibold'> 	A copy of your National Identity Card</li>
                                <li className='text-sm md:text-[16px] lg:text-lg font-semibold'> 	Signed Declaration Form and Code of Conduct of SSLT, indicating your agreement with the SSLT Constitution</li>
                            </ul>
                        </div>
                    </div>
                    <div className=' pt-10'>
                        <h3 className='text-lg lg:text-xl xl:text-2xl font-bold pb-2 pt-5 goudy-bookletter-1911-regular'>Payment of Membership Fees</h3>
                        <div className=' px-3'>
                            <p className='text-sm lg:text-lg'> <span className=' text-sm lg:text-lg xl:text-xl font-bold'>1.</span> Upon completing your application, make the membership registration fee payment. The registration fee varies based on the membership category </p>
                           <div className=' px-3'>
                             <p className=' text-lg font-semibold pt-3'> <span className=' text-sm lg:text-lg xl:text-xl font-bold'>1. General Member : </span></p>
                            <ul className=' px-6 pt-6'>
                                <li className='text-sm md:text-[16px] lg:text-lg font-semibold'> 	Registration Fee (new membership).</li>
                                <li className='text-sm md:text-[16px] lg:text-lg font-semibold'> 	Yearly Membership Fee.</li>
                            </ul>
                            <p className=' text-lg font-semibold pt-3'> <span className='text-sm lg:text-lg xl:text-xl font-bold'>2. Student  Member : </span></p>
                            <ul className=' px-6 pt-6'>
                                <li className='text-sm md:text-[16px] lg:text-lg font-semibold'>	Registration Fee (one-time payment)</li>
                            </ul>
                           </div>
                             <p className=' text-sm md:text-[16px] lg:text-lg font-semibold pt-3'> <span className=' text-sm lg:text-lg xl:text-xl font-bold'>2.</span> Payment should be made only through the official bank account of SSLT. After making the payment, send a confirmation message to the Treasurer to receive your receipt. </p>
                        </div>
                    </div>
                    <div className=' pt-10'>
                        <h3 className=' text-lg lg:text-xl xl:text-2xl font-bold pb-2 pt-5 goudy-bookletter-1911-regular'>Review and Approval</h3>
                        <div className=' px-3'>
                            <p className=' text-sm md:text-[16px] lg:text-lg font-semibold pt-3'> <span className='text-sm lg:text-lg xl:text-xl font-bold'>1.</span>By submitting your application and paying the registration fee, you acknowledge and agree to abide by the rules and regulations of the SSLT Constitution. </p>
                            <p className=' text-sm md:text-[16px] lg:text-lg font-semibold  pt-3'> <span className='text-sm lg:text-lg xl:text-xl font-bold'>2.</span>The Executive Committee will review your application. Membership will be granted if your application is approved by the Executive Committee. Please note that the Executive Committee reserves the right to accept or reject any application. </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Membership_Application