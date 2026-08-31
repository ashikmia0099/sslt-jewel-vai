'use client';

import { fetchGallaryDataGet } from '@/redux/features/gallary/gallarySlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Gallary() {

    const dispatch = useDispatch();
    const { gallaryImage } = useSelector(state => state.gallary)

    useEffect(() => {
        dispatch(fetchGallaryDataGet())
    }, [dispatch])


    return (
        <div className="max-w-[1596px] mx-auto bg-white pt-5  lg:pt-20 px-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 xl:grid-cols-12 gap-4 pb-16 items-center justify-center">
                {gallaryImage.map((item, index) => (
                    <React.Fragment key={item.id || index}>
                        <div style={{ gridColumn: `span ${item.width} / span ${item.width}` }} className="rounded-xl">
                            <img src={item.image} alt="main" className="w-full h-80 md:h-[450px] lg:object-cover xl:object-fill rounded-2xl" />
                        </div>
                        {item.dynamicDescriptions?.map((desc, i) => (
                            <div key={i} style={{ gridColumn: `span ${desc.width} / span ${desc.width}` }} className="rounded-xl">
                                <img src={desc.image} alt="dynamic" className="w-full h-80  md:h-[450px] lg:object-cover xl:object-fill rounded-2xl" />
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}

export default Gallary;
