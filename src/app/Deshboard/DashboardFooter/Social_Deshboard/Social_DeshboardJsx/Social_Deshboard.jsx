'use client'

import { postfetchFooter } from "@/redux/features/footer/footerSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

function Social_Deshboard() {

  const [selectedType, setSelectedType] = useState("Facebook")
  const dispatch = useDispatch();
  const { footerData } = useSelector(state => state.footer)


  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const data = {
      selectedType: form.selectedType.value,
      socialLink: form.socialLink.value,
    };

    try {
      const resultAction = await dispatch(postfetchFooter(data));

      if (postfetchFooter.fulfilled.match(resultAction)) {
        Swal.fire("Success", "Data Post successfully", "success");
      } else {
        throw new Error(resultAction.payload);
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };



  return (
    <div className='m-10 px-10 py-10 border border-[#9EFF00] rounded-2xl'>

      <h1 className='text-4xl font-semibold uppercase text-center border-b pb-6 text-white'>Social Media Link Post Form</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <legend className="text-lg font-semibold pt-5 text-white pb-2">Choose Post Type </legend>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            defaultValue="Select Social Media"
            name="selectedType"
            className="select w-full text-lg" required>
            <option disabled={true} className=" text-lg">Select Post Type</option>
            <option className=" text-lg">Facebook</option>
            <option className=" text-lg">Youtube</option>
            <option className=" text-lg">Twitter</option>
            <option className=" text-lg">Linkedin</option>
          </select>
        </div>
        {
          selectedType === "Facebook" && (
            <>
              <div>
                <legend className="text-lg font-semibold pt-5 text-white">Facebook URL  </legend>
                <input type="url" name='socialLink' className="input w-full  text-lg" placeholder="Facebook URL" required />
              </div>
            </>
          )
        }
        {
          selectedType === "Youtube" && (
            <>
              <div>
                <legend className="text-lg font-semibold pt-5 text-white">YouTube URL</legend>
                <input type="url" name='socialLink' className="input w-full  text-lg" placeholder="YouTube URL" required />
              </div>
            </>
          )
        }
        {
          selectedType === "Twitter" && (
            <>
              <div>
                <legend className="text-lg font-semibold pt-5 text-white">Twitter URL </legend>
                <input type="text" name='socialLink' className="input w-full  text-lg" placeholder="Twitter URL" required />
              </div>
            </>
          )
        }
        {
          selectedType === "Linkedin" && (
            <>
              <div>
                <legend className="text-lg font-semibold pt-5 text-white">Linkedin URL</legend>
                <input type="text" name='socialLink' className="input w-full  text-lg" placeholder="Linkedin URL" required />
              </div>
            </>
          )
        }
        <button type="submit" className='btn w-full bg-[#9EFF00] border-none text-black mt-10 text-lg font-semibold'>
          Submit
        </button>

      </form>
    </div>
  )
}

export default Social_Deshboard
