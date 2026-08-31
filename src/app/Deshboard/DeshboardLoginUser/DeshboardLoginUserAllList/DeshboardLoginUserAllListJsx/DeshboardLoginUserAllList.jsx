'use client'
import React, { useEffect } from 'react'
import { FaEdit } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'
import Swal from 'sweetalert2'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { deletefetchUser, fetchUserDataGet } from '@/redux/features/Auth/authSlice'

function DeshboardLoginUserAllList() {


    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(fetchUserDataGet())
    }, [dispatch])


    const handleDelete = async (id) => {
        try {
            const confirm = await Swal.fire({
                title: "Are you sure?",
                text: "This user will be deleted permanently!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            });

            if (confirm.isConfirmed) {
                await dispatch(deletefetchUser(id));
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
                <h1 className='text-4xl font-semibold text-center text-white py-14'> Register All User Data</h1>
                <div className='px-10 '>
                    <div className="overflow-x-auto">
                        <table className="table ">
                            <thead>
                                <tr>
                                    <th className='text-lg text-white text-center'>Id</th>
                                    <th className='text-lg text-white text-center'>User Name</th>
                                    <th className='text-lg text-white text-center'>User Email</th>
                                    <th className='text-lg text-white text-center'>Email Verified</th>
                                    <th className='text-lg text-white text-center'>User Type</th>
                                    <th className='text-lg text-white text-center'>Edit</th>
                                    <th className='text-lg text-white text-center'>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    user.map((data, index) => (
                                        <tr key={data.id}>

                                            <th className=' text-white text-[16px] text-center'>{index + 1}</th>
                                            <td className=' text-white text-[16px] text-center'>{data.name}</td>
                                            <td className=' text-white text-[16px] text-center'>{data.email}</td>
                                            <td className='text-white text-[16px] text-center'>{data.isVerified ? 'true' : 'false'}</td>
                                            <td className=' text-white text-[16px] text-center' >{data.role}</td>
                                            <td className='text-3xl flex justify-center text-white cursor-pointer '>
                                               <Link href={`/Deshboard/DeshboardLoginUser/DeshboardLoginUserAllList/${data.id}`}><FaEdit /></Link>
                                            </td>
                                            <td
                                                onClick={() => handleDelete(data.id)}
                                                className='text-4xl text-red-700 cursor-pointer text-center '>
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

export default DeshboardLoginUserAllList