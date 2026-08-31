
"use client";

import { AuroraText } from '../../../../components/magicui/aurora-text'
import { Montserrat } from 'next/font/google';
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['600',],
});
import React, { useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';

import About_Section_3 from './About_Section_3';
import About_Section_2 from './About_Section_2';
import { Marquee } from "../../../../components/magicui/marquee";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAboutHeroDataGet } from '@/redux/features/about/aboutHeroSlice';

const ReviewCard = ({ img }) => {
  return (
    <figure
      className={cn(
        "relative h-96 w-full md:w-80 lg:w-full xl:w-80 overflow-hidden rounded-xl",
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}>
      <img src={img} alt="Marquee slide" className="w-full h-full object-cover rounded-lg" />
    </figure>
  );
};


function About_Section_1() {


  const dispatch = useDispatch();
  const { heroData } = useSelector(state => state.abouthero)

  useEffect(() => {
    dispatch(fetchAboutHeroDataGet())
  }, [dispatch])


  const selectedTypeTwoImages = heroData.filter((item) => item.selected_type === 'Image').slice(-20);

  // Split into two separate rows
  const mid = Math.ceil(selectedTypeTwoImages.length / 2);
  const firstRow = selectedTypeTwoImages.slice(0, mid);
  const secondRow = selectedTypeTwoImages.slice(mid);

  return (

    <>
      <style jsx>{`
    .desc-scroll::-webkit-scrollbar {
      display: none;
    }
    .desc-scroll {
      -ms-overflow-style: none;  
      scrollbar-width: none;   
    }
  `}
      </style>

      <div className='bg-gradient-to-t from-[#ffffff] via-[#ffffff] to-[#ffffff83] pb-10 md:pb-16  xl:pb-32'>
        <div className='max-w-[1596px] mx-auto px-5  lg:px-10 lg:-mt-28 lg:pt-32 '>
          <div className=' grid md:grid-cols-2 md:pb-40 lg:pb-20 xl:pb-40 pt-10 lg:pt-20 gap-20 md:gap-5 lg:gap-10 xl:gap-10 '>
            {
              heroData.filter(item => item.selected_type === 'Text').slice(-1).map((data) => (
                <div className='p-3 lg:p-10 rounded-2xl h-full lg:h-[630px] bg-[#C6E2EF] backdrop-blur-sm hover:shadow-lg shadow-[#404e5a] flex flex-col'>
                  <div>
                    <h1 className={`text-sm lg:text-[16px] xl:text-xl text-center lg:inline-flex font-bold capitalize leading-10 bg-[#84C2DB] border-none rounded-full lg:px-5 shadow-none text-black goudy-bookletter-1911-regular`}>
                      {data.title}
                    </h1>
                    <h2 className={`text-lg xl:text-2xl font-bold capitalize leading-6 lg:leading-7 xl:leading-8 pt-10 pb-10 text-center lg:text-left goudy-bookletter-1911-regular`}>
                      <AuroraText>{data.shortOverview}</AuroraText>
                    </h2>
                  </div>
                  <div className="flex-1 overflow-y-auto desc-scroll">
                    <p className='text-sm lg:text-lg font-medium text-center lg:text-left'>
                      {data.descripiton}
                    </p>
                  </div>
                </div>
              ))
            }
            <div className="relative md:flex h-[550px] lg:h-[630px] w-full md:flex-row items-center justify-center overflow-hidden">
              <div>
                <Marquee pauseOnHover vertical className="[--duration:10s]">
                  {firstRow.map((item) => (
                    <ReviewCard key={item.id} img={item.image} />
                  ))}
                </Marquee>
              </div>
              <div className=' block md:hidden lg:block'>
                <Marquee reverse pauseOnHover vertical className="[--duration:10s] ">
                  {secondRow.map((item) => (
                    <ReviewCard key={item.id} img={item.image} />
                  ))}
                </Marquee>
              </div>
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background"></div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
            </div>
          </div>
        </div>
        <About_Section_3></About_Section_3>
        <About_Section_2></About_Section_2>
      </div>

    </>

  )
}

export default About_Section_1