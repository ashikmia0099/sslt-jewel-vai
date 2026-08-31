'use client'

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getfetchHomeThreeBanner, patchfetchHomeThreeBanner } from "@/redux/features/Home/homeThreeBannerSlice";


function Home_Three_Banner() {


    const params = useParams();
    const id = params?.id;
    const [singledata, setSingleData] = useState(null);
    const dispatch = useDispatch();
    const { home_three_banner_data } = useSelector(state => state.homeThreeBanner);
    const [postType, setPostType] = useState("");


    useEffect(() => {
        if (!home_three_banner_data.length) {
            dispatch(getfetchHomeThreeBanner());
        } else if (id) {
            const data = home_three_banner_data.find(n => n.id === id);
            setSingleData(data);
            setPostType(data?.Selected_type || "");
        }
    }, [home_three_banner_data, id, dispatch]);



    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        try {
            const resultAction = await dispatch(patchfetchHomeThreeBanner({ id, formData }));

            if (patchfetchHomeThreeBanner.fulfilled.match(resultAction)) {
                Swal.fire("Success", "Data update successfully", "success");
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
                        value={postType}
                        onChange={(e) => setPostType(e.target.value)}
                        name="Selected_type"
                        className="select w-full text-black text-lg"
                        required>
                        <option disabled value="">Select Post Type</option>
                        <option value="BannerOne">BannerOne</option>
                        <option value="BannerTWo">BannerTWo</option>
                        <option value="BannerThree">BannerThree</option>
                    </select>
                </div>

                <div>
                    <legend className="text-lg font-semibold pt-5 text-black">Banner Title </legend>
                    <input defaultValue={singledata?.BannerTitle || ""} type="text" name='BannerTitle' className="input w-full text-black text-lg" placeholder="Banner Title" required />
                </div>
                <div>
                    <legend className="text-lg font-semibold pt-5 text-black">Description (max 100 word)</legend>
                    <textarea defaultValue={singledata?.Description || ""} className="textarea w-full text-black text-lg" name='Description' placeholder="Description " rows={12} required></textarea>
                </div>
                <div className=" grid grid-cols-5 gap-6 ">
                    <div className=" col-span-4">
                        <legend className="text-lg font-semibold pt-5 text-black">Choose Banner Image </legend>
                        <input type="file" name='Image' className="input w-full text-black text-lg" placeholder="Choose Image" required />
                    </div>
                    <div className=" col-span-1">
                        <img src={singledata?.Image} className=" h-40 w-40 rounded-2xl mt-5"></img>
                    </div>
                </div>
                <button type="submit" className='btn w-full bg-[#9EFF00] border-none text-black mt-10 text-lg font-semibold'>
                    Submit
                </button>
            </form>
        </div>
    )
}

export default Home_Three_Banner