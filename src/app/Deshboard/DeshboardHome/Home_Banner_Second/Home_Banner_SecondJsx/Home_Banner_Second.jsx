'use client'

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { TiPlus } from "react-icons/ti";
import { getfetchSecondBanner, postfetchSecondBanner } from "@/redux/features/Home/SecondHeroSlice";
import { useDispatch, useSelector } from "react-redux";


function Home_Banner_Second() {

    const dispatch = useDispatch();
    const { secondBanner } = useSelector(state => state.secondBanner)

    useEffect(() => {
        dispatch(getfetchSecondBanner())
    }, [dispatch])

    const [posttype, setPostType] = useState("SingleImage")
    const [increseDescripton, setincreseDescripton] = useState([]);

    const addSection = () => {
        setincreseDescripton(prev => [...prev, { id: Date.now() }]);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData();

        const ImagePostType = form.ImagePostType.value;

        formData.append("ImagePostType", ImagePostType);

        // ✅ SINGLE IMAGE
        if (ImagePostType === "SingleImage") {
            formData.append("Doctor_Name", form.Doctor_Name.value);
            formData.append("Doctor_Position", form.Doctor_Position.value);
            formData.append("Working_place", form.Working_place.value);
            formData.append("Description_Title", form.Description_Title.value);
            formData.append("Description", form.Description.value);

            // ✅ main image
            const imageFile = form.SingleImage.files[0];
            if (imageFile) {
                formData.append("image", imageFile);
            }

            // ✅ dynamicDescriptions
            const dynamicDescriptions = increseDescripton.map((_, index) => ({
                title: form[`title${index}`].value,
                description: form[`description${index}`].value,
            }));

            formData.append("dynamicDescriptions", JSON.stringify(dynamicDescriptions));
        }

        // ✅ DUAL IMAGE
        if (ImagePostType === "DualImage") {
            const img1 = form.Choose_Dual_Type_Image_1.files[0];
            const img2 = form.Choose_Dual_Type_Image_2.files[0];

            if (img1) {
                formData.append("Choose_Dual_Type_Image_1", img1);
            }

            if (img2) {
                formData.append("Choose_Dual_Type_Image_2", img2);
            }
        }

        try {
            const resultAction = await dispatch(postfetchSecondBanner(formData));

            if (postfetchSecondBanner.fulfilled.match(resultAction)) {
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
            <h1 className='text-4xl font-semibold uppercase text-center border-b pb-6 text-white'>Banner Teacher Data Post Form</h1>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <legend className="text-lg font-semibold pt-5 text-white pb-2">Choose Post Type </legend>
                    <select
                        value={posttype}
                        onChange={(e) => setPostType(e.target.value)}
                        defaultValue="Select post type"
                        name="ImagePostType"
                        className="select w-full  text-lg" required>
                        <option disabled={true} className="  text-lg">Select Post Type</option>
                        <option className="  text-lg">SingleImage</option>
                        <option className=" text-lg">DualImage</option>
                    </select>
                </div>
                {
                    posttype === "SingleImage" && (
                        <>
                            <div>
                                <legend className="text-lg font-semibold pt-5 text-white">Doctor Name </legend>
                                <input type="text" name='Doctor_Name' className="input w-full text-lg" placeholder="Doctor Name" required />
                            </div>

                            <div>
                                <legend className="text-lg font-semibold pt-5 text-white">Doctor Position </legend>
                                <input type="text" name='Doctor_Position' className="input w-full  text-lg" placeholder="Doctor Position" required />
                            </div>
                            <div>
                                <legend className="text-lg font-semibold pt-5 text-white">Current working Place</legend>
                                <input type="text" name='Working_place' className="input w-full  text-lg" placeholder="Current working Place" required />
                            </div>

                            <div>
                                <legend className="text-lg font-semibold pt-5 text-white">Choose Doctor Image </legend>
                                <input type="file" name='SingleImage' className="input w-full  text-lg" placeholder="Choose Image" required />
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
                                <div>
                                    <legend className="text-lg font-semibold pt-5 text-white">Description Title</legend>
                                    <input type="text" name='Description_Title' className="input w-full text-lg" placeholder="Description Title" required />
                                </div>
                                <div>
                                    <legend className="text-lg font-semibold pt-5 text-white">Doctor Overview</legend>
                                    <textarea className="textarea w-full text-lg" name='Description' placeholder="Doctor Overview " rows={12} required></textarea>
                                </div>
                            </div>
                            {increseDescripton.map((section, index) => (
                                <div key={section.id} className='py-10 pb-16'>
                                    <div>
                                        <h4 className='text-xl font-semibold btn bg-[#9EFF00] text-black rounded-full px-10'>
                                            Section {index + 2}
                                        </h4>
                                    </div>
                                    <div>
                                        <legend className="text-lg font-semibold pt-5 text-white">Description Title</legend>
                                        <input type="text" name={`title${index}`} className="input w-full text-lg " placeholder="Description Title" required />
                                    </div>
                                    <div>
                                        <legend className="text-lg font-semibold pt-5 text-white">Description</legend>
                                        <textarea className="textarea w-full  text-lg" name={`description${index}`} placeholder="Description" rows={12} required></textarea>
                                    </div>
                                </div>
                            ))}
                        </>
                    )
                }
                {
                    posttype === "DualImage" && (
                        <>
                            <div>
                                <legend className="text-lg font-semibold pt-5 text-white">Choose Event Image 1</legend>
                                <input type="file" name='Choose_Dual_Type_Image_1' className="input w-full text-lg" placeholder="Choose Image" required />
                            </div>
                            <div>
                                <legend className="text-lg font-semibold pt-5 text-white">Choose Event Image 2</legend>
                                <input type="file" name='Choose_Dual_Type_Image_2' className="input w-full text-lg" placeholder="Choose Image" required />
                            </div>
                        </>
                    )
                }
                <button type="submit" className='btn w-full bg-[#9EFF00] border-none text-black mt-10 text-lg font-semibold'>
                    Submit
                </button>
            </form>
        </div>
    )
}

export default Home_Banner_Second