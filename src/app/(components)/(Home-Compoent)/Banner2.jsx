
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IoArrowForwardSharp } from "react-icons/io5";
import Marquee from "react-fast-marquee";
import { useDispatch, useSelector } from "react-redux";
import { getfetchSecondBanner } from "@/redux/features/Home/SecondHeroSlice";
import "./localcss/banner1.css"

function Banner2() {
  const [isClient, setIsClient] = useState(false);

  const dispatch = useDispatch();
  const { secondBanner,loading } = useSelector(state => state.secondBanner)


  useEffect(() => {
    setIsClient(true);
  }, []);


  useEffect(() => {
    dispatch(getfetchSecondBanner())
  }, [dispatch])


  if (!isClient || loading) return null;

  return (
    <div className="pt-10 xl:pt-16 overflow-hidden">
      <Marquee
        speed={100}
        gradient={false}
        pauseOnHover={false}
        pauseOnClick={false}
      >
        {secondBanner.map((item, index) => (
          <div key={index} className="mx-4 w-[350px] md:w-[400px] shrink-0">
            {item.ImagePostType === "SingleImage" ? (
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src={item.SingleImage}
                  alt={item.Doctor_Name || "Doctor"}
                  className="h-[600px] w-full object-cover rounded-2xl"
                />
                <div className="absolute bottom-0 w-full px-4 pb-5 pt-60 bg-gradient-to-t from-[#232a38] to-transparent">
                  <h1 className="text-3xl font-bold text-white">
                    {item.Doctor_Name}
                  </h1>
                  <p className="text-white text-xl font-semibold">
                    {item.Doctor_Position}
                  </p>
                  <p className="text-white text-lg">
                    {item.Working_place}
                  </p>
                  <Link href={`/${item.id}`}>
                    <button className="btn mt-4 border-none h-12 px-5 rounded-full bg-[#84C2DB] text-black font-bold flex items-center">
                      Details <span className="pl-2"><IoArrowForwardSharp /></span>
                    </button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {item.Choose_Dual_Type_Image_1 && (
                  <img
                    src={item.Choose_Dual_Type_Image_1}
                    alt="Image 1"
                    className="h-[340px] w-full object-cover rounded-2xl"
                  />
                )}
                {item.Choose_Dual_Type_Image_2 && (
                  <img
                    src={item.Choose_Dual_Type_Image_2}
                    alt="Image 2"
                    className="h-[340px] w-full object-cover rounded-2xl"
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </Marquee>
    </div>
  );
}

export default Banner2;
