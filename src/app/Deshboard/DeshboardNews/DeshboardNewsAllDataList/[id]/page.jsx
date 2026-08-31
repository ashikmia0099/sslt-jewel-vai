'use client'
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewsDataGet, fetchNewsDataPatch } from '@/redux/features/news/newsSlice';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';


function DeshboardNewsAllDataForm() {
    

    const params = useParams();
    const id = params?.id; 
    const dispatch = useDispatch();

    const [singleData, setSingleData] = useState(null);
    const { allNews } = useSelector(state => state.news)


    useEffect(() => {
        if (!allNews.length) {
            dispatch(fetchNewsDataGet());
        } else if (id) {
            const data = allNews.find(n => n.id === id);
            setSingleData(data);
        }
    }, [allNews, id, dispatch]);

    if (id && !singleData) return <p className='text-white'>Loading...</p>;


    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;

        const newsTitle = form.newsTitle.value;
        const description = form.description.value;
        const imageFile = form.image.files[0];

        const formData = new FormData();
        formData.append("newsTitle", newsTitle);
        formData.append("description", description);

        if (imageFile) {
            formData.append("image", imageFile);
        }

        try {
            // assuming fetchNewsDataPatch takes {id, formData}
            const resultAction = await dispatch(fetchNewsDataPatch({ id: singleData.id, formData }));

            if (fetchNewsDataPatch.fulfilled.match(resultAction)) {
                Swal.fire("Updated!", "News updated successfully", "success");
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
            <h1 className='text-4xl font-semibold uppercase text-center border-b pb-6 text-white'>News and Update Edit Form</h1>
            <form onSubmit={handleFormSubmit}>
                <legend className="fieldset-legend text-lg font-semibold pt-5">Title Name</legend>
                <input defaultValue={singleData?.newsTitle || ''} type="text" name='newsTitle' className="input w-full " placeholder="Title Name" required />
                <div className=' grid grid-cols-5 justify-between gap-10'>
                    <div className=' col-span-4'>
                        <legend className="fieldset-legend text-lg font-semibold pt-5">Image</legend>
                        <input type="file" name='image' className="file-input w-full " />
                    </div>
                    <div className=' col-span-1'>
                        {singleData?.image && (
                            <div className="mt-4">
                                <p className="text-white text-sm mb-2">Current Image:</p>
                                <img
                                    src={singleData.image}
                                    alt="Current uploaded"
                                    className="w-40 h-auto rounded-lg border border-gray-300"
                                />
                            </div>
                        )}
                    </div>
                </div>
                <legend className="fieldset-legend text-lg font-semibold pt-5">Description <span className=' text-[12px]'>(max 70 word)</span> </legend>
                <textarea defaultValue={singleData?.description || ''} name='description' className="textarea w-full " placeholder="Description" rows={12} ></textarea>
                <div className='mt-6'>
                    <button type="submit" className='btn w-full shadow-2xs rounded-full bg-[#9EFF00] text-lg text-black' >
                        Update
                    </button>
                </div>
            </form>
        </div>
    )
}

export default DeshboardNewsAllDataForm