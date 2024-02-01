import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUpload, FaUser, FaSdCard } from "react-icons/fa";

import axios from "axios";

const ProfilePicture = ({ currentUser, logout }) => {
  const [file, setFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("picture", file);
      const res = await axios.post(
        "http://localhost:9000/api/picture",
        formData
      );
      setErrorMsg(res.data.error_msg);
      setSuccessMsg(res.data.success_msg);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSavePicture = async () => {
    const imgUrl = await upload();
    console.log(imgUrl);
    console.log(file);
    try {
      await axios.patch(
        `http://localhost:9000/api/users/profile/picture/${currentUser.id}`,
        { profile_photo: file ? imgUrl.file : "" },
        { withCredentials: "include" }
      );
      if (!errorMsg) {
        setTimeout(async () => {
          await logout();
          navigate("/login");
        }, 1500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col py-6">
      {!currentUser.profile_photo ? (
        <FaUser className="border-2 p-2 border-slate-900 rounded w-[220px] h-[220px] hover:border-slate-950 " />
      ) : (
        <img
          src={`../public/pictures/${currentUser.profile_photo}`}
          alt="User Profile Picture"
          width={220}
          height={220}
          className="border-2 p-2 border-slate-900 rounded object-cover hover:border-slate-950"
        />
      )}

      <div>
        {errorMsg && (
          <p className="text-xs mt-3 text-slate-100 text-center py-2 bg-red-800 rounded">
            {errorMsg}
          </p>
        )}
      </div>
      <div>
        {successMsg && (
          <p className="text-xs mt-3 text-slate-100 text-center py-2 bg-green-800 rounded">
            {successMsg}
          </p>
        )}
      </div>
      <form encType="multipart/form-data">
        <div className="flex flex-col my-6">
          <label
            htmlFor="picture"
            className="flex gap-2 justify-center items-center border-2 border-[#D0A650] rounded text-slate-900 py-2 px-4 cursor-pointer hover:bg-[#D0A650] transition-all"
          >
            {currentUser.profile_photo ? "Change Photo" : "Upload Photo"}
            <FaUpload />
          </label>

          <input
            type="file"
            id="picture"
            name="picture"
            accept="image/*"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div>
          {file && (
            <button
              className="flex gap-2 items-center bg-green-900 rounded text-slate-100 py-2 px-6 cursor-pointer hover:bg-green-800 transition-all"
              type="button"
              onClick={handleSavePicture}
            >
              Save
              <FaSdCard />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProfilePicture;
