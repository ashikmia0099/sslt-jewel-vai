'use client'

import { getfetchDonationAmount, postfetchDonationAmount } from "@/redux/features/donation/donationTextandAmountSlice";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

function Dashboard_Donation_amount_text_Form() {

    const dispatch = useDispatch();
    const { donationAmount } = useSelector(state => state.donationAmount);
    const [selectType, setSelectType] = useState("Text");
    const uniqueType = [...new Set(donationAmount?.map(item => item.selectedType))];

    useEffect(() => {
        dispatch(getfetchDonationAmount())
    }, [dispatch])



    useEffect(() => {
        if (donationAmount?.length > 0) {
            setSelectType(donationAmount[0].selectedType)
        }
    }, [donationAmount])



    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const selectedType = form.get('selectedType');

        let postedData = {
            selectedType,
            Title: null,
            Description: null,
            NumberOfAmount: null,
        };
        if (selectedType === "Text") {
            const Title = form.get('Title');
            const Description = form.get('Description');
            postedData = {
                selectedType,
                Title,
                Description,
            };
        }
        if (selectedType === "Amount") {
            const NumberOfAmount = form.get('NumberOfAmount');
            postedData = {
                selectedType,
                NumberOfAmount,
            };
        }
        try {
            const resultAction = await dispatch(postfetchDonationAmount(postedData));
            if (postfetchDonationAmount.fulfilled.match(resultAction)) {
                Swal.fire("Success", "Gallery posted successfully", "success");
                // form.reset();
            } else {
                throw new Error(resultAction.payload);
            }
        } catch (err) {
            Swal.fire("Error", err.message, "error");
        }
    };

    return (
        <div className='m-10 px-10 py-10 border border-[#9EFF00] rounded-2xl'>
            <h1 className='text-4xl font-semibold uppercase text-center border-b pb-6 text-white'>Donation Text And Amount Post Form</h1>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <legend className="text-lg font-semibold pt-5 text-white pb-2">Choose Post Type </legend>
                    <select
                        value={selectType}
                        onChange={(e) => setSelectType(e.target.value)}
                        name="selectedType"
                        className="select w-full text-lg"
                        required
                    >
                        <option disabled>Select Post Type</option>
                        <option value="Text">Text</option>
                        <option value="Amount">Amount</option>
                    </select>
                </div>
                {
                    selectType === "Text" && (
                        <>
                            <div>
                                <legend className="text-lg font-semibold pt-5 text-white">Title Text   </legend>
                                <input type="text" name='Title' className="input w-full  text-lg" placeholder="Title Text" required />
                            </div>
                            <div>
                                <legend className="fieldset-legend text-lg font-semibold pt-5">Description <span className=' text-[12px]'></span> </legend>
                                <textarea name='Description' className="textarea w-full " placeholder="Description" rows={12} ></textarea>
                            </div>
                        </>
                    )
                }
                {
                    selectType === "Amount" && (
                        <>
                            <div>
                                <legend className="text-lg font-semibold pt-5 text-white">Amount Number  </legend>
                                <input type="number" name='NumberOfAmount' className="input w-full text-lg" placeholder="Amount Number" required />
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

export default Dashboard_Donation_amount_text_Form