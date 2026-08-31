'use client'

import React, { useEffect, useState } from 'react'
import { FaEdit, FaPlus } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'
import Swal from 'sweetalert2'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { deletefetchSecondBanner, getfetchSecondBanner } from '@/redux/features/Home/SecondHeroSlice'


function Home_Banner_Second_List() {


    const dispatch = useDispatch();
    const { secondBanner } = useSelector(state => state.secondBanner)

    useEffect(() => {
        dispatch(getfetchSecondBanner())
    }, [dispatch])

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "This news will be deleted permanently!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
        });

        if (confirm.isConfirmed) {
            try {
                await dispatch(deletefetchSecondBanner(id));
                Swal.fire("Deleted!", "Data deleted successfully", "success");
            } catch (err) {
                Swal.fire("Error", err.message, "error");
            }
        }
    };


    return (
        <div>
            <div className='pt-10 '>
                <h1 className='text-4xl font-semibold text-center text-white py-14'> All Doctor Data List</h1>
                <div className=' flex items-end px-10'>
                    <Link href={'/Deshboard/DeshboardHome/Home_Banner_Second'}>
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
                                    <th className='text-lg text-white '> Name</th>
                                    <th className='text-lg text-white '>Images</th>
                                    <th className='text-lg text-white '>Edit</th>
                                    <th className='text-lg text-white '>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    secondBanner.map((data, index) => (
                                        <tr key={data.id}>
                                            <th className=' text-white text-[16px]'>{index + 1}</th>
                                            <th className=' text-white text-[16px]'>{data.ImagePostType}</th>
                                            <th className=' text-white text-[16px]'>{data.Doctor_Name}</th>
                                            <td className=' text-white text-[16px]'>
                                                <img src={data.SingleImage || data.Choose_Dual_Type_Image_1} className='h-40 w-40 rounded-2xl' alt="Doctor Image" />
                                            </td>
                                            <td className='text-3xl text-center text-white cursor-pointer '>
                                                <Link href={`Home_Banner_Second_List/${data.id}`}><FaEdit /></Link>
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

export default Home_Banner_Second_List
