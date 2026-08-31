import React, { useEffect } from 'react'
import { FaEdit, FaPlus } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'
import Swal from 'sweetalert2'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { deletefetchContact, fetchContactDataGet } from '@/redux/features/contact/contactSlice'

function DeshboardContactList() {


    const dispatch = useDispatch();
    const { contactData } = useSelector(state => state.contact)

    useEffect(() => {
        dispatch(fetchContactDataGet())
    }, [dispatch])



    const handleDelete = async (id) => {
        try {
            const confirm = await Swal.fire({
                title: "Are you sure?",
                text: "This image will be deleted permanently!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            });
            if (confirm.isConfirmed) {
                await dispatch(deletefetchContact(id));
                Swal.fire({
                    title: "Deleted!",
                    text: "Your image has been deleted.",
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
                <h1 className='text-4xl font-semibold text-center text-white py-14'> Contact All Data List</h1>
                <div className=' flex items-end px-10'>
                    <Link href={'/Deshboard/DeshboardContact/DeshboardContactForm'}>
                        <div className=' h-8 w-20 border-2 rounded-full flex items-center justify-center cursor-pointer mb-3 gap-x-2'>
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
                                    <th className='text-lg text-white '>Full Posted Title</th>
                                    <th className='text-lg text-white '>Edit</th>
                                    <th className='text-lg text-white '>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    contactData.map((data, index) => (
                                        <tr key={data.id}>
                                            <th className=' text-white text-[16px]'>{index + 1}</th>
                                            <td className=' text-white text-[16px]'>{data.postedType}</td>
                                            <td className=' text-white text-[16px]'>{data.FieldOne}</td>
                                            <td className='text-3xl text-center text-white cursor-pointer'>
                                                <Link href={`DeshboardContactList/${data.id}`}><FaEdit /></Link>
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

export default DeshboardContactList