'use client'

import { postfetchHearingAndHealthCare } from "@/redux/features/Home/hearingAndHealthCareSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";


function Home_Communiction_Hearing() {

    const dispatch = useDispatch();
    const { hearingAndhealthCareData } = useSelector(state => state.hearingAndHealthCare);


   const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = {
        Title_Name: e.target.Title_Name.value,
        Description: e.target.Description.value
    };

    try {
        const resultAction = await dispatch(postfetchHearingAndHealthCare(formData));

        if (postfetchHearingAndHealthCare.fulfilled.match(resultAction)) {
            Swal.fire("Success", "Data post successfully", "success");
        } else {
            throw new Error(resultAction.payload);
        }
    } catch (err) {
        Swal.fire("Error", err.message, "error");
    }
};


    return (
        <div className='m-10 px-10 py-10 border border-[#9EFF00] rounded-2xl'>
            <h1 className='text-4xl font-semibold uppercase text-center border-b pb-6 text-white'>Communication And Hearing Post Form</h1>
            <form onSubmit={handleFormSubmit}>
                <div className=' gap-3'>
                    <div>
                        <legend className="text-lg font-semibold pt-5 text-white">Title Name</legend>
                        <input type="text" name='Title_Name' className="input w-full text-lg " placeholder="Title Name" required />
                    </div>
                </div>
                <div>
                    <legend className="text-lg font-semibold pt-5 text-white">Description</legend>
                    <textarea className="textarea w-full text-lg" name='Description' placeholder="Description" rows={12} required></textarea>
                </div>
                <button type="submit" className='btn w-full bg-[#9EFF00] border-none text-black mt-10 text-lg font-semibold'>
                    Submit
                </button>
            </form>
        </div>
    )
}

export default Home_Communiction_Hearing