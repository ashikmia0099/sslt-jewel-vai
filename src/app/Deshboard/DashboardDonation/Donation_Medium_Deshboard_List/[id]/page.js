'use client';

import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getfetchDonationMedium, patchfetchDonationMedium } from "@/redux/features/donation/donationMediumSlice";

function Donation_Medium_Deshboard_Update_Form() {

    const params = useParams();
    const id = params?.id;
    const [singledata, setSingleData] = useState(null);
    const dispatch = useDispatch();
    const { donationMedium } = useSelector(state => state.donationMedium)


    useEffect(() => {
        if (!donationMedium.length) {
            dispatch(getfetchDonationMedium())
        } else if (id) {
            const data = donationMedium.find(n => n.id === id)
            setSingleData(data)
        }
    }, [donationMedium, id, dispatch]);






    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        const formData = new FormData();
        formData.append("MFS_Bank_Name", form.MFS_Bank_Name.value);
        formData.append("shortOverview", form.shortOverview.value);
        formData.append("FieldOne", form.FieldOne.value || "");
        formData.append("FieldTwo", form.FieldTwo.value || "");
        formData.append("MFS_Bank_Image", form.MFS_Bank_Image.files[0]);

        try {
            if (!id) {
                Swal.fire("Error", "ID not found", "error");
                return;
            }
            const resultAction = await dispatch(patchfetchDonationMedium({ id, formData }));

            if (patchfetchDonationMedium.fulfilled.match(resultAction)) {
                Swal.fire("Success", "Donation medium update successfully", "success");
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
            <h1 className='text-4xl font-semibold uppercase text-center border-b pb-6 text-white'>
                Donation Medium Update Form
            </h1>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <legend className="text-lg font-semibold pt-5 text-white">Bank or MFS Name</legend>
                    <input type="text" defaultValue={singledata?.MFS_Bank_Name || ""} name="MFS_Bank_Name" className="input w-full  text-lg" placeholder="Enter bank or MFS name" required />
                </div>
                <div>
                    <legend className="text-lg font-semibold pt-5 text-white">Short Summary (max 15 words)</legend>
                    <textarea className="textarea w-full  text-lg" defaultValue={singledata?.shortOverview || ""} name="shortOverview" placeholder="Short summary" rows={3} required ></textarea>
                </div>
                <div>
                    <legend className="text-lg font-semibold pt-5 text-white">Bank or MFS Number 1</legend>
                    <input type="text" name="FieldOne" defaultValue={singledata?.FieldOne || ""} className="input w-full  text-lg" placeholder="Enter primary number" />
                </div>
                <div>
                    <legend className="text-lg font-semibold pt-5 text-white">Bank or MFS Number 2</legend>
                    <input type="text" defaultValue={singledata?.FieldTwo || ""} name="FieldTwo" className="input w-full  text-lg" placeholder="Enter secondary number" />
                </div>
                <div className=" flex justify-between items-center py-5">
                    <div>
                        <legend className="text-lg font-semibold pt-5 text-white">Choose Banner Logo</legend>
                        <input type="file" name="MFS_Bank_Image" className="input w-full text-lg" placeholder="Upload logo" />
                    </div>
                    <div>
                        <img src={singledata?.MFS_Bank_Image} alt={singledata?.MFS_Bank_Name} className=" h-40 w-40 rounded-2xl" />
                    </div>
                </div>
                <button type="submit" className="btn w-full bg-[#9EFF00] border-none text-black mt-10 text-lg font-semibold" >
                    Update
                </button>
            </form>
        </div>
    );
}

export default Donation_Medium_Deshboard_Update_Form;
