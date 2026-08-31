'use client'

import { postfetchDonationFAQ } from "@/redux/features/donation/donationFAQSlice";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";


function Donation_Question_Deshboard() {

    const dispatch = useDispatch();
    const { donationFAQ } = useSelector(state => state.donationFAQ)

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        
        const formData = {
        Title_Name: form.Title_Name.value,
        Description: form.Description.value,
    };

        try {
            const resultAction = await dispatch(postfetchDonationFAQ(formData));

            if (postfetchDonationFAQ.fulfilled.match(resultAction)) {
                Swal.fire("Success", "Donation faq posted successfully", "success");
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
            <h1 className='text-4xl font-semibold uppercase text-center border-b pb-6 text-white'>Frequently Asked Questions Post Form</h1>
            <form onSubmit={handleFormSubmit}>
                <div className=' gap-3'>
                    <div>
                        <legend className="text-lg font-semibold pt-5 text-white">Title Name</legend>
                        <input type="text" name='Title_Name' className="input w-full  text-lg" placeholder="Title Name" required />
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

export default Donation_Question_Deshboard