'use client'

import { postfetchHeroData } from "@/redux/features/Home/HeroSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

function Home_Banner_Form() {
    
    const [posttype, setPostType] = useState("Text")
    const dispatch = useDispatch();
    const { hero_data } = useSelector(state => state.banner)



    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        try {
            const resultAction = await dispatch(postfetchHeroData(formData));

            if (postfetchHeroData.fulfilled.match(resultAction)) {
                Swal.fire("Success", "Banner data update successfully", "success");
            } else {
                throw new Error(resultAction.payload);
            }
        } catch (err) {
            Swal.fire("Error", err.message, "error");
        }
    };


    return (
        <div className='m-10 px-10 py-10 border border-[#9EFF00] rounded-2xl'>
            <h1 className='text-4xl font-semibold uppercase text-center border-b pb-6 text-white'>Home Banner Form</h1>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <legend className="text-lg font-semibold pt-5 text-white pb-2">Choose Post Type </legend>
                    <select
                        value={posttype}
                        onChange={(e) => setPostType(e.target.value)}
                        name="postType"
                        className="select w-full text-lg" required>
                        <option disabled={true} className="  text-lg">Select Post Type</option>
                        <option className=" text-lg text-black">Text</option>
                        <option className=" text-lg text-black">Image</option>
                    </select>
                </div>
                {
                    posttype === "Text" && (
                        <>
                            <div>
                                <legend className="text-lg font-semibold pt-5 text-white">Title </legend>
                                <input type="text" name='title' className="input w-full text-lg" placeholder=" Title" required />
                            </div>
                            <div>
                                <legend className="text-lg font-semibold pt-5 text-white">Short Overview</legend>
                                <textarea className="textarea w-full text-lg text-black" name='shortOverview' placeholder="Over View " rows={12} required></textarea>
                            </div>
                        </>
                    )
                }
                {
                    posttype === "Image" && (
                        <div>
                            <legend className="text-lg font-semibold pt-5 text-white">Choose Event Image 1</legend>
                            <input type="file" name='image' className="input w-full text-lg" placeholder="Choose Image" required />
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

export default Home_Banner_Form