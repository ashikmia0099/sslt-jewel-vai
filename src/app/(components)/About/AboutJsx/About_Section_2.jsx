'use client'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLastBannerDataGet } from '@/redux/features/about/aboutLastBanner';

function About_Section_2() {

  const dispatch = useDispatch();
  const { lastBannerData } = useSelector(state => state.aboutLastBanner)
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    dispatch(fetchLastBannerDataGet())
  }, [dispatch])

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };


  return (
    <div className='max-w-[1596px] mx-auto px-5  lg:px-10 mt-20  xl:mt-40'>
      <div className='grid lg:grid-cols-2 pb-20 gap-10 xl:gap-20 items-start'>
        <div className=' p-3 md:p-5 xl:p-10 rounded-2xl shadow-lg  hover:shadow-lg hover:shadow-[#404e5a93] shadow-[#598b9ea4]'>
          {
            lastBannerData.filter(item => item.selected_type === "Image").slice(-1).map((data) => (
              <img src={data.image} className=' h-full lg:h-[800px] w-full rounded-2xl' alt="" />
            ))
          }
        </div>
        <div className='flex flex-col gap-y-5'>
          {
            lastBannerData.filter(item => item.selected_type === "Text").slice(-4).map((data, index) => {
              const words = data.descripiton?.split(' ') || [];
              const shortText = words.slice(0, 30).join(' ');
              const remainingText = words.slice(30).join(' ');
              const isExpanded = expandedIndex === index;
              return (
                <div key={index}>
                  <h2 className=' text-lg  xl:text-2xl capitalize font-bold btn bg-[#84C2DB] border-none rounded-full px-5 text-black shadow-md hover:shadow-md hover:shadow-[#404e5a93] shadow-[#598a9e] goudy-bookletter-1911-regular'>
                    {data.title}
                  </h2>
                  <p className=' text-sm md:text-[16px] lg:text-sm xl:text-lg font-medium pt-10'>
                    {shortText}
                    {!isExpanded && words.length > 30 && '... '}
                    {isExpanded && (
                      <span className='inline'>
                        {' '}
                        {remainingText}
                      </span>
                    )}
                    {words.length > 30 && (
                      <button
                        onClick={() => toggleExpand(index)}
                        className='text-blue-500 underline ml-2 cursor-pointer'>
                        {isExpanded ? 'See less' : 'See more'}
                      </button>
                    )}
                  </p>
                </div>
              )
            }
            )}
        </div>
      </div>
    </div>
  );
}

export default About_Section_2;
