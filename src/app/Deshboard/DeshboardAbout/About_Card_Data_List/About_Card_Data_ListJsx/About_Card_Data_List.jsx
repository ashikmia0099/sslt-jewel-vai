import React, { useEffect } from 'react'
import { FaEdit, FaPlus } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'
import Swal from 'sweetalert2'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAboutHeroDataDelete, fetchAboutHeroDataGet } from '@/redux/features/about/aboutHeroSlice'


function About_Card_Data_List() {

    const dispatch = useDispatch();
    const { heroData } = useSelector(state => state.abouthero)

    useEffect(() => {
        dispatch(fetchAboutHeroDataGet())
    }, [dispatch])



    const handleDelete = async (id) => {
        try {
            const confirm = await Swal.fire({
                title: "Are you sure?",
                text: "This data will be deleted permanently!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            });

            if (confirm.isConfirmed) {
                await dispatch(fetchAboutHeroDataDelete(id));
                Swal.fire({
                    title: "Deleted!",
                    text: "Your data has been deleted.",
                    icon: "success"
                });
            }
        } catch (err) {
            Swal.fire("Error", err.message, "error");
        }
    };



    return (
        <div>
            <div className='pt-10 '>
                <h1 className='text-4xl font-semibold text-center text-white py-14'> About Hero Text and Image Data</h1>
                <div className=' flex items-end px-10'>
                    <Link href={'/Deshboard/DeshboardAbout/About_Title_Text_Form'}>
                        <div className=' h-8 w-20 border-2 rounded-full flex items-center justify-center cursor-pointer mb-3'>
                            <span className=' text-white text-xl font-semibold'><FaPlus /></span>
                            <span className=' text-white font-semibold'>Add</span>
                        </div>
                    </Link>
                </div>
                <div className='px-10 '>
                    <div className="overflow-x-auto">
                        <table className="table ">
                            <thead>
                                <tr>
                                    <th className='text-lg text-white '>Id</th>
                                    <th className='text-lg text-white '>Selected Type</th>
                                    <th className='text-lg text-white '>Titale Text OR Images</th>
                                    <th className='text-lg text-white '>Edit</th>
                                    <th className='text-lg text-white '>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    heroData.map((data, index) => (
                                        <tr key={data.id}>
                                            <th className=' text-white text-[16px]'>{index + 1}</th>
                                            <th className=' text-white text-[16px]'>{data.selected_type}</th>
                                            <td className=' text-white text-[16px]'>
                                                {
                                                    data.selected_type === "Text" && (
                                                        <th className=' text-white text-[16px]'>{data.title}</th>
                                                    )
                                                }
                                                {
                                                    data.selected_type === "Image" && (
                                                        <img src={data.image} className='h-40 w-40 rounded-2xl' alt="Doctor Image" />
                                                    )
                                                }
                                            </td>
                                            <td className='text-3xl text-center text-white cursor-pointer ' >
                                                <Link href={`About_Card_Data_List/${data.id}`}><FaEdit /></Link>
                                            </td>
                                            <td
                                                onClick={() => handleDelete(data.id)}
                                                className='text-4xl text-red-700 cursor-pointer '>
                                                <MdDeleteForever />
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About_Card_Data_List