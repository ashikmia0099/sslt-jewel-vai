'use client'

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import {
    getfetchFoundingMember,
    postfetchFoundingMember
} from '@/redux/features/Home/founderMessageSlice';

function Home_Founding_member_Form() {

    const dispatch = useDispatch();

    const foundingMemberData = useSelector(
        (state) => state.foundingMember?.foundingMemberData || []
    );

    const [selectType, setSelectType] = useState("Pesident");

    useEffect(() => {
        dispatch(getfetchFoundingMember());
    }, [dispatch]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;

        const ChooseFoundingMemberType = form.ChooseFoundingMemberType.value;
        const Name = form.Name.value;
        const Description = form.Description.value;
        const image = form.image.files[0];

        const formData = new FormData();
        formData.append("ChooseFoundingMemberType", ChooseFoundingMemberType);
        formData.append("Name", Name);
        formData.append("Description", Description);
        formData.append("image", image);

        try {
            const resultAction = await dispatch(postfetchFoundingMember(formData));

            if (postfetchFoundingMember.fulfilled.match(resultAction)) {
                Swal.fire("Success", "Posted successfully", "success");
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
            <h1 className='text-4xl font-semibold text-center text-white pb-6'>
                Founding Member Form
            </h1>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label className="text-white">Select Type</label>
                    <select
                        value={selectType}
                        onChange={(e) => setSelectType(e.target.value)}
                        name="ChooseFoundingMemberType"
                        className="select w-full"
                        required>
                        <option value="Pesident">Pesident</option>
                        <option value="Secretary">Secretary</option>
                        <option value="Founding">Founding</option>
                    </select>
                </div>
                <div>
                    <label className="text-white">Name</label>
                    <input
                        type="text"
                        name="Name"
                        className="input w-full"
                        required />
                </div>
                <div>
                    <label className="text-white">Description</label>
                    <textarea
                        name="Description"
                        className="textarea w-full"
                        rows={5}
                        required>

                    </textarea>
                </div>
                <div>
                    <label className="text-white">Image</label>
                    <input
                        type="file"
                        name="image"
                        className="input w-full"
                        required />
                </div>
                <button
                    type="submit"
                    className="btn w-full mt-5 bg-[#9EFF00] text-black">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Home_Founding_member_Form;