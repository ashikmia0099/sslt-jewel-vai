'use client';

import Image from 'next/image';
import { AuroraText } from '../../../../components/magicui/aurora-text';
import { Montserrat } from 'next/font/google';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewsDataGet } from '@/redux/features/news/newsSlice';

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['600'],
});

function News() {

     const dispatch = useDispatch();
    const { allNews } = useSelector(state => state.news);
    const [visibleCount, setVisibleCount] = useState(12);
    const [selectedNews, setSelectedNews] = useState(null);

    // fetch news on mount
    useEffect(() => {
        dispatch(fetchNewsDataGet());
    }, [dispatch]);
    const processedNews = allNews
        ?.map((item, index) => ({ id: index + 1, ...item }))
        ?.sort((a, b) => new Date(b.PostTime) - new Date(a.PostTime));


    return (
      <div className='max-w-[1596px] mx-auto bg-white'>
            <div className='border-b-2'>
                <h1 className={`text-3xl md:text-6xl lg:text-6xl xl:text-8xl font-extrabold capitalize leading-10 md:leading-14 lg:leading-20 xl:leading-28 text-center px-5 md:px-[10%] xl:px-[20%] pt-7 lg:pt-16 goudy-bookletter-1911-regular`}>
                    <AuroraText>Our All Update & Latest News</AuroraText>
                </h1>
                <p className={`px-5 md:px-[10%] xl:px-[15%] text-[16px] md:text-lg xl:text-2xl leading-7 xl:leading-9 text-center py-10 ${montserrat.className}`}>
                    Stay informed with the latest news, updates, and insights from SSLT. Discover new events, announcements, and stories that impact your professional journey in speech, language, and hearing healthcare.
                </p>
            </div>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-14 gap-y-14 pb-10 pt-20 px-5'>
                {processedNews?.slice(0, visibleCount).map(news => (
                    <div key={news.id}>
                        <div className='relative'>
                            <img
                                src={news.image || '/placeholder.jpg'}
                                alt={news.newsTitle || 'News Image'}
                                className='h-[250px] w-full object-cover rounded-t-md'
                            />
                            <div className={`absolute z-20 items-center justify-center rounded-md h-24 w-24 bg-[#84c2dbd2] flex flex-col top-4 right-4 font-bold text-black ${montserrat.className}`}>
                                <span className='text-5xl'>{new Date(news.createdAt).getDate()}</span>
                                <span className='text-lg'>{new Date(news.createdAt).toLocaleString('en-US', { month: 'short' })}</span>
                            </div>
                        </div>

                        <div className='py-3 text-center bg-[#84c2db4f] px-3 h-[200px] flex flex-col justify-between rounded-b-md'>
                            <h1 className={`pl-1 pr-2 text-xl font-bold pt-4 capitalize ${montserrat.className}`}>
                                {news.newsTitle}
                            </h1>
                            <div className='pb-3'>
                                <button
                                    onClick={() => setSelectedNews(news)}
                                    className='btn rounded-full bg-[#84C2DB] border-none shadow-none px-10 text-xl font-bold text-black'>
                                    See More
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {visibleCount < processedNews?.length && (
                <div className='flex justify-center pb-16'>
                    <button
                        onClick={() => setVisibleCount(prev => Math.min(prev + 3, processedNews.length))}
                        className='btn h-14 px-10 shadow-2xs rounded-full mt-5 bg-[#84C2DB] border-none text-black text-lg font-bold flex items-center justify-center'>
                        See More
                    </button>
                </div>
            )}
            {selectedNews && (
                <div className="modal modal-open" role="dialog">
                    <div className="bg-white modal-box">
                        <h3 className="text-lg font-bold">{selectedNews.newsTitle}</h3>
                        <p className="py-4">{selectedNews.description || 'No additional description available.'}</p>
                        <div className="modal-action">
                            <button
                                onClick={() => setSelectedNews(null)}
                                className='btn h-10 px-10 shadow-2xs rounded-full mt-5 bg-[#84C2DB] border-none text-black text-lg font-bold flex items-center justify-center'>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default News;
