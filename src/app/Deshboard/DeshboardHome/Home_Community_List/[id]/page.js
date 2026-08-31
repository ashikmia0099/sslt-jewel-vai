'use client'

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getfetchCommunityEvent, patchfetchCommunityEvent } from "@/redux/features/Home/communityEventSlice";


function Home_Community_Update_Form() {


    const params = useParams();
    const id = params?.id;
    const dispatch = useDispatch();
    const [singleData, setSingleData] = useState(null);
    const { communityEvent } = useSelector(state => state.community)


    useEffect(() => {
        if (!communityEvent.length) {
            dispatch(getfetchCommunityEvent());
        } else if (id) {
            const data = communityEvent.find(n => n.id === id);
            setSingleData(data);
        }
    }, [communityEvent, id, dispatch]);

    if (id && !singleData) return <p className='text-white'>Loading...</p>;


    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;
        const Event_Title = form.Event_Title.value;
        const Event_Place_Name = form.Event_Place_Name.value;
        const Description = form.Description.value;
        const image = form.Choose_Image.files[0];

        const formData = new FormData();

        formData.append("Event_Title", Event_Title);
        formData.append("Event_Place_Name", Event_Place_Name);
        formData.append("Description", Description);

        if (image) {
            formData.append("image", image);
        }

        try {
            const resultAction = await dispatch(patchfetchCommunityEvent({ id: singleData.id, formData }));

            if (patchfetchCommunityEvent.fulfilled.match(resultAction)) {
                Swal.fire("Updated!", "data updated successfully", "success");
                form.reset();
            } else {
                throw new Error(resultAction.payload);
            }
        } catch (err) {
            Swal.fire("Error", err.message, "error");
        }
    };



    return (
        <div className='m-10 px-10 py-10 border border-[#9EFF00] rounded-2xl'>
            <h1 className='text-4xl font-semibold uppercase text-center border-b pb-6 text-white'>Community Event Update Form </h1>
            <form onSubmit={handleFormSubmit}>

                <div className=' gap-3'>
                    <div>
                        <legend className="text-lg font-semibold pt-5 text-white">Event Title </legend>
                        <input defaultValue={singleData.Event_Title || ""} type="text" name='Event_Title' className="input w-full  text-lg" placeholder="Event Title" />
                    </div>
                </div>
                <div>
                    <legend className="text-lg font-semibold pt-5 text-white">Event Title 2</legend>
                    <input defaultValue={singleData.Event_Place_Name || ""} type="text" name='Event_Place_Name' className="input w-full  text-lg" placeholder="Event Place" />
                </div>
                <div>
                    <legend className="text-lg font-semibold pt-5 text-white">Description</legend>
                    <textarea defaultValue={singleData.Description || ""} className="textarea w-full text-lg" name='Description' placeholder="Description " rows={12} ></textarea>
                </div>
                <div className=" flex items-center justify-between py-5">
                    <div>
                        <legend className="text-lg font-semibold pt-5 text-white">Choose Event Image</legend>
                        <input type="file" name='Choose_Image' className="input w-full  text-lg" placeholder="Choose Image" />
                    </div>
                    <div>
                        <img src={singleData.Choose_Image} alt="imge" className=" h-40 w-40 rounded-xl " />
                    </div>
                </div>
                <button type="submit" className='btn w-full bg-[#9EFF00] border-none text-black mt-10 text-lg font-semibold'>
                    Update
                </button>

            </form>
        </div>
    )
}

export default Home_Community_Update_Form