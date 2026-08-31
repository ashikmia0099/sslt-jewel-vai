'use client'

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchHeroData, patchfetchHeroData } from "@/redux/features/Home/HeroSlice";


function Home_Banner_Update_Form() {

const dispatch = useDispatch();
    const { hero_data } = useSelector(store => store.banner)
    const params = useParams();
    const id = params?.id;
    const [posttype, setPostType] = useState('Text');
    const [singledata, setSingledata] = useState(null);

    useEffect(() => {
        dispatch(fetchHeroData());
    }, [dispatch]);

    useEffect(() => {
        if (hero_data?.length && id) {
            const data = hero_data.find(n => String(n.id) === String(id));
            if (data) {
                setSingledata(data);
                setPostType(data.postType);
            }
        }
    }, [hero_data, id]);



    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!singledata?.id) {
            Swal.fire("Error", "No data found", "error");
            return;
        }

        const form = e.target;
        const formData = new FormData();
        formData.append("postType", posttype);

        if (posttype === "Text") {
            formData.append("title", form.title.value);
            formData.append("shortOverview", form.shortOverview.value);
        }

        if (posttype === "Image") {
            const file = form.image.files[0];
            if (file) {
                formData.append("image", file);
            }
        }

        try {
            const resultAction = await dispatch(
                patchfetchHeroData({ id, formData })
            );
            if (patchfetchHeroData.fulfilled.match(resultAction)) {
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
            <h1 className='text-4xl font-semibold uppercase text-center border-b pb-6 text-white'>Home Banner Form</h1>
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
                        <option className=" text-lg">Text</option>
                        <option className=" text-lg">Image</option>
                    </select>
                </div>
                {
                    posttype === "Text" && (
                        <>
                            <div>
                                <legend className="text-lg font-semibold pt-5 text-white">Title </legend>
                                <input defaultValue={singledata?.title} type="text" name='title' className="input w-full  text-lg" placeholder=" Title" required />
                            </div>
                            <div>
                                <legend className="text-lg font-semibold pt-5 text-white">Short Overview</legend>
                                <textarea defaultValue={singledata?.shortOverview} className="textarea w-full  text-lg" name='shortOverview' placeholder="Over View " rows={12} required></textarea>
                            </div>
                        </>
                    )
                }
                {
                    posttype === "Image" && (
                        <div className=" flex justify-between py-5">
                            <div>
                                <legend className="text-lg font-semibold pt-5 text-white">Choose Event Image 1</legend>
                                <input type="file" name='image' className="input w-full  text-lg" placeholder="Choose Image" required />
                            </div>
                            <div>
                                <img src={singledata?.image} alt="image" className=" h-40 w-40 rounded-2xl" />
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

export default Home_Banner_Update_Form