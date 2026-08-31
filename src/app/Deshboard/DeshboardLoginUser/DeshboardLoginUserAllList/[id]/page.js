'use client'
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { fetchUserDataGet, patchfetchUser } from '@/redux/features/Auth/authSlice';

function User_data_update() {

  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const params = useParams();
  const id = params?.id;
  const [singledata, setSingledata] = useState(null);

  useEffect(() => {
    dispatch(fetchUserDataGet());
  }, [dispatch]);

  useEffect(() => {
    if (user?.length && id) {
      const data = user.find(n => String(n.id) === String(id));
      if (data) {
        setSingledata(data);
      }
    }
  }, [user, id]);



  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!singledata?.id) {
      Swal.fire("Error", "No data found", "error");
      return;
    }

    const form = e.target;

    const data = {
      name: form.name.value,
      role: form.role.value
    };

    try {
      const resultAction = await dispatch(
        patchfetchUser({ id, data })
      );

      if (patchfetchUser.fulfilled.match(resultAction)) {
        Swal.fire("Success", "Data updated successfully", "success");
      } else {
        throw new Error(resultAction.payload);
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };


  return (
    <div className='m-10 px-10 py-10 border border-[#9EFF00] rounded-2xl'>
      <h1 className='text-4xl font-semibold uppercase text-center border-b pb-6 text-white'>User Data Update</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
        </div>
        <legend className=" font-semibold pt-5 text-white text-lg">Name</legend>
        <input defaultValue={singledata?.name || ''} type="text" name='name' className="input w-full  text-lg" placeholder="Name" required />
        <legend className="text-lg font-semibold pt-5 text-white">Email</legend>
        <input defaultValue={singledata?.email || ''} type="email" name='email' className="input w-full " placeholder="Email" readOnly required />
        <legend className="text-lg font-semibold pt-5 text-white pb-2">User Type Role</legend>
        <select defaultValue={singledata?.role || ''} name="role" className="select w-full text-lg" required >
          <option disabled value="">Select User Type</option>
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
        <div className='mt-6'>
          <button type="submit" className='btn w-full shadow-2xs rounded-full bg-[#9EFF00] text-lg text-black'>
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default User_data_update;
