'use client'

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getfetchCommunicationAndHealthCare, patchfetchCommunicationAndHealthCare } from "@/redux/features/Home/communicationAndHealthCareSlice";


function Home_Communication_HelthCare_Update_Form() {

    const params = useParams();
    const id = params?.id;
    const [singledata, setSingleData] = useState(null);
    const dispatch = useDispatch();
    const { healthCareData } = useSelector(state => state.communicationAndHealthCare);
    const [increseDescripton, setincreseDescripton] = useState([]);

    useEffect(() => {
        dispatch(getfetchCommunicationAndHealthCare())
    }, [dispatch]);


    // get id wise data
    useEffect(() => {
        if (!healthCareData.length) {
            dispatch(getfetchCommunicationAndHealthCare())
        } else if (id) {
            const data = healthCareData.find(n => n.id === id)
            setSingleData(data)
        }
    }, [healthCareData, id, dispatch]);


    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;

        const Title_Name = form.Title_Name.value;
        const Overview = form.Overview.value;
        const DescriptionTitle = form.DescriptionTitle.value;
        const Description = form.Description.value;
        const Choose_Image = form.Choose_Image.files[0];

        const formData = new FormData();

        formData.append("Title_Name", Title_Name);
        formData.append("Overview", Overview);
        formData.append("DescriptionTitle", DescriptionTitle);
        formData.append("Description", Description);

        // ✅ image (optional update)
        if (Choose_Image) {
            formData.append("image", Choose_Image);
        }

        // ===============================
        // 🔥 DYNAMIC DESCRIPTIONS FIX
        // ===============================

        let dynamicDescriptions = [];

        // 🔹 parse existing data safely
        const existingDescriptions =
            typeof singledata?.dynamicDescriptions === "string"
                ? JSON.parse(singledata.dynamicDescriptions)
                : singledata?.dynamicDescriptions || [];

        // 🔹 collect UPDATED existing fields
        existingDescriptions.forEach((_, index) => {
            const title = form[`title${index}`]?.value;
            const description = form[`description${index}`]?.value;

            if (!title || !description) return;

            dynamicDescriptions.push({
                title,
                description
            });
        });

        // 🔹 collect NEW added sections
        increseDescripton.forEach((_, index) => {
            const title = form[`newTitle${index}`]?.value;
            const description = form[`newDescription${index}`]?.value;

            if (!title || !description) return;

            dynamicDescriptions.push({
                title,
                description
            });
        });

        // ✅ append final merged array
        formData.append("dynamicDescriptions", JSON.stringify(dynamicDescriptions));

        try {
            const resultAction = await dispatch(
                patchfetchCommunicationAndHealthCare({ id, formData })
            );

            if (patchfetchCommunicationAndHealthCare.fulfilled.match(resultAction)) {
                Swal.fire("Success", "Data updated successfully", "success");

                // optional reset
                // form.reset();
                // setincreseDescripton([]);

            } else {
                throw new Error(resultAction.payload || "Update failed");
            }

        } catch (err) {
            Swal.fire("Error", err.message, "error");
        }
    };

    return (
        <div className='m-10 px-10 py-10 border border-[#9EFF00] rounded-2xl'>
            <h1 className='text-4xl font-semibold uppercase text-center border-b pb-6 text-white'>Communication And Helthcare Update Form</h1>
            <form onSubmit={handleFormSubmit}>

                <div className=' gap-3'>
                    <div>
                        <legend className="text-lg font-semibold pt-5 text-white">Title Name</legend>
                        <input defaultValue={singledata?.Title_Name || ''} type="text" name='Title_Name' className="input w-full text-lg" placeholder="Blog Title" />
                    </div>
                </div>
                <div>
                    <legend className="text-lg font-semibold pt-5 text-white">Overview</legend>
                    <textarea defaultValue={singledata?.Overview || ''} className="textarea w-full  text-lg" name='Overview' placeholder="Description " rows={12} ></textarea>
                </div>
                <div className=" flex items-center justify-between py-5">
                    <div>
                        <legend className="text-lg font-semibold pt-5 text-white">Choose Desis Banner Image</legend>
                        <input type="file" name='Choose_Image' className="input w-full  text-lg" placeholder="Choose Image" />
                    </div>
                    <div>
                        <img src={singledata?.Choose_Image} className=" h-40 w-40 rounded-xl" />
                    </div>
                </div>
                <div className='py-10 pb-16'>
                    <div>
                        <h4 className='text-xl font-semibold btn bg-[#9EFF00] text-black rounded-full px-10'>Section 1</h4>
                    </div>
                    <div className='grid grid-cols-2 gap-3'>
                        <div>
                            <legend className="text-lg font-semibold pt-5 text-white">Description Title</legend>
                            <input defaultValue={singledata?.DescriptionTitle || ''} type="text" name='DescriptionTitle' className="input w-full  text-lg" placeholder="Description Title" />
                        </div>
                    </div>
                    <div>
                        <legend className="text-lg font-semibold pt-5 text-white">Description</legend>
                        <textarea defaultValue={singledata?.Description || ''} className="textarea w-full  text-lg" name='Description' placeholder="Description " rows={12} ></textarea>
                    </div>
                </div>
                {singledata?.dynamicDescriptions?.map((section, index) => (
                    <div key={section.id} className='py-10 pb-16'>
                        <div>
                            <h4 className='text-xl font-semibold btn bg-[#9EFF00] text-black rounded-full px-10'>
                                Section {index + 2}
                            </h4>
                        </div>
                        <div className='grid grid-cols-2 gap-3'>
                            <div>
                                <legend className="text-lg font-semibold pt-5 text-white">Description Title</legend>
                                <input defaultValue={section?.title || ''} type="text" name={`title${index}`} className="input w-full text-lg " placeholder="Description Title" />
                            </div>
                        </div>
                        <div>
                            <legend className="text-lg font-semibold pt-5 text-white">Description</legend>
                            <textarea defaultValue={section?.description || ''} className="textarea w-full  text-lg" name={`description${index}`} placeholder="Description" rows={12} ></textarea>
                        </div>
                    </div>
                ))}

                <button type="submit" className='btn w-full bg-[#9EFF00] border-none text-black mt-10 text-lg font-semibold'>
                    Update
                </button>

            </form>
        </div>
    )
}

export default Home_Communication_HelthCare_Update_Form