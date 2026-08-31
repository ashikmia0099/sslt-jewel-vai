'use client'

import { useState } from "react";
import Swal from "sweetalert2";
import { TiPlus } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { fetchThreeBannerDataPost } from "@/redux/features/about/aboutThreeBannerSlice";


function About_Three_Banner_Form() {


    const [selectedType, setSelectedType] = useState("BannerOne")

    const dispatch = useDispatch();
    const { threeBannerData } = useSelector(store => store.aboutThreeBanner)

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        try {
            const resultAction = await dispatch(fetchThreeBannerDataPost(formData));

            if (fetchThreeBannerDataPost.fulfilled.match(resultAction)) {
                Swal.fire("Success", "Banner data post successfully", "success");
            } else {
                throw new Error(resultAction.payload);
            }

        } catch (err) {
            Swal.fire("Error", err.message, "error");
        }
    };




    return (
        <div className='m-10 px-10 py-10 border border-[#9EFF00] rounded-2xl'>
            <h1 className='text-4xl font-semibold uppercase text-center border-b pb-6 text-white'>About Page Three Banner Post Form</h1>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <legend className="text-lg font-semibold pt-5 text-white pb-2">Choose Post Type </legend>
                    <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        defaultValue="Pick a color"
                        name="selected_type"
                        className="select w-full  text-lg" required>
                        <option disabled={true} className=" text-black text-lg">Select Post Type</option>
                        <option className="  text-lg">BannerOne</option>
                        <option className=" text-lg">BannerTWo</option>
                        <option className=" text-lg">BannerThree</option>
                    </select>
                </div>
                <div>
                    <legend className="text-lg font-semibold pt-5 text-white">Banner Title  </legend>
                    <input type="text" name='BannerTitle' className="input w-full text-lg" placeholder="Banner Title" required />
                </div>
                <div>
                    <legend className="text-lg font-semibold pt-5 text-white">Description (max 100 word)</legend>
                    <textarea className="textarea w-full text-lg" name='Description' placeholder="Description " rows={12} required></textarea>
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

export default About_Three_Banner_Form