import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { useFormik } from "formik";
import { profileEditPassword } from "../pages/validations/authValidation";
import { FaSdCard } from "react-icons/fa";

const ProfileInfo = ({ currentUser, logout }) => {
  const inputValues = {
    fullname: currentUser.fullname || "",
    email: currentUser.email || "",
    password: "",
    role: currentUser.role || "",
  };

  const navigate = useNavigate();

  const handleEditSubmit = async (e) => {
    try {
      await axios.put(
        `http://localhost:9000/api/users/profile/data/${currentUser.id}`,
        values
      );
      await logout();
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
    initialValues: inputValues,
    validationSchema: profileEditPassword,
    onSubmit: handleEditSubmit,
  });

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full">
      <label className="mt-2 p-1" htmlFor="fullname">
        Full Name:
      </label>
      <input
        className="mt-2 indent-2 p-1 rounded text-slate-950"
        type="text"
        id="fullname"
        name="fullname"
        placeholder="John Doe"
        value={values.fullname || ""}
        // onChange={(e) =>
        //   setInputValues({ ...inputValues, fullname: e.target.value })
        // }
        onChange={handleChange}
        onBlur={handleBlur}
        autoFocus
      />

      <label className="mt-2 p-1" htmlFor="email">
        Email:
      </label>
      <input
        className="mt-2 indent-2 p-1 rounded text-slate-950"
        type="text"
        id="email"
        name="email"
        placeholder="example@example.com"
        value={values.email || ""}
        // onChange={(e) =>
        //   setInputValues({ ...inputValues, email: e.target.value })
        // }
        onChange={handleChange}
        onBlur={handleBlur}
        autoFocus
      />

      <label className="mt-2 p-1" htmlFor="role">
        Password:
      </label>
      <input
        className="mt-2 indent-2 p-1 rounded text-slate-950"
        type="password"
        id="password"
        name="password"
        placeholder="**********"
        value={values.password || ""}
        // onChange={(e) =>
        //   setInputValues({ ...inputValues, password: e.target.value })
        // }
        onChange={handleChange}
        onBlur={handleBlur}
        autoFocus
      />

      {errors.password && (
        <small className="bg-red-950 text-gray-100 rounded text-center p-1 mt-1">
          {errors.password}
        </small>
      )}

      <button
        type="submit"
        className="flex gap-2 items-center w-full my-7 py-2 px-6 bg-green-900 text-slate-100 hover:bg-green-800 rounded transition-all"
      >
        Confirm Changes
        <FaSdCard />
      </button>
    </form>
  );
};

export default ProfileInfo;
