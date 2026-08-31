
'use client'

import { useEffect, useState } from "react";

import Swal from "sweetalert2";

import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getfetchMissionVissionObject, patchfetchMissionVissionObject, postfetchMissionVissionObject } from "@/redux/features/Home/missionVissionObjectSlice";


function Page() {

    const dispatch = useDispatch();
    const { mission_vission_object } = useSelector(state => state.misssionVissionObject)

    const params = useParams();
    const id = params?.id;

    const [posttype, setPostType] = useState("");
    const [increseDescripton, setincreseDescripton] = useState([]);
    const [singleData, setSingleData] = useState(null);

    useEffect(() => {
        if (!mission_vission_object.length) {
            dispatch(getfetchMissionVissionObject());
        } else if (id) {
            const data = mission_vission_object.find(n => n.id === id);
            setSingleData(data);
            if (data?.postType) {
                setPostType(data.postType);
            }
        }
    }, [mission_vission_object, id, dispatch]);

    if (id && !singleData) return <p className='text-white'>Loading...</p>;



    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData();

        formData.append("postType", form.postType.value);

        if (form.postType.value === "Text") {
            formData.append("Title", form.Title.value);
            formData.append("Description", form.Description.value);
            const dynamicDescriptions = increseDescripton.map((_, index) => ({
                title: form[`title${index}`]?.value || "",
                description: form[`description${index}`]?.value || "",
            }));
            formData.append("dynamicDescriptions", JSON.stringify(dynamicDescriptions));
        }

        if (form.postType.value === "Image") {
            const imageFile = form.image?.files?.[0];
            if (imageFile) formData.append("image", imageFile);
            else formData.append("existingImage", singleData.Image);
        }

        try {
            const resultAction = await dispatch(patchfetchMissionVissionObject({ id, formData }));

            if (patchfetchMissionVissionObject.fulfilled.match(resultAction)) {
                Swal.fire("Success", "Data updated successfully", "success");
            } else {
                throw new Error(resultAction.payload);
            }
        } catch (err) {
            Swal.fire("Error", err.message, "error");
        }
    };


    return (
        <div className='m-10 px-10 py-10 border border-[#9EFF00] rounded-2xl'>
            <h1 className='text-4xl font-semibold uppercase text-center border-b pb-6 text-white'>Mission Vission Update Form</h1>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <legend className="text-lg font-semibold pt-5 text-white pb-2">Choose Post Type </legend>
                    <select
                        value={posttype}
                        onChange={(e) => setPostType(e.target.value)}
                        defaultValue="Pick a color"
                        name="postType"
                        className="select w-full text-lg" required>
                        <option disabled={true} className="  text-lg">Select Post Type</option>
                        <option className="  text-lg">Text</option>
                        <option className="  text-lg">Image</option>
                    </select>
                </div>
                {
                    posttype === "Text" && (

                        <>
                            <div>
                                <legend className="text-lg font-semibold pt-5 text-white">Title </legend>
                                <input defaultValue={singleData?.Title} type="text" name='Title' className="input w-full text-lg" placeholder=" Title" required />
                            </div>
                            <div>
                                <legend className="text-lg font-semibold pt-5 text-white">Short Overview</legend>
                                <textarea defaultValue={singleData?.Description} className="textarea w-full text-lg" name='Description' placeholder="Over View " rows={12} required></textarea>
                            </div>
                          

                            {singleData.dynamicDescriptions?.map((section, index) => (
                                <div key={section.id} className='py-10 pb-16'>
                                    <div>
                                        <h4 className='text-xl font-semibold btn bg-[#9EFF00] text-black rounded-full px-10'>
                                            Section {index + 1}
                                        </h4>
                                    </div>
                                    <div className='grid grid-cols-2 gap-3'>
                                        <div>
                                            <legend className="text-lg font-semibold pt-5 text-white">Description Title</legend>
                                            <input defaultValue={section?.title} type="text" name={`title${index}`} className="input w-full text-lg " placeholder="Description Title" required />
                                        </div>
                                    </div>
                                    <div>
                                        <legend className="text-lg font-semibold pt-5 text-white">Description</legend>
                                        <textarea defaultValue={section?.description} className="textarea w-full  text-lg" name={`descriptionDescription_${index}`} placeholder="Description" rows={12} required></textarea>
                                    </div>
                                </div>
                            ))}
                        </>
                    )
                }
                {
                    posttype === "Image" && (
                        <div className=" flex items-center justify-between py-5">
                            <div>
                                <legend className="text-lg font-semibold pt-5 text-white">Choose Event Image 1</legend>
                                <input type="file" name='image' className="input w-full  text-lg" placeholder="Choose Image" required />
                            </div>
                            <div>
                                <img src={singleData.Image} className=" h-40 w-40 rounded-xl" />
                            </div>
                        </div>
                    )
                }
                <button type="submit" className='btn w-full bg-[#9EFF00] border-none text-black mt-10 text-lg font-semibold'>
                    Update
                </button>

            </form>
        </div>
    )
}

export default Page