'use client'

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchLastBannerDataGet, fetchLastBannerDataPatch } from "@/redux/features/about/aboutLastBanner";


function Deshboard_Last_Banner_Image_List() {

    const dispatch = useDispatch();
    const { lastBannerData } = useSelector(store => store.aboutLastBanner)
    const params = useParams();
    const id = params?.id;
    const [selectedType, setSelectedType] = useState('Text');
    const [singledata, setSingledata] = useState(null);


    useEffect(() => {
        dispatch(fetchLastBannerDataGet());
    }, [dispatch]);

    useEffect(() => {
        if (lastBannerData?.length && id) {
            const data = lastBannerData.find(n => String(n.id) === String(id));

            if (data) {
                setSingledata(data);
                setSelectedType(data.selected_type);
            }
        }
    }, [lastBannerData, id]);



const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!singledata?.id) {
        Swal.fire("Error", "No data found", "error");
        return;
    }

    const form = e.target;

    const formData = new FormData();

    formData.append("selected_type", selectedType);

    if (selectedType === "Text") {
        formData.append("title", form.title.value);
        formData.append("descripiton", form.descripiton.value);
    }

    if (selectedType === "Image") {
        const file = form.image.files[0];

        if (file) {
            formData.append("image", file);
        }
    }

  
    try {
        const resultAction = await dispatch(
            fetchLastBannerDataPatch({ id, formData })
        );

        if (fetchLastBannerDataPatch.fulfilled.match(resultAction)) {
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
            <h1 className='text-4xl font-semibold uppercase text-center border-b pb-6 text-white'>About Page Banner Last Image Update</h1>
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
                                <legend className="text-lg font-semibold pt-5 text-white">Title  </legend>
                                <input defaultValue={singledata?.title || ""} type="text" name='title' className="input w-full text-lg" placeholder="Title" required />
                            </div>
                            <div>
                                <legend className="fieldset-legend text-lg font-semibold pt-5 text-white">Description <span className=' text-[12px]'>(max 70 word)</span> </legend>
                                <textarea defaultValue={singledata?.descripiton || ""} name='descripiton' className="textarea w-full " placeholder="Description" rows={12} ></textarea>
                            </div>
                        </>
                    )
                }
                {
                    selectedType === "Image" && (
                        <div className=" grid grid-cols-5 gap-6 ">
                            <div className=" col-span-4">
                                <legend className="text-lg font-semibold pt-5 text-white">Choose Banner Image </legend>
                                <input type="file" name='image' className="input w-full text-black text-lg" placeholder="Choose Image" required />
                            </div>
                            <div className=" col-span-1">
                                <img src={singledata?.image} className=" h-40 w-40 rounded-2xl mt-5"></img>
                            </div>
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

export default Deshboard_Last_Banner_Image_List