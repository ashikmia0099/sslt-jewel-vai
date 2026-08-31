'use client'

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getfetchSecondBanner, patchfetchSecondBanner } from "@/redux/features/Home/SecondHeroSlice";
import Swal from "sweetalert2";

function Home_Banner_Second() {
    const dispatch = useDispatch();
    const { secondBanner } = useSelector(state => state.secondBanner);

    const params = useParams();
    const id = params?.id;

    const [posttype, setPostType] = useState(""); // initially empty
    const [increseDescripton, setincreseDescripton] = useState([]);
    const [singleData, setSingleData] = useState(null);

    useEffect(() => {
        if (!secondBanner.length) {
            dispatch(getfetchSecondBanner());
        } else if (id) {
            const data = secondBanner.find(n => n.id === id);
            setSingleData(data);

            // Set post type automatically
            if (data?.ImagePostType) {
                setPostType(data.ImagePostType);
            }
        }
    }, [secondBanner, id, dispatch]);

    if (id && !singleData) return <p className='text-white'>Loading...</p>;

    const addSection = () => {
        setincreseDescripton(prev => [...prev, { id: Date.now() }]);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData();

        formData.append("ImagePostType", form.ImagePostType.value);

        // SINGLE IMAGE
        if (form.ImagePostType.value === "SingleImage") {
            formData.append("Doctor_Name", form.Doctor_Name.value);
            formData.append("Doctor_Position", form.Doctor_Position.value);
            formData.append("Working_place", form.Working_place.value);
            formData.append("Description_Title", form.Description_Title.value);
            formData.append("Description", form.Description.value);

            const imageFile = form.image?.files?.[0];
            if (imageFile) formData.append("image", imageFile);

            // dynamicDescriptions
            const dynamicDescriptions = increseDescripton.map((_, index) => ({
                title: form[`title${index}`]?.value || "",
                description: form[`description${index}`]?.value || "",
            }));
            formData.append("dynamicDescriptions", JSON.stringify(dynamicDescriptions));
        }

        // DUAL IMAGE
        if (form.ImagePostType.value === "DualImage") {
            const img1 = form.Choose_Dual_Type_Image_1?.files?.[0];
            const img2 = form.Choose_Dual_Type_Image_2?.files?.[0];

            if (img1) formData.append("Choose_Dual_Type_Image_1", img1);
            if (img2) formData.append("Choose_Dual_Type_Image_2", img2);
        }

        try {
            const resultAction = await dispatch(patchfetchSecondBanner({ id, formData }));
            if (patchfetchSecondBanner.fulfilled.match(resultAction)) {
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
            <h1 className='text-4xl font-semibold uppercase text-center border-b pb-6 text-white'>
                Communication And Healthcare Post Form
            </h1>

            <form onSubmit={handleFormSubmit}>
                {/* Post Type Selector */}
                <div>
                    <legend className="text-lg font-semibold pt-5 text-white pb-2">Choose Post Type</legend>
                    <select
                        value={posttype}
                        onChange={(e) => setPostType(e.target.value)}
                        name="ImagePostType"
                        className="select w-full text-lg"
                        required
                    >
                        <option disabled className="text-lg">Select Post Type</option>
                        <option className="text-lg">SingleImage</option>
                        <option className="text-lg">DualImage</option>
                    </select>
                </div>

                {/* Single Image Fields */}
                {posttype === "SingleImage" && (
                    <>
                        <div>
                            <legend className="text-lg font-semibold pt-5 text-white">Doctor Name</legend>
                            <input
                                defaultValue={singleData?.Doctor_Name || ''}
                                type="text"
                                name='Doctor_Name'
                                className="input w-full text-lg"
                                placeholder="Doctor Name"
                            />
                        </div>
                        <div>
                            <legend className="text-lg font-semibold pt-5 text-white">Doctor Position</legend>
                            <input
                                defaultValue={singleData?.Doctor_Position || ''}
                                type="text"
                                name='Doctor_Position'
                                className="input w-full text-lg"
                                placeholder="Doctor Position"
                            />
                        </div>
                        <div>
                            <legend className="text-lg font-semibold pt-5 text-white">Current Working Place</legend>
                            <input
                                defaultValue={singleData?.Working_place || ''}
                                type="text"
                                name='Working_place'
                                className="input w-full text-lg"
                                placeholder="Working Place"
                            />
                        </div>

                        <div className="flex items-center justify-between py-5">
                            <div>
                                <legend className="text-lg font-semibold pt-5 text-white">Choose Doctor Image</legend>
                                <input type="file" name='image' className="input w-full text-lg" />
                            </div>
                            <div>
                                <img src={singleData?.SingleImage} className="h-40 w-32 rounded-2xl" alt="" />
                            </div>
                        </div>

                        <div className='py-10 pb-16'>
                            <h4 className='text-xl font-semibold btn bg-[#9EFF00] text-black rounded-full px-10'>Section 1</h4>
                            <div className='grid grid-cols-2 gap-3'>
                                <div>
                                    <legend className="text-lg font-semibold pt-5 text-white">Description Title</legend>
                                    <input
                                        defaultValue={singleData?.Description_Title || ""}
                                        type="text"
                                        name='Description_Title'
                                        className="input w-full text-lg"
                                        placeholder="Description Title"
                                    />
                                </div>
                            </div>
                            <div>
                                <legend className="text-lg font-semibold pt-5 text-white">Description</legend>
                                <textarea
                                    defaultValue={singleData?.Description || ""}
                                    className="textarea w-full text-lg"
                                    name='Description'
                                    rows={12}
                                    placeholder="Description"
                                ></textarea>
                            </div>
                        </div>

                        {singleData?.dynamicDescriptions?.map((section, index) => (
                            <div key={index} className='py-10 pb-16'>
                                <h4 className='text-xl font-semibold btn bg-[#9EFF00] text-black rounded-full px-10'>
                                    Section {index + 2}
                                </h4>
                                <div className='grid grid-cols-2 gap-3'>
                                    <div>
                                        <legend className="text-lg font-semibold pt-5 text-white">Description Title</legend>
                                        <input
                                            type="text"
                                            name={`title${index}`}
                                            className="input w-full text-lg"
                                            placeholder="Description Title"
                                            defaultValue={section.title}
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <legend className="text-lg font-semibold pt-5 text-white">Description</legend>
                                    <textarea
                                        className="textarea w-full text-lg"
                                        name={`description${index}`}
                                        placeholder="Description"
                                        rows={12}
                                        defaultValue={section.description}
                                        required
                                    ></textarea>
                                </div>
                            </div>
                        ))}
                    </>
                )}

                {/* Dual Image Fields */}
                {posttype === "DualImage" && (
                    <>
                        <div className="flex justify-between py-3">
                            <div>
                                <legend className="text-lg font-semibold pt-5 text-white">Choose Event Image 1</legend>
                                <input type="file" name='Choose_Dual_Type_Image_1' className="input w-full text-lg" />
                            </div>
                            <div>
                                <img src={singleData?.Choose_Dual_Type_Image_1} className="h-40 w-32 rounded-2xl" alt="" />
                            </div>
                        </div>

                        <div className="flex justify-between py-3">
                            <div>
                                <legend className="text-lg font-semibold pt-5 text-white">Choose Event Image 2</legend>
                                <input type="file" name='Choose_Dual_Type_Image_2' className="input w-full text-lg" />
                            </div>
                            <div>
                                <img src={singleData?.Choose_Dual_Type_Image_2} className="h-40 w-32 rounded-2xl" alt="" />
                            </div>
                        </div>
                    </>
                )}

                <button
                    type="submit"
                    className='btn w-full bg-[#9EFF00] border-none text-black mt-10 text-lg font-semibold'
                >
                    Update
                </button>
            </form>
        </div>
    );
}

export default Home_Banner_Second;