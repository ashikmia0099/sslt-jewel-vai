'use client';

import React, { useEffect, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import "./localcss/banner1.css"
import 'swiper/css';
import 'swiper/css/pagination';
import { Montserrat } from 'next/font/google';
import Link from 'next/link';
import { AuroraText } from '@/components/magicui/aurora-text';
import Mission from './Mission';
import { useDispatch, useSelector } from 'react-redux';
import { getfetchMedicalDesies } from '@/redux/features/Home/popularMedicalDesiesSlice';
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['500'],
});

function PopularMedicalDesies() {

  const dispatch = useDispatch();
  const { mediaclDesies } = useSelector(state => state.medicalDesies)

  useEffect(() => {
    dispatch(getfetchMedicalDesies())
  }, [dispatch])



  return (
    <div className="bg-gradient-to-b from-[#000000] to-[#000000] relative z-0">
      <div className="mt-5 md:mt-10 lg:mt-32">
        <div>
          <h1 className="text-3xl md:text-6xl lg:text-7xl xl:text-9xl font-extrabold capitalize leading-8 md:leading-16 lg:leading-20 xl:leading-36 text-center pt-20 goudy-bookletter-1911-regular">
            <AuroraText>Popular <br /> Medical Desices</AuroraText>
          </h1>
          <p className={` text-[16px] md:text-lg lg:text-xl font-semibold text-white text-center px-5 lg:px-[10%] xl:px-[15%] 2xl:px-[25%] py-5 lg:py-10 ${montserrat.className}`}>
            The following is a list of disorders and medical conditions that affect speech, language, swallowing, hearing, and cognitive-communication. This list is not exhaustive but includes key conditions commonly addressed by healthcare professionals in communication and hearing fields:
          </p>
        </div>
        <div className="mt-10 pb-20 ml-0 md:ml-20 lg:ml-20 xl:ml-40 2xl:ml-60 px-5 lg:px-0">
          <Swiper
            style={{
              '--swiper-pagination-color': '#fff',
            }}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1440: { slidesPerView: 4 },
            }}
            spaceBetween={20}
            loop={mediaclDesies.length > 3}
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
            }}
            observer={true}
            observeParents={true}
            modules={[Autoplay, Pagination]}
            className="mySwiper">
            {mediaclDesies.map((desiese) => (
              <SwiperSlide key={desiese.id} className="rounded-2xl bg-gradient-to-r from-[#8f8ee9] to-[#84C2DB] cursor-pointer">
                <Link href={`/${desiese.id}`} className="">
                  <div className="relative">
                    <img
                      src={desiese.Choose_Image}
                      alt="Slide"
                      className=" h-[500px] md:h-[650px] w-full rounded-xl object-cover"
                    />
                    <div className="px-5 absolute bottom-0 pb-7">
                      <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold py-2 xl:py-4 text-white capitalize goudy-bookletter-1911-regular">
                        {desiese.Desis_Name}
                      </h1>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="max-w-[1536px] mx-auto pb-14">
          <div className="grid lg:grid-cols-2 justify-between py-6 lg:py-20 gap-10 lg:gap-16 xl:text-20 2xl:gap-32 items-center">
            <div className="mb-3 lg:mb-10">
              <h1 className="pt-0 px-5 lg:pt-16 xl:pt-0 text-3xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold capitalize leading-8 md:leading-14 lg:leading-16 xl:leading-24 text-center goudy-bookletter-1911-regular">
                <AuroraText>
                  <div className="text-center xl:text-left">
                    <AuroraText>Communication</AuroraText>
                  </div>
                  <span className="text-center">And</span><br />
                  <span>Healthcare</span>
                </AuroraText>
              </h1>
            </div>
            <div className="flex items-center justify-end pl-0 lg:pl-20 xl:pl-28 2xl:pl-40">
              <div className="items-end right-1">
                <p className={`px-5  text-[16px] md:text-lg xl:text-xl font-semibold text-white text-center lg:text-left ${montserrat.className}`}>
                  Communication, Hearing, and Swallowing healthcare is a modern, evidence-based therapeutic profession focused on addressing a broad range of communication, auditory, and swallowing challenges across individuals of all ages. This field involves comprehensive assessments, evaluations, diagnosis, treatment planning, and the implementation of therapeutic interventions. Professionals in this area also provide guidance, recommendations, and support to improve overall health outcomes for individuals with communication, hearing, and swallowing difficulties.
                </p>
              </div>
            </div>
          </div>
        </div>
        <Mission />
      </div>
    </div>
  );
}

export default PopularMedicalDesies;
