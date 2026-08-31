'use client'

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { TiPlus } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { postfetchMissionVissionObject } from "@/redux/features/Home/missionVissionObjectSlice";


function Home_Mission_Vission_Ovject_Image_Form() {


  const dispatch = useDispatch();
  const { mission_vission_object } = useSelector(state => state.misssionVissionObject)

  const [posttype, setPostType] = useState("Text")
  const [increseDescripton, setincreseDescripton] = useState([]);

  const addSection = () => {
    setincreseDescripton(prev => [...prev, { id: Date.now() }]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData();

    // Send postType, not BannerType
    const postType = form.BannerType.value;
    formData.append("postType", postType); // <-- backend expects this name

    if (postType === "Text") {
      formData.append("Title", form.Title.value);
      formData.append("Description", form.Description.value);

      const dynamicDescriptions = increseDescripton.map((_, index) => ({
        title: form[`title${index}`]?.value || "",
        description: form[`description${index}`]?.value || "",
      }));

      formData.append("dynamicDescriptions", JSON.stringify(dynamicDescriptions));
    }

    if (postType === "Image") {
      const imageFile = form.Image.files[0];
      if (!imageFile) {
        Swal.fire("Error", "Please choose an image", "error");
        return;
      }
      formData.append("image", imageFile); 
    }

    try {
      const resultAction = await dispatch(postfetchMissionVissionObject(formData));

      if (postfetchMissionVissionObject.fulfilled.match(resultAction)) {
        Swal.fire("Success", "Data posted successfully", "success");
        form.reset();
        setincreseDescripton([]);
      } else {
        throw new Error(resultAction.payload);
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };


  return (
    <div className='m-10 px-10 py-10 border border-[#9EFF00] rounded-2xl'>
      <h1 className='text-4xl font-semibold uppercase text-center border-b pb-6 text-white'>Home Mission Vission Ovject Data Form</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <legend className="text-lg font-semibold pt-5 text-white pb-2">Choose Post Type </legend>
          <select
            value={posttype}
            onChange={(e) => setPostType(e.target.value)}
            defaultValue="Pick a color"
            name="BannerType"
            className="select w-full  text-lg" required>
            <option disabled={true} className="  text-lg">Select Post Type</option>
            <option className=" text-lg">Text</option>
            <option className=" text-lg">Image</option>
          </select>
        </div>
        {
          posttype === "Text" && (
            <>
              <div>
                <legend className="text-lg font-semibold pt-5 text-white">Title </legend>
                <input type="text" name='Title' className="input w-full  text-lg" placeholder=" Title" required />
              </div>
              <div>
                <legend className="text-lg font-semibold pt-5 text-white">Short Overview</legend>
                <textarea className="textarea w-full  text-lg" name='Description' placeholder="Over View " rows={12} required></textarea>
              </div>
              <div className='py-4 flex justify-between items-center'>
                <h4 className='text-2xl font-semibold uppercase text-white'>Increase Description</h4>
                <button type="button"
                  className='btn bg-[#9EFF00] border-none text-5xl font-semibold text-black'
                  onClick={addSection}>
                  <TiPlus />
                </button>
              </div>
          
              {increseDescripton.map((section, index) => (
                <div key={section.id} className='py-10 pb-16'>
                  <div>
                    <h4 className='text-xl font-semibold btn bg-[#9EFF00] text-black rounded-full px-10'>
                      Section {index + 1}
                    </h4>
                  </div>
                  <div>
                    <legend className="text-lg font-semibold pt-5 text-white">Description Title</legend>
                    <input type="text" name={`title${index}`} className="input w-full text-lg " placeholder="Description Title" required />
                  </div>
                  <div>
                    <legend className="text-lg font-semibold pt-5 text-white">Description</legend>
                    <textarea className="textarea w-full  text-lg" name={`description${index}`} placeholder="Description" rows={12} required></textarea>
                  </div>
                </div>
              ))}
            </>
          )
        }
        {
          posttype === "Image" && (
            <div>
              <legend className="text-lg font-semibold pt-5 text-white">Choose Image</legend>
              <input type="file" name='Image' className="input w-full  text-lg" placeholder="Choose Image" required />
            </div>
          )
        }
        <button type="submit" className='btn w-full bg-[#9EFF00] border-none text-black mt-10 text-lg font-semibold'>
          Submit
        </button>
      </form>
    </div>
  )
}

export default Home_Mission_Vission_Ovject_Image_Form