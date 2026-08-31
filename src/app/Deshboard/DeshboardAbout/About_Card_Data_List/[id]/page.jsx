'use client'

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchAboutHeroDataGet, fetchAboutHeroDataPatch } from "@/redux/features/about/aboutHeroSlice";

function About_Image_Data_Update() {

    const dispatch = useDispatch();
    const { heroData } = useSelector(store => store.abouthero)
    const params = useParams();
    const id = params?.id;
    const [selectedType, setSelectedType] = useState('Text');
    const [singledata, setSingledata] = useState(null);

    useEffect(() => {
        dispatch(fetchAboutHeroDataGet());
    }, [dispatch]);

    useEffect(() => {
        if (heroData?.length && id) {
            const data = heroData.find(n => String(n.id) === String(id));
            if (data) {
                setSingledata(data);
                setSelectedType(data.selected_type);
            }
        }
    }, [heroData, id]);



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
            formData.append("shortOverview", form.shortOverview.value);
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
                fetchAboutHeroDataPatch({ id, formData })
            );
            if (fetchAboutHeroDataPatch.fulfilled.match(resultAction)) {
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
            <h1 className='text-4xl font-semibold uppercase text-center border-b pb-6 text-white'>All Image Update Form</h1>
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
                                <input type="text" name='title' defaultValue={singledata?.title} className="input w-full text-lg" placeholder="Title Text" required />
                            </div>
                            <div>
                                <legend className="text-lg font-semibold pt-5 text-white">Short overview  </legend>
                                <input type="text" name='shortOverview' defaultValue={singledata?.shortOverview} className="input w-full text-lg" placeholder="Short overview" required />
                            </div>
                            <div>
                                <legend className="fieldset-legend text-lg font-semibold pt-5">Description <span className=' text-[12px]'>(max 70 word)</span> </legend>
                                <textarea name='descripiton' defaultValue={singledata?.descripiton} className="textarea w-full" placeholder="Description" rows={12} ></textarea>
                            </div>
                        </>
                    )
                }
                {
                    selectedType === "Image" && (
                        <div className=" grid grid-cols-5 gap-6 ">
                            <div className=" col-span-4">
                                <legend className="text-lg font-semibold pt-5 text-black">Choose Image </legend>
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
export default About_Image_Data_Update