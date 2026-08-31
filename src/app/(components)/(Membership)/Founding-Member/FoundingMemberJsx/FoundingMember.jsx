import React from 'react'

import { AuroraText } from '../../../../../components/magicui/aurora-text';
import { Montserrat } from 'next/font/google';


const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['600'],
});

export default function FoundingMember() {
  return (
    <div className='max-w-[1596px] mx-auto bg-white'>
      <div className='border-b-2'>
        <h1 className={`text-3xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold uppercase leading-10 md:leading-14 lg:leading-20 xl:leading-28 text-center px-5 md:px-[10%] xl:px-[20%] pt-7 lg:pt-16`}>
          <AuroraText>Our All Update & Latest news</AuroraText>
        </h1>
        <p className={`px-5 md:px-[10%] xl:px-[15%] text-[16px] md:text-lg xl:text-2xl leading-7 xl:leading-9 text-center py-10 ${montserrat.className}`}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam odit nam laudantium officiis corporis earum suscipit quia repudiandae enim voluptate, eaque repellendus asperiores molestias facere, sit ducimus odio accusantium quidem.
        </p>
      </div>
      <div className='grid lg:grid-cols-7 pt-5 lg:pt-20 pb-20'>
        {/* grid  left section */}
        <div className=' lg:col-span-2  px-5 hidden lg:block'>
          <h1 className=' text-2xl font-bold  py-2 pb-6'>Table Of Content : </h1>
          <div className=' pl-2 pr-6 space-y-4'>
            <h1 className=' text-sm text-[] lg:text-lg font-semibold border-b-2 text-[#B6B3B1] border-black py-2 px-2'>Advocacy Support</h1>
            <h1 className=' text-sm lg:text-lg font-semibold border-b-2 text-[#B6B3B1] border-black py-2 px-2'>Public Relations & Marketing Tools</h1>
            <h1 className=' text-sm lg:text-lg font-semibold border-b-2 text-[#B6B3B1] border-black py-2 px-2'>Networking Opportunities</h1>
            <h1 className=' text-sm lg:text-lg font-semibold border-b-2 text-[#B6B3B1] border-black py-2 px-2'>Educational Programs & Community Support</h1>
            <h1 className=' text-sm lg:text-lg font-semibold border-b-2 text-[#B6B3B1] border-black py-2 px-2'>Access to Professional Resources</h1>
            <h1 className=' text-sm lg:text-lg font-semibold border-b-2 text-[#B6B3B1] border-black py-2 px-2'>News & Job Alerts</h1>
            <h1 className=' text-sm lg:text-lg font-semibold border-b-2 text-[#B6B3B1] border-black py-2 px-2'>Leadership Development</h1>
            <h1 className=' text-sm lg:text-lg font-semibold border-b-2 text-[#B6B3B1] border-black py-2 px-2'>Professional Certification & Accreditation</h1>
            <h1 className=' text-sm lg:text-lg font-semibold border-b-2 text-[#B6B3B1] border-black py-2 px-2'>Discounted Access to Conferences & Workshops</h1>
            <h1 className=' text-sm lg:text-lg font-semibold border-b-2 text-[#B6B3B1] border-black py-2 px-2'>Legal & Professional Advice</h1>
            <h1 className=' text-sm lg:text-lg font-semibold border-b-2 text-[#B6B3B1] border-black py-2 px-2'>Mentorship Programs</h1>
            <h1 className=' text-sm lg:text-lg font-semibold border-b-2 text-[#B6B3B1] border-black py-2 px-2'>Research Grant & Funding Opportunities</h1>
            <h1 className=' text-sm lg:text-lg font-semibold border-b-2 text-[#B6B3B1] border-black py-2 px-2'>Recognition & Awards</h1>
            <h1 className=' text-sm lg:text-lg font-semibold border-b-2 text-[#B6B3B1] border-black py-2 px-2'>Collaborative Research & Projects</h1>
            <h1 className=' text-sm lg:text-lg font-semibold border-b-2 text-[#B6B3B1] border-black py-2 px-2'>International Networking and Opportunities</h1>
          </div>
        </div>
        {/* grid middle section */}
        <div className=' lg:col-span-5 px-5 lg:px-8 overflow-auto pt-2'>
          <h3 className=' text-lg md:text-xl lg:text-2xl font-bold pb-5'>Advocacy Support </h3>
          <p className=' text-sm  lg:text-lg font-semibold'> SSLT’s advocacy initiatives keep you informed about critical issues affecting your profession and those you serve. We ensure your voice is heard in policy discussions, promoting the rights and recognition of your field </p>
          <h3 className='  text-lg md:text-xl lg:text-2xl font-bold py-3 md:py-5'>Public Relations & Marketing Tools </h3>
          <p className=' text-sm lg:text-lg font-semibold'>SSLT provides a range of tools and resources to help you effectively communicate the importance of communication, hearing, and swallowing healthcare to consumers, other healthcare professionals, and policymakers. </p>
          <h3 className='text-lg md:text-xl lg:text-2xl font-bold py-3 md:py-5'>Networking Opportunities </h3>
          <p className=' text-sm lg:text-lg font-semibold'>Expand your professional connections through SSLT’s local chapters and special-interest groups, fostering collaboration, knowledge exchange, and career growth.</p>
          <h3 className=' text-lg md:text-xl lg:text-2xl font-bold py-3 md:py-5'>Educational Programs & Community Support </h3>
          <p className=' text-sm lg:text-lg font-semibold'>Access SSLT’s educational resources, including workshops, seminars, and peer support from a dedicated community of professionals, offering strategies and best practices to enhance your skills and knowledge. </p>
          <h3 className=' text-lg md:text-xl lg:text-2xl font-bold py-3 md:py-5'>Access to Professional Resources </h3>
          <p className=' text-sm lg:text-lg font-semibold'>SSLT’s website serves as a hub for essential resources, providing updates, research, and professional guidelines to support your practice and ensure you stay informed on the latest developments.</p>
          <h3 className=' text-lg md:text-xl lg:text-2xl font-bold py-3 md:py-5'>News & Job Alerts </h3>
          <p className=' text-sm lg:text-lg font-semibold'> Stay up to date with the latest news in communication, hearing, and swallowing healthcare, as well as job opportunities and features tailored to your profession, delivered directly to you. </p>
          <h3 className=' text-lg md:text-xl lg:text-2xl font-bold py-3 md:py-5'>Leadership Development </h3>
          <p className=' text-sm lg:text-lg font-semibold'>SSLT is committed to developing the next generation of leaders in communication, hearing, and swallowing healthcare. We provide members and students with opportunities for personal and professional growth to shape the future of the profession.</p>
          <h3 className=' text-lg md:text-xl lg:text-2xl font-bold py-3 md:py-5'>Professional Certification & Accreditation </h3>
          <p className=' text-sm lg:text-lg font-semibold'>Members can receive support for certification and accreditation, helping them meet national and international standards and enhancing their professional credibility.</p>
          <h3 className=' text-lg md:text-xl lg:text-2xl font-bold py-3 md:py-5'>Discounted Access to Conferences & Workshops </h3>
          <p className=' text-sm lg:text-lg font-semibold'>SSLT members enjoy exclusive discounts for attending conferences, seminars, and workshops, where they can learn from experts and stay updated on the latest research and practices.</p>
          <h3 className=' text-lg md:text-xl lg:text-2xl font-bold py-3 md:py-5'>Legal & Professional Advice</h3>
          <p className=' text-sm lg:text-lg font-semibold'>SSLT provides legal support and professional advice on matters related to the practice of communication, hearing, and swallowing healthcare, helping members navigate any professional or legal challenges. </p>
          <h3 className=' text-lg md:text-xl lg:text-2xl font-bold py-3 md:py-5'>Mentorship Programs </h3>
          <p className=' text-sm lg:text-lg font-semibold'>Members can participate in mentorship programs, either as mentors or mentees, to gain guidance, share experiences, and advance their professional journey. </p>
          <h3 className=' text-lg md:text-xl lg:text-2xl font-bold py-3 md:py-5'>Research Grant & Funding Opportunities</h3>
          <p className=' text-sm lg:text-lg font-semibold'>SSLT supports members with access to research grants, funding, and scholarships to encourage and fund clinical research and innovative projects within the field.</p>
          <h3 className=' text-lg md:text-xl lg:text-2xl font-bold py-3 md:py-5'>Recognition & Awards</h3>
          <p className=' text-sm lg:text-lg font-semibold'>Members are eligible for SSLT’s annual awards and recognition programs that honor exceptional contributions to the field of communication, hearing, and swallowing healthcare.</p>
          <h3 className=' text-lg md:text-xl lg:text-2xl font-bold py-3 md:py-5'>Collaborative Research & Projects</h3>
          <p className=' text-sm lg:text-lg font-semibold'>SSLT members have the opportunity to participate in collaborative research, public health projects, and government initiatives, contributing to the advancement of their field on a national level. </p>
          <h3 className=' text-lg md:text-xl lg:text-2xl font-bold py-3 md:py-5'>International Networking and Opportunities</h3>
          <p className=' text-sm lg:text-lg font-semibold'>SSLT facilitates international collaboration by connecting members with global professionals, opening doors to international career opportunities, conferences, and partnerships. </p>
        </div>
      </div>
    </div>
  )
}
