import React, { useEffect } from 'react'
import { FaEdit, FaPlus } from 'react-icons/fa'
import { MdDeleteForever, } from 'react-icons/md'
import Swal from 'sweetalert2'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { fetchNewsDataDelete, fetchNewsDataGet } from '@/redux/features/news/newsSlice'

function DeshboardNewsAllDataList() {

    const dispatch = useDispatch();
    const { allNews } = useSelector(state => state.news)

    useEffect(() => {
        dispatch(fetchNewsDataGet())
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
                await dispatch(fetchNewsDataDelete(id));
                Swal.fire("Deleted!", "News deleted successfully", "success");
            } catch (err) {
                Swal.fire("Error", err.message, "error");
            }
        }
    };


    return (
        <div>
            <div className='pt-10 '>
                <h1 className='text-4xl font-semibold text-center text-white py-14'> News All Data List</h1>
                <div className=' flex items-end px-10'>
                    <Link href={'/Deshboard/DeshboardNews/DeshboardNewsAllDataForm'}>
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
                                    <th className='text-lg text-white '>News Title</th>
                                    <th className='text-lg text-white '>Posted Date</th>
                                    <th className='text-lg text-white '>Edit</th>
                                    <th className='text-lg text-white '>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allNews.map((data, index) => (
                                        <tr key={data.id}>

                                            <th className=' text-white text-[16px]'>{index + 1}</th>
                                            <td className=' text-white text-[16px]'>
                                                {data.newsTitle}
                                            </td>
                                            <td className=' text-white text-[16px]'>
                                                <span className=' text-lg pr-2'>{new Date(data.createdAt).getDate()}</span>
                                                <span className=' text-lg'>{new Date(data.createdAt).toLocaleString('en-US', { month: 'short' })}</span>
                                            </td>
                                            <td className='text-3xl text-center text-white cursor-pointer '>
                                                <Link href={`DeshboardNewsAllDataList/${data.id}`}><FaEdit /></Link>
                                            </td>
                                            <td
                                                onClick={()=>handleDelete(data.id)}
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

export default DeshboardNewsAllDataList