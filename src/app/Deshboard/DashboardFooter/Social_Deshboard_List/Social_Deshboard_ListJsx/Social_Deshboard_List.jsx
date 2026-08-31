'use client'

import React, { useEffect } from 'react'
import { MdDeleteForever } from 'react-icons/md'
import Swal from 'sweetalert2'
import Link from 'next/link'
import { FaPlus } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { deletefetchFooter, getfetchFooter } from '@/redux/features/footer/footerSlice'


function Social_Deshboard_List() {

    const dispatch = useDispatch();
    const { footerData } = useSelector(state => state.footer)

    useEffect(() => {
        dispatch(getfetchFooter())
    }, [dispatch])

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "This data well be deleted permanently!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
        });

        if (confirm.isConfirmed) {
            try {
                await dispatch(deletefetchFooter(id));
                Swal.fire("Deleted!", "Data deleted successfully", "success");
            } catch (err) {
                Swal.fire("Error", err.message, "error");
            }
        }
    };

    return (
        <div>
            <div className='pt-10 '>
                <h1 className='text-4xl font-semibold text-center text-white py-14'> Footer Table</h1>
                <div className=' flex items-end px-10'>
                    <Link href={'/Deshboard/DashboardFooter/Social_Deshboard'}>
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
                                    <th className='text-lg text-white '>Url</th>
                                    <th className='text-lg text-white '>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    footerData.map((data, index) => (
                                        <tr key={data.id}>
                                            <th className=' text-white text-[16px]'>{index + 1}</th>
                                            <th className=' text-white text-[16px]'>{data.selectedType}</th>
                                            <th className=' text-white text-[16px]'>{data.socialLink}</th>
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

export default Social_Deshboard_List