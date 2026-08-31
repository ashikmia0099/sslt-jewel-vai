'use client'

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
    getfetchDonationAmount,
    patchfetchDonationAmount
} from "@/redux/features/donation/donationTextandAmountSlice";

function Dashboard_Donation_amount_text_Update_Form() {

    const [selectType, setSelectType] = useState('Text');
    const [singledata, setSingledata] = useState(null);

    const dispatch = useDispatch();
    const { donationAmount } = useSelector(state => state.donationAmount);

    const params = useParams();
    const id = params?.id;

    // 🔹 Get all data
    useEffect(() => {
        dispatch(getfetchDonationAmount());
    }, [dispatch]);

    // 🔹 Get single data
    useEffect(() => {
        if (donationAmount.length && id) {
            const data = donationAmount.find(n => String(n.id) === String(id));

            if (data) {
                setSingledata(data);
                setSelectType(data.selectedType);
            }
        }
    }, [donationAmount, id]);

    const updatehandler = async (e) => {
        e.preventDefault();

        if (!singledata?.id) {
            Swal.fire("Error", "No data found", "error");
            return;
        }

        const form = e.target;
        const selectedType = form.selectedType.value;
        const Title = form.Title?.value;
        const Description = form.Description?.value;
        const NumberOfAmount = form.NumberOfAmount?.value;

        const payload = { selectedType };

        if (selectedType === "Text") {
            payload.Title = Title;
            payload.Description = Description;
        }

        if (selectedType === "Amount") {
            payload.NumberOfAmount = Number(NumberOfAmount);
        }

        try {
            const resultAction = await dispatch(
                patchfetchDonationAmount({ id: singledata.id, payload })
            );

            if (patchfetchDonationAmount.fulfilled.match(resultAction)) {
                Swal.fire("Updated!", "Donation updated successfully", "success");
            } else {
                throw new Error(resultAction.payload);
            }

        } catch (err) {
            Swal.fire("Error", err.message, "error");
        }
    };

    return (
        <div className='m-10 px-10 py-10 border border-[#9EFF00] rounded-2xl'>
            <h1 className='text-4xl text-center text-white'>
                Donation Update Form
            </h1>

            <form onSubmit={updatehandler}>

                <select
                    value={selectType}
                    onChange={(e) => setSelectType(e.target.value)}
                    name="selectedType"
                    className="select w-full mt-5"
                >
                    <option>Text</option>
                    <option>Amount</option>
                </select>

                {selectType === "Text" && (
                    <>
                        <input
                            type="text"
                            defaultValue={singledata?.Title || ""}
                            name="Title"
                            placeholder="Title"
                            className="input w-full mt-5"
                        />

                        <textarea
                            name="Description"
                            defaultValue={singledata?.Description || ""}
                            className="textarea w-full mt-5"
                            placeholder="Description"
                        />
                    </>
                )}

                {selectType === "Amount" && (
                    <input
                        type="number"
                        name="NumberOfAmount"
                        defaultValue={singledata?.NumberOfAmount || ""}
                        className="input w-full mt-5"
                        placeholder="Amount"
                    />
                )}

                <button className="btn w-full mt-5">
                    Update
                </button>
            </form>
        </div>
    );
}

export default Dashboard_Donation_amount_text_Update_Form;