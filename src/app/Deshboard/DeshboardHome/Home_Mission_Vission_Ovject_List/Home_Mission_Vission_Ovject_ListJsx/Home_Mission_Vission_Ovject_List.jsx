'use client'

import React, { useEffect } from 'react'
import { FaEdit, FaPlus } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'
import Swal from 'sweetalert2'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { deletefetchMissionVissionObject, getfetchMissionVissionObject } from '@/redux/features/Home/missionVissionObjectSlice'

function Home_Mission_Vission_Ovject_List() {

    const dispatch = useDispatch();
    const { mission_vission_object } = useSelector(state => state.misssionVissionObject)

    useEffect(() => {
        dispatch(getfetchMissionVissionObject())
    }, [dispatch])


    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "This data will be deleted permanently!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
        });

        if (confirm.isConfirmed) {
            try {
                await dispatch(deletefetchMissionVissionObject(id));
                Swal.fire("Deleted!", "Data deleted successfully", "success");
            } catch (err) {
                Swal.fire("Error", err.message, "error");
            }
        }
    };

    return (
        <div>
            <div className='pt-10 '>
                <h1 className='text-4xl font-semibold text-center text-white py-14'>Mission Visison Objetive Data List</h1>
                <div className=' flex items-end px-10'>
                    <Link href={'/Deshboard/DeshboardHome/Home_Mission_Vission_Ovject_Image_Form'}>
                        <div className=' h-8 w-20 border-2 rounded-full flex items-center justify-center cursor-pointer mb-3 gap-x-1.5'>
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
                                    <th className='text-lg text-white '>Title Or Images</th>
                                    <th className='text-lg text-white '>Edit</th>
                                    <th className='text-lg text-white '>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    mission_vission_object.map((data, index) => (
                                        <tr key={data._id}>
                                            <th className=' text-white text-[16px]'>{index + 1}</th>
                                            <th className=' text-white text-[16px]'>{data.postType}</th>
                                            <th className=' text-white text-[16px]'>
                                                {
                                                    data.postType === "Text" ? (
                                                        data.Title
                                                    ) : (
                                                        <img src={data.Image} className='h-40 w-40 rounded-2xl' alt="Doctor Image" />
                                                    )
                                                }
                                            </th>
                                            <td className='text-3xl text-center text-white cursor-pointer '>
                                                <Link href={`Home_Mission_Vission_Ovject_List/${data.id}`}><FaEdit /></Link>
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

export default Home_Mission_Vission_Ovject_List
