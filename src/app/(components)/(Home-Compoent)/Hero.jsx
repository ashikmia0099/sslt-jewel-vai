'use client';

import React, { useEffect, useState } from 'react';
import { Montserrat } from 'next/font/google';
import './localcss/banner1.css';
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from 'react-redux';
import { AuroraText } from '@/components/magicui/aurora-text';
import { Marquee } from '@/components/magicui/marquee';
import { fetchHeroData } from '@/redux/features/Home/HeroSlice';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['500'],
});

const ReviewCard = ({ img }) => {
  return (
    <figure
      className={cn(
        "relative h-96 w-full md:w-80 lg:w-full xl:w-80 overflow-hidden rounded-xl",
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <img src={img} alt="Marquee slide" className="w-full h-full object-cover rounded-lg" />
    </figure>
  );
};

export function Hero() {


  const dispatch = useDispatch();
    const { hero_data } = useSelector(state => state.banner)

    useEffect(() => {
        dispatch(fetchHeroData())
    }, [dispatch])



  const selectedTypeTwoImages = hero_data
    .filter(item => item.postType === 'Image')
    .slice(-20);

  const mid = Math.ceil(selectedTypeTwoImages.length / 2);
  const firstRow = selectedTypeTwoImages.slice(0, mid);
  const secondRow = selectedTypeTwoImages.slice(mid);

  return (
    <div className='lg:pt-10 pb-10 -mt-10 md:-mt-20 lg-mt-24'>
      <div className='max-w-[1536px] mx-auto lg:pt-16'>
        <div className='grid items-center justify-center lg:grid-cols-2 h-full xl:h-[90vh] 2xl:h-[70vh]'>

          {/* Left Side Text Section */}
          {
            hero_data
              .filter(item => item.postType === 'Text')
              .slice(-1)
              .map((data) => (
                <div className='pt-20' key={data._id}>
                  <h1 className={`text-3xl md:text-5xl lg:text-6xl xl:text-6xl 2xl:text-7xl font-extrabold capitalize leading-8 md:leading-12 lg:leading-14 xl:leading-16 2xl:leading-20 goudy-bookletter-1911-regular text-center lg:text-left px-5`}>
                    <AuroraText className='text-[#84C2DB]'>{data.title}</AuroraText>
                  </h1>
                  <p className={`text-[16px] md:text-lg lg:text-lg xl:text-xl px-5 font-bold mt-10 text-center lg:text-left pb-8 lg:pb-0 ${montserrat.className}`}>
                    {data.shortOverview}
                  </p>
                </div>
              ))
          }

          {/* Right Side Marquee Section */}
          <div className="relative md:flex h-[550px] lg:h-[500px] w-full md:flex-row items-center justify-center overflow-hidden">
            <Marquee pauseOnHover vertical className="[--duration:10s]">
              {firstRow.map((item) => (
                <ReviewCard key={item.id} img={item.image} />
              ))}
            </Marquee>
            <Marquee reverse pauseOnHover vertical className="[--duration:10s]">
              {secondRow.map((item) => (
                <ReviewCard key={item.id} img={item.image} />
              ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background"></div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
          </div>
        </div>
      </div>
    </div>
  );
}