'use client';

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchGallaryDataGet, fetchGallaryDataPatch } from "@/redux/features/gallary/gallarySlice";

function DeshboardGallaryDataForm() {
  const params = useParams();
  const id = params?.id;
  const [singledata, setSingleData] = useState(null);
  const dispatch = useDispatch();
  const { gallaryImage } = useSelector(state => state.gallary)

  // get id wise data
  useEffect(() => {
    if (!gallaryImage.length) {
      dispatch(fetchGallaryDataGet())
    } else if (id) {
      const data = gallaryImage.find(n => n.id === id)
      setSingleData(data)
    }
  }, [gallaryImage, id, dispatch]);



  // update data handler
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const width = form.width.value;
    const mainImage = form.image.files[0];

    const formData = new FormData();

    formData.append("width", width);
    formData.append("image", mainImage);

    const dynamicDescriptions = [];

    singledata?.dynamicDescriptions?.forEach((_, index) => {
      const sectionWidth = form[`width${index}`]?.value;
      const sectionImage = form[`image${index}`]?.files[0];

      if (!sectionWidth || !sectionImage) return;

      dynamicDescriptions.push({
        width: sectionWidth
      });
      if (sectionImage) {
        formData.append("dynamicImages", sectionImage);
      }
    });

    formData.append(
      "dynamicDescriptions",
      JSON.stringify(dynamicDescriptions)
    );

    try {
      if (!id) {
        Swal.fire("Error", "ID not found", "error");
        return;
      }

      const resultAction = await dispatch(fetchGallaryDataPatch({ id, formData }));

      if (fetchGallaryDataPatch.fulfilled.match(resultAction)) {
        Swal.fire("Success", "Gallery data update successfully", "success");
        form.reset();
      } else {
        throw new Error(resultAction.payload);
      }

    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };


  return (
    <div className='m-10 px-10 py-10 border border-[#9EFF00] rounded-2xl'>
      <h1 className='text-4xl font-semibold uppercase text-center border-b pb-6 text-white'>Gallary Image Update Form</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <legend className="text-lg font-semibold pt-5 text-white">Image Width (max width 12 cols)</legend>
          <input
            type="number"
            defaultValue={singledata?.width || ''}
            name='width'
            className="input w-full  text-lg"
            placeholder="Image Width"
          />
        </div>

        <div className="flex justify-between py-10">
          <div>
            <legend className="text-lg font-semibold pt-5 text-white">Choose Image</legend>
            <input
              type="file"
              name='image'
              className="input w-full  text-lg"
              placeholder="Choose Image"
            />
          </div>
          <div>
            <img src={singledata?.image} className="h-40 w-40 rounded-xl" alt="Selected" />
          </div>
        </div>

        {singledata?.dynamicDescriptions?.map((section, index) => (
          <div key={index} className='py-10 pb-16'>
            <div>
              <h4 className='text-xl font-semibold btn bg-[#9EFF00] text-black rounded-full px-10'>
                Section {index + 1}
              </h4>
            </div>
            <div>
              <legend className="text-lg font-semibold pt-5 ">Image Width</legend>
              <input
                type="number"
                defaultValue={section?.width || ''}
                name={`width${index}`}
                className="input w-full  text-lg"
                placeholder="Image Width"
              />

              <div className="flex justify-between py-10">
                <div>
                  <legend className="text-lg font-semibold pt-5 text-white">Choose Image</legend>
                  <input
                    type="file"
                    name={`image${index}`}
                    className="input w-full  text-lg"
                    placeholder="Choose Image"
                  />
                </div>
                <div>
                  <img src={section?.image || ""} className="h-40 w-40 rounded-xl" alt={`Section ${index + 1}`} />
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          type="submit"
          className='btn w-full bg-[#9EFF00] border-none text-black mt-10 text-lg font-semibold'>
          Update
        </button>
      </form>
    </div>
  );
}

export default DeshboardGallaryDataForm;
