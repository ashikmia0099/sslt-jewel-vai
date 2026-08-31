'use client';
import { postfetchDonationMedium } from "@/redux/features/donation/donationMediumSlice";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

function Donation_Medium_Deshboard_Form() {

    const dispatch = useDispatch();
    const { donationMedium } = useSelector(state => state.donationMedium)


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
            const resultAction = await dispatch(postfetchDonationMedium(formData));

            if (postfetchDonationMedium.fulfilled.match(resultAction)) {
                Swal.fire("Success", "Donation posted successfully", "success");
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
                Donation Medium Post Form
            </h1>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <legend className="text-lg font-semibold pt-5 text-white">Bank or MFS Name</legend>
                    <input type="text" name="MFS_Bank_Name" className="input w-full  text-lg" placeholder="Enter bank or MFS name" required />
                </div>
                <div>
                    <legend className="text-lg font-semibold pt-5 text-white">Short Summary (max 15 words)</legend>
                    <textarea className="textarea w-full  text-lg" name="shortOverview" placeholder="Short summary" rows={3} required></textarea>
                </div>
                <div>
                    <legend className="text-lg font-semibold pt-5 text-white">Bank or MFS Number 1</legend>
                    <input type="text" name="FieldOne" className="input w-full  text-lg" placeholder="Enter primary number" />
                </div>
                <div>
                    <legend className="text-lg font-semibold pt-5 text-white">Bank or MFS Number 2</legend>
                    <input type="text" name="FieldTwo" className="input w-full  text-lg" placeholder="Enter secondary number" />
                </div>
                <div>
                    <legend className="text-lg font-semibold pt-5 text-white">Choose Banner Logo</legend>
                    <input type="file" name="MFS_Bank_Image" className="input w-full  text-lg" placeholder="Upload logo" required />
                </div>
                <button type="submit" className="btn w-full bg-[#9EFF00] border-none text-black mt-10 text-lg font-semibold">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Donation_Medium_Deshboard_Form;
