'use client'

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getfetchMedicalDesies, patchfetchMedicalDesies } from "@/redux/features/Home/popularMedicalDesiesSlice";


function Home_Popular_Desis_Update_Form() {

    const params = useParams();
    const id = params?.id;
    const [singledata, setSingleData] = useState(null);
    const dispatch = useDispatch();
    const { mediaclDesies } = useSelector(state => state.medicalDesies)
    const [increseDescripton, setincreseDescripton] = useState([]);

    useEffect(() => {
        dispatch(getfetchMedicalDesies())
    }, [dispatch])


    // get id wise data
    useEffect(() => {
        if (!mediaclDesies.length) {
            dispatch(getfetchMedicalDesies())
        } else if (id) {
            const data = mediaclDesies.find(n => n.id === id)
            setSingleData(data)
        }
    }, [mediaclDesies, id, dispatch]);


    

  const handleFormSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;

        const formData = new FormData();

        formData.append("Desis_Name", form.Desis_Name.value);
        formData.append("Description_Title", form.Description_Title.value);
        formData.append("Description", form.Description.value);

        // ✅ old image
        formData.append("existingImage", singledata?.Choose_Image || "");

        // ✅ new image
        const file = form.Choose_Image.files[0];
        if (file) {
            formData.append("image", file);
        }

        const dynamicDescriptions = [];

        // ✅ existing sections
        singledata?.dynamicDescriptions?.forEach((section, index) => {
            dynamicDescriptions.push({
                title: form[`oldtitle${index}`]?.value ?? section.title,
                description: form[`olddescription${index}`]?.value ?? section.description
            });
        });

        // ✅ new sections
        increseDescripton.forEach((_, index) => {
            const title = form[`newtitle${index}`]?.value;
            const description = form[`newdescription${index}`]?.value;

            if (!title || !description) return;

            dynamicDescriptions.push({ title, description });
        });

        formData.append("dynamicDescriptions", JSON.stringify(dynamicDescriptions));

        try {
            const resultAction = await dispatch(
                patchfetchMedicalDesies({ id, formData })
            );

            if (patchfetchMedicalDesies.fulfilled.match(resultAction)) {
                Swal.fire("Success", "Updated successfully", "success");
            } else {
                throw new Error(resultAction.payload);
            }
        } catch (err) {
            Swal.fire("Error", err.message, "error");
        }
    };




    return (
        <div className='m-10 px-10 py-10 border border-[#9EFF00] rounded-2xl'>
            <h1 className='text-4xl font-semibold uppercase text-center border-b pb-6 text-white'>Popular Desis Update Form</h1>
            <form onSubmit={handleFormSubmit}>
                <div className=' gap-3'>
                    <div>
                        <legend className="text-lg font-semibold pt-5 text-white">Desis Name</legend>
                        <input defaultValue={singledata?.Desis_Name || ''} type="text" name='Desis_Name' className="input w-full  text-lg" placeholder="Blog Title" />
                    </div>
                </div>
                <div className=" flex items-center py-5 justify-between">
                    <div>
                        <legend className="text-lg font-semibold pt-5 text-white">Choose Desis Banner Image</legend>
                        <input type="file" name='Choose_Image' className="input w-full  text-lg" placeholder="Choose Image" />
                    </div>
                    <img src={singledata?.Choose_Image} className=" h-40 w-40 rounded-xl" alt="images" />
                </div>
                <div className='py-10 pb-16'>
                    <div>
                        <h4 className='text-xl font-semibold btn bg-[#9EFF00] text-black rounded-full px-10'>Section 1</h4>
                    </div>
                    <div className='grid grid-cols-2 gap-3'>
                        <div>
                            <legend className="text-lg font-semibold pt-5 text-white">Description Title</legend>
                            <input defaultValue={singledata?.Description_Title || ''} type="text" name='Description_Title' className="input w-full  text-lg" placeholder="Description Title" />
                        </div>
                    </div>
                    <div>
                        <legend className="text-lg font-semibold pt-5 text-white">Description</legend>
                        <textarea defaultValue={singledata?.Description || ''} className="textarea w-full text-lg" name='Description' placeholder="Description " rows={12} ></textarea>
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

export default Home_Popular_Desis_Update_Form