
'use client'

import { useEffect, useState } from "react";

import Swal from "sweetalert2";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchContactDataGet, patchfetchContact } from "@/redux/features/contact/contactSlice";


function Contact_Data_Update() {

    const dispatch = useDispatch();
    const { contactData } = useSelector(state => state.contact)
    const [selectType, setSelectType] = useState("Phone");
    const [singledata, setSingleData] = useState(null);
    const params = useParams();
    const router = useRouter()
    const id = params?.id;





    useEffect(() => {
        dispatch(fetchContactDataGet());
    }, [dispatch]);



    // 🔹 Get single data
    useEffect(() => {
        if (contactData.length && id) {
            const data = contactData.find(n => String(n.id) === String(id));
            setSingleData(data);
        }
    }, [contactData, id]);


    // dynamic fields level

    const fieldLebels = {
        Phone: ["Phone number one", "Phone number two"],
        Email: ["Email one", " Email two"],
        Address: ["Address one", "Address two"],
        OpeningDayTime: ["Opening Day", "Opening Time"]
    }



    const [formState, setFormState] = useState({
    FieldOne: "",
    FieldTwo: ""
});

useEffect(() => {
    if (singledata) {
        setFormState({
            FieldOne: singledata.FieldOne || "",
            FieldTwo: singledata.FieldTwo || ""
        });
    }
}, [singledata]);


    useEffect(() => {
        if (singledata?.postedType) {
            setSelectType(singledata.postedType);
        }
    }, [singledata]);


    const handleSubmit = async (e) => {
        e.preventDefault()

        const form = new FormData(e.target);

        const postedData = {
            postedType: form.get("postedType"),
            FieldOne: form.get("FieldOne"),
            FieldTwo: form.get("FieldTwo")
        };

        try {
            const resultAction = await dispatch(patchfetchContact({ id, formData: postedData }));

            if (patchfetchContact.fulfilled.match(resultAction)) {
                Swal.fire("Success", "Contact posted successfully", "success");
                e.target.reset();
            } else {
                throw new Error(resultAction.payload);
            }

        } catch (err) {
            Swal.fire("Error", err.message, "error");
        }
    }



    return (
        <div className='m-10 px-10 py-10 border border-[#9EFF00] rounded-2xl'>
            <h1 className='text-4xl font-semibold uppercase text-center border-b pb-6 text-white'>Contact Data Update Form</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <legend className="text-lg font-semibold pt-5 text-white pb-2">Choose Post Type </legend>
                    <select
                        value={selectType}
                        onChange={(e) => setSelectType(e.target.value)}
                        name="postedType"
                        className="select w-full  text-lg" required>
                        <option disabled={true} className="  text-lg">Select Post Type</option>
                        {Object.keys(fieldLebels).map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <legend className="text-lg font-semibold pt-5 text-white">{fieldLebels[selectType][0]}  </legend>
                    <input
                        type="text"
                        name="FieldOne"
                        value={formState.FieldOne}
                        onChange={(e) =>
                            setFormState({ ...formState, FieldOne: e.target.value })
                        }
                        className="input w-full text-lg"
                        placeholder={fieldLebels[selectType][0]}
                        required
                    />
                </div>
                <div>
                    <legend className="text-lg font-semibold pt-5 text-white"> {fieldLebels[selectType][1]}</legend>
                    <input
                        type="text"
                        name="FieldTwo"
                        value={formState.FieldTwo}
                        onChange={(e) =>
                            setFormState({ ...formState, FieldTwo: e.target.value })
                        }
                        className="input w-full text-lg"
                        placeholder={fieldLebels[selectType][1]}
                        required
                    />
                </div>
                <button type="submit" className='btn w-full bg-[#9EFF00] border-none text-black mt-10 text-lg font-semibold'>
                    Update
                </button>
            </form>
        </div>
    )
}

export default Contact_Data_Update