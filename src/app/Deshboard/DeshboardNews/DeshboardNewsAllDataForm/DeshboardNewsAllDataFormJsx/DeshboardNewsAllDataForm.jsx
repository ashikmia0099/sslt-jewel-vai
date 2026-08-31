import { fetchNewsDataPost } from '@/redux/features/news/newsSlice';
import React from 'react'
import { useDispatch } from 'react-redux';

import Swal from 'sweetalert2';


function DeshboardNewsAllDataForm() {

    const dispatch = useDispatch()

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;
        const newsTitle = form.newsTitle.value;
        const image = form.image.files[0];
        const description = form.description.value;

        const formData = new FormData();
        formData.append("newsTitle", newsTitle);
        formData.append("image",image);
        formData.append("description", description);

        try {

            const resultAction = await dispatch(fetchNewsDataPost(formData));

            if (fetchNewsDataPost.fulfilled.match(resultAction)) {
                Swal.fire("Success", "News posted successfully", "success");
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
            <h1 className='text-4xl font-semibold uppercase text-center border-b pb-6 text-white'>News and Update Post Form</h1>
            <form onSubmit={handleFormSubmit}>
                <legend className="fieldset-legend text-lg font-semibold pt-5 text-white">Title Name</legend>
                <input type="text" name='newsTitle' className="input w-full " placeholder="Title Name" required />
                <legend className="fieldset-legend text-lg font-semibold pt-5 text-white">Image</legend>
                <input type="file" name='image' className="file-input w-full " />
                <legend className="fieldset-legend text-lg font-semibold pt-5 text-white">Description <span className=' text-[12px]'>(max 70 word)</span> </legend>
                <textarea name='description' className="textarea w-full " placeholder="Description" rows={12} ></textarea>
                <div className='mt-6'>
                    <button type="submit" className='btn w-full shadow-2xs rounded-full bg-[#9EFF00] text-lg text-black' >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default DeshboardNewsAllDataForm