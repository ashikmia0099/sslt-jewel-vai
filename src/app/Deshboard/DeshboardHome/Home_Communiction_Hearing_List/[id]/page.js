'use client'

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getfetchHearingAndHealthCare, patchfetchHearingAndHealthCare } from "@/redux/features/Home/hearingAndHealthCareSlice";


function Home_Communiction_Hearing_Update_form() {


    const dispatch = useDispatch();
    const { hearingAndhealthCareData } = useSelector(state => state.hearingAndHealthCare);
    const params = useParams();
    const id = params?.id;
    const [singledata, setSingledata] = useState(null);


    useEffect(() => {
        dispatch(getfetchHearingAndHealthCare())
    }, [dispatch]);


    useEffect(() => {
        if (hearingAndhealthCareData?.length && id) {
            const data = hearingAndhealthCareData.find(n => String(n.id) === String(id));
            if (data) {
                setSingledata(data);
            }
        }
    }, [hearingAndhealthCareData, id]);


    const handleFormSubmit = async (e) => {
        e.preventDefault();
    
        const formData = {
            Title_Name: e.target.Title_Name.value,
            Description: e.target.Description.value
        };
    
        try {
            const resultAction = await dispatch(patchfetchHearingAndHealthCare({ id: singledata.id, formData }));
    
            if (patchfetchHearingAndHealthCare.fulfilled.match(resultAction)) {
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
            <h1 className='text-4xl font-semibold uppercase text-center border-b pb-6 text-white'>Communiction Hearing Update Form</h1>
            <form onSubmit={handleFormSubmit}>
                <div className=' gap-3'>
                    <div>
                        <legend className="text-lg font-semibold pt-5 text-white">Title Name</legend>
                        <input defaultValue={singledata?.Title_Name || ""} type="text" name='Title_Name' className="input w-full text-lg" placeholder="Blog Title" required />
                    </div>
                </div>
                <div>
                    <legend className="text-lg font-semibold pt-5 text-white">Description</legend>
                    <textarea defaultValue={singledata?.Description || ""} className="textarea w-full  text-lg" name='Description' placeholder="Description" rows={12} required></textarea>
                </div>
                <button type="submit" className='btn w-full bg-[#9EFF00] border-none text-black mt-10 text-lg font-semibold'>
                    Update
                </button>
            </form>
        </div>
    )
}

export default Home_Communiction_Hearing_Update_form