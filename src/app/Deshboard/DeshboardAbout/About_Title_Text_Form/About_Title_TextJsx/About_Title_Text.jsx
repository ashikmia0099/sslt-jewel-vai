'use client'

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { fetchAboutHeroDataPost } from "@/redux/features/about/aboutHeroSlice";


function About_Title_Text() {


    const [selectedType, setSelectedType] = useState("Text")
    const dispatch = useDispatch();
    const { heroData } = useSelector(store => store.abouthero)

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        try {
            const resultAction = await dispatch(fetchAboutHeroDataPost(formData));

            if (fetchAboutHeroDataPost.fulfilled.match(resultAction)) {
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
            <h1 className='text-4xl font-semibold uppercase text-center border-b pb-6 text-white'>Title Text Post Form</h1>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <legend className="text-lg font-semibold pt-5 text-white pb-2">Choose Post Type </legend>
                    <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        name="selected_type"
                        className="select w-full  text-lg" required>
                        <option disabled={true} className=" text-black text-lg">Select Post Type</option>
                        <option className=" text-lg">Text</option>
                        <option className=" text-lg">Image</option>
                    </select>
                </div>
                {
                    selectedType === "Text" && (
                        <>
                            <div>
                                <legend className="text-lg font-semibold pt-5 text-white">Title Text One  </legend>
                                <input type="text" name='title' className="input w-full text-lg" placeholder="Title Text" required />
                            </div>
                            <div>
                                <legend className="text-lg font-semibold pt-5 text-white">Short overview  </legend>
                                <input type="text" name='shortOverview' className="input w-full text-lg" placeholder="Short overview" required />
                            </div>
                            <div>
                                <legend className="fieldset-legend text-lg font-semibold pt-5">Description <span className=' text-[12px]'>(max 70 word)</span> </legend>
                                <textarea name='descripiton' className="textarea w-full" placeholder="Description" rows={12} ></textarea>
                            </div>
                        </>
                    )
                }
                {
                    selectedType === "Image" && (
                        <div>
                            <legend className="fieldset-legend text-lg font-semibold pt-5">Choose your image <span className=' text-[12px]'></span> </legend>
                            <input type="file" name='image' className="input w-full text-lg" placeholder="Title Text Two" required />
                        </div>
                    )
                }


                <button type="submit" className='btn w-full bg-[#9EFF00] border-none text-black mt-10 text-lg font-semibold'>
                    Submit
                </button>
            </form>
        </div>
    )
}

export default About_Title_Text