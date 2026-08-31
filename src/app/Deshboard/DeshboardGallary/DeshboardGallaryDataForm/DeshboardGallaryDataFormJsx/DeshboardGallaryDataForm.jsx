'use client'

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { TiPlus } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { fetchGallaryDataPost } from "@/redux/features/gallary/gallarySlice";


function DeshboardGallaryDataForm() {


  const [increseDescripton, setincreseDescripton] = useState([]);
  const dispatch = useDispatch()


  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const width = form.width.value;
    const mainImage = form.image.files[0];

    const formData = new FormData();

    formData.append("width", width);
    formData.append("image", mainImage);

    const dynamicDescriptions = [];

    increseDescripton.forEach((_, index) => {
      const sectionWidth = form[`width${index}`]?.value;
      const sectionImage = form[`image${index}`]?.files[0];

      if (!sectionWidth || !sectionImage) return;

      dynamicDescriptions.push({
        width: sectionWidth
      });

      formData.append("dynamicImages", sectionImage);
    });

    formData.append(
      "dynamicDescriptions",
      JSON.stringify(dynamicDescriptions)
    );

    try {
      const resultAction = await dispatch(fetchGallaryDataPost(formData));

      if (fetchGallaryDataPost.fulfilled.match(resultAction)) {
        Swal.fire("Success", "Gallery posted successfully", "success");
        form.reset();
        setincreseDescripton([]);
      } else {
        throw new Error(resultAction.payload);
      }

    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };



  const addSection = () => {
    setincreseDescripton(prev => [...prev, { id: Date.now() }]);
  };


  return (
    <div className='m-10 px-10 py-10 border border-[#9EFF00] rounded-2xl'>
      <h1 className='text-4xl font-semibold uppercase text-center border-b pb-6 text-white'>Gallary Image Post Form</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <legend className="text-lg font-semibold pt-5 text-white">Image Width (max width 12 cols) </legend>
          <input type="number" name='width' className="input w-full text-lg" placeholder="Image Width  " required />
        </div>
        <div>
          <legend className="text-lg font-semibold pt-5 text-white">Choose Doctor Image </legend>
          <input type="file" name='image' className="input w-full text-lg" placeholder="Choose Image" required />
        </div>
        <div className='py-4 flex justify-between items-center'>
          <h4 className='text-2xl font-semibold uppercase text-white'>Increase Description</h4>
          <button
            type="button"
            className='btn bg-[#9EFF00] border-none text-5xl font-semibold text-black'
            onClick={addSection}
          >
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
            <div className='gap-3'>
              <div className=' gap-3'>
                <div>
                  <legend className="text-lg font-semibold pt-5 text-white">Image Width (max width 12 cols) </legend>
                  <input
                    type="number"
                    name={`width${index}`}
                    className="input w-full  text-lg"
                    placeholder="Image Width"
                    required
                  />
                </div>
                <div>
                  <legend className="text-lg font-semibold pt-5 text-white">Choose Doctor Image </legend>
                  <input
                    type="file"
                    name={`image${index}`}
                    className="input w-full text-lg"
                    placeholder="Choose Image"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
        <button type="submit" className='btn w-full bg-[#9EFF00] border-none text-black mt-10 text-lg font-semibold'>
          Submit
        </button>
      </form>
    </div>
  )
}

export default DeshboardGallaryDataForm