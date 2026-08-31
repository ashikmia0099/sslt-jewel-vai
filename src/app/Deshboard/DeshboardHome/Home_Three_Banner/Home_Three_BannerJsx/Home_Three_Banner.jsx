'use client'

import { postfetchHomeThreeBanner } from "@/redux/features/Home/homeThreeBannerSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Swal from "sweetalert2";


function Home_Three_Banner() {


    const dispatch = useDispatch();
    const { home_three_banner_data } = useSelector(state => state.homeThreeBanner);
    const [selectedType, setSelectedType] = useState("BannerOne")


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        try {
            const resultAction = await dispatch(postfetchHomeThreeBanner(formData));

            if (postfetchHomeThreeBanner.fulfilled.match(resultAction)) {
                Swal.fire("Success", "Data post successfully", "success");
            } else {
                throw new Error(resultAction.payload);
            }
        } catch (err) {
            Swal.fire("Error", err.message, "error");
        }
    };


    return (
        <div className='m-10 px-10 py-10 border border-[#9EFF00] rounded-2xl'>
            <h1 className='text-4xl font-semibold uppercase text-center border-b pb-6 text-white'>Three Banner Post Form</h1>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <legend className="text-lg font-semibold pt-5 text-white pb-2">Choose Post Type </legend>
                    <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        name="Selected_type"
                        className="select w-full  text-lg" required>
                        <option disabled={true} className=" text-black text-lg">Select Post Type</option>
                        <option className="  text-lg">BannerOne</option>
                        <option className=" text-lg">BannerTWo</option>
                        <option className=" text-lg">BannerThree</option>
                    </select>
                </div>
                <div>
                    <legend className="text-lg font-semibold pt-5 text-white">Title Banner One  </legend>
                    <input type="text" name='BannerTitle' className="input w-full  text-lg" placeholder="Title Banner One" required />
                </div>
                <div>
                    <legend className="text-lg font-semibold pt-5 text-white">Description (max 100 word)</legend>
                    <textarea className="textarea w-full  text-lg" name='Description' placeholder="Description " rows={12} required></textarea>
                </div>
                <div>
                    <legend className="text-lg font-semibold pt-5 text-white">Choose Banner Image </legend>
                    <input type="file" name='Image' className="input w-full text-lg" placeholder="Choose Image" required />
                </div>
                <button type="submit" className='btn w-full bg-[#9EFF00] border-none text-black mt-10 text-lg font-semibold'>
                    Submit
                </button>

            </form>
        </div>
    )
}

export default Home_Three_Banner