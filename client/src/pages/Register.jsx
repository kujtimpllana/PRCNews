import logo from "../assets/img/prc_news_logo_black.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useFormik } from "formik";
import { registerValidation } from "./validations/authValidation";

import axios from "axios";

const Register = () => {
  const initialValues = {
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const { confirmPassword, ...data } = values;
      const response = await axios.post(
        "http://localhost:9000/api/auth/register",
        data
      );
      if (response) {
        toast.success("Successfully registered");
        setTimeout(() => {
          navigate("/login");
        }, 2500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
    initialValues: initialValues,
    validationSchema: registerValidation,
    onSubmit: onSubmit,
  });

  return (
    <div className="flex flex-col p-10 w-full h-[100vh] justify-center items-center bg-gray-500">
      <div className="mb-10">
        <img src={logo} alt="PRC News Login" width="200px" />
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label className="mt-2 p-1" htmlFor="fullname">
          Full Name:
        </label>
        <input
          className="mt-2 indent-2 p-1 rounded-full text-slate-950"
          type="text"
          id="fullname"
          name="fullname"
          placeholder="John Doe"
          value={values.fullname}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
        />

        {errors.fullname && (
          <small className="bg-red-950 text-gray-100 rounded-full text-center p-1 mt-1">
            {errors.fullname}
          </small>
        )}

        <label className="mt-2 p-1" htmlFor="email">
          Email:
        </label>
        <input
          className="mt-2 indent-2 p-1 rounded-full text-slate-950"
          type="text"
          id="email"
          name="email"
          placeholder="johndoe@domain.ext"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        {errors.email && (
          <small className="bg-red-950 text-gray-100 rounded-full text-center p-1 mt-1">
            {errors.email}
          </small>
        )}

        <label className="mt-2 p-1" htmlFor="password">
          Password:
        </label>
        <input
          className="mt-2 indent-2 p-1 rounded-full text-slate-950"
          type="password"
          id="password"
          name="password"
          placeholder="************"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        {errors.password && (
          <small className="bg-red-950 text-gray-100 rounded-full text-center p-1 mt-1">
            {errors.password}
          </small>
        )}

        <label className="mt-2 p-1" htmlFor="cpassword">
          Re-enter Password:
        </label>
        <input
          className="mt-2 indent-2 p-1 rounded-full text-slate-950"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="************"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        {errors.confirmPassword && (
          <small className="bg-red-950 text-gray-100 rounded-full text-center p-1 mt-1">
            {errors.confirmPassword}
          </small>
        )}

        <p className="my-2">
          Already have an account?{" "}
          <Link to="/login">
            <span className="underline cursor-pointer">Login here</span>
          </Link>
          .
        </p>

        <button
          type="submit"
          className=" w-full mt-4 py-1 px-3 border-2 border-gray-950 text-gray-950 hover:bg-slate-950 hover:text-slate-100 rounded-full"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
