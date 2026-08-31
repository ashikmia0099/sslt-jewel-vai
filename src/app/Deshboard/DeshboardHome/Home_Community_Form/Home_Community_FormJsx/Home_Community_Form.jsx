'use client'

import { useState } from "react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { postfetchCommunityEvent } from "@/redux/features/Home/communityEventSlice";


function Home_Community_Form() {


    const dispatch = useDispatch()

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;
        const Event_Title = form.Event_Title.value;
        const Event_Place_Name = form.Event_Place_Name.value;
        const Description = form.Description.value;
        const image = form.image.files[0];

        const formData = new FormData();
        formData.append("Event_Title", Event_Title);
        formData.append("Event_Place_Name", Event_Place_Name);
        formData.append("Description", Description);
        formData.append("image", image);

        try {
            const resultAction = await dispatch(postfetchCommunityEvent(formData));

            if (postfetchCommunityEvent.fulfilled.match(resultAction)) {
                Swal.fire("Success", "Data posted successfully", "success");
                form.reset()
            } else {
                throw new Error(resultAction.payload);
            }
        } catch (err) {
            Swal.fire("Error", err.message, "error");
        }
    }


    return (
        <div className='m-10 px-10 py-10 border border-[#9EFF00] rounded-2xl'>
            <h1 className='text-4xl font-semibold uppercase text-center border-b pb-6 text-white'>Community Event Data Form </h1>
            <form onSubmit={handleFormSubmit}>
                <div className=' gap-3'>
                    <div>
                        <legend className="text-lg font-semibold pt-5 text-white">Event Title </legend>
                        <input type="text" name='Event_Title' className="input w-full text-lg" placeholder="Event Title " required />
                    </div>
                </div>
                <div>
                    <legend className="text-lg font-semibold pt-5 text-white">Event Place</legend>
                    <input type="text" name='Event_Place_Name' className="input w-full text-lg" placeholder="Event Place" required />
                </div>
                <div>
                    <legend className="text-lg font-semibold pt-5 text-white">Description</legend>
                    <textarea className="textarea w-full  text-lg" name='Description' placeholder="Description " rows={12} required></textarea>
                </div>
                <div>
                    <legend className="text-lg font-semibold pt-5 text-white">Choose Event Image</legend>
                    <input type="file" name='image' className="input w-full  text-lg" placeholder="Choose Image" required />
                </div>
                <button type="submit" className='btn w-full bg-[#9EFF00] border-none text-black mt-10 text-lg font-semibold'>
                    Submit
                </button>
            </form>
        </div>
    )
}

export default Home_Community_Form