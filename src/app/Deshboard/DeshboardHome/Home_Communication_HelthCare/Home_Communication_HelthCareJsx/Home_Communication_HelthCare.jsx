'use client'

import Swal from "sweetalert2";
import { TiPlus } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { getfetchCommunicationAndHealthCare, postfetchCommunicationAndHealthCare } from "@/redux/features/Home/communicationAndHealthCareSlice";
import { useEffect, useState } from "react";

function Home_Communication_HelthCare() {

    const dispatch = useDispatch()
    const { healthCareData } = useSelector(state => state.communicationAndHealthCare);
    const [increseDescripton, setincreseDescripton] = useState([]);

    const addSection = () => {
        setincreseDescripton(prev => [...prev, { id: Date.now() }]);
    };

    useEffect(() => {
        dispatch(getfetchCommunicationAndHealthCare())
    }, [dispatch]);



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

        if (Choose_Image) {
            formData.append("image", Choose_Image);
        }

        const dynamicDescriptions = [];

        increseDescripton.forEach((_, index) => {
            const title = form[`title${index}`]?.value;
            const description = form[`description${index}`]?.value;

            if (!title || !description) return;

            dynamicDescriptions.push({
                title,
                description
            });
        });

        formData.append("dynamicDescriptions", JSON.stringify(dynamicDescriptions));

        try {
            const resultAction = await dispatch(postfetchCommunicationAndHealthCare(formData));

            if (postfetchCommunicationAndHealthCare.fulfilled.match(resultAction)) {
                Swal.fire("Success", "Data posted successfully", "success");
                form.reset();
                setincreseDescripton([]);
            } else {
                throw new Error(resultAction.payload);
            }

        } catch (err) {
            Swal.fire("Error", err.message, "error");
        }
    };



    return (
        <div className='m-10 px-10 py-10 border border-[#9EFF00] rounded-2xl'>
            <h1 className='text-4xl font-semibold uppercase text-center border-b pb-6 text-white'>Communication And Helthcare Post Form</h1>
            <form onSubmit={handleFormSubmit}>

                <div className=' gap-3'>
                    <div>
                        <legend className="text-lg font-semibold pt-5 text-white">Title Name</legend>
                        <input type="text" name='Title_Name' className="input w-full text-lg" placeholder=" Title Name" required />
                    </div>
                </div>
                <div>
                    <legend className="text-lg font-semibold pt-5 text-white">Overview</legend>
                    <textarea className="textarea w-full  text-lg" name='Overview' placeholder="Description " rows={12} required></textarea>
                </div>
                <div>
                    <legend className="text-lg font-semibold pt-5 text-white">Choose Image</legend>
                    <input type="file" name='Choose_Image' className="input w-full  text-lg" placeholder="Choose Image" required />
                </div>

                <div className='py-4 flex justify-between items-center'>
                    <h4 className='text-2xl font-semibold uppercase text-white'>Increase Description</h4>
                    <button
                        type="button"
                        className='btn bg-[#9EFF00] border-none text-5xl font-semibold text-black'
                        onClick={addSection}>
                        <TiPlus />
                    </button>
                </div>

                <div className='py-10 pb-16'>
                    <div>
                        <h4 className='text-xl font-semibold btn bg-[#9EFF00] text-black rounded-full px-10'>Section 1</h4>
                    </div>
                    <div className='grid grid-cols-2 gap-3'>
                        <div>
                            <legend className="text-lg font-semibold pt-5 text-white">Description Title</legend>
                            <input type="text" name='DescriptionTitle' className="input w-full  text-lg" placeholder="Description Title" required />
                        </div>
                    </div>
                    <div>
                        <legend className="text-lg font-semibold pt-5 text-white">Description</legend>
                        <textarea className="textarea w-full  text-lg" name='Description' placeholder="Description " rows={12} required></textarea>
                    </div>
                </div>

                {increseDescripton.map((section, index) => (
                    <div key={section.id} className='py-10 pb-16'>
                        <div>
                            <h4 className='text-xl font-semibold btn bg-[#9EFF00] text-black rounded-full px-10'>
                                Section {index + 2}
                            </h4>
                        </div>
                        <div className='grid grid-cols-2 gap-3'>
                            <div>
                                <legend className="text-lg font-semibold pt-5 text-white">Description Title</legend>
                                <input type="text" name={`title${index}`} className="input w-full text-lg " placeholder="Description Title" required />
                            </div>
                        </div>
                        <div>
                            <legend className="text-lg font-semibold pt-5 text-white">Description</legend>
                            <textarea className="textarea w-full  text-lg" name={`description${index}`} placeholder="Description" rows={12} required></textarea>
                        </div>
                    </div>
                ))}

                <button type="submit" className='btn w-full bg-[#9EFF00] border-none text-black mt-10 text-lg font-semibold'>
                    Submit
                </button>

            </form>
        </div>
    )
}

export default Home_Communication_HelthCare