import logo from "../assets/img/prc_news_logo_black.svg";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { AuthContext } from "../context/authContext";
import { loginValidation } from "./validations/authValidation";
import { useFormik } from "formik";

const Login = () => {
  const initialValues = { email: "", password: "" };

  const [err, setErr] = useState("");

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const onSubmit = async (values) => {
    try {
      const response = await login(values);

      toast.success("Successfully logged in");
      setTimeout(() => {
        navigate("/");
      }, 2500);
    } catch (error) {
      setErr("Something went wrong, please try again!");
    }
  };

  const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
    initialValues: initialValues,
    validationSchema: loginValidation,
    onSubmit: onSubmit,
  });

  return (
    <div className="flex flex-col p-10 w-full h-[100vh] justify-center items-center bg-gray-500">
      <div className="mb-10">
        <img src={logo} alt="PRC News Login" width="200px" />
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label className="mt-2 p-1" htmlFor="email">
          Email:
        </label>
        <input
          className="mt-2 indent-2 p-1 rounded text-slate-950"
          type="text"
          id="email"
          name="email"
          placeholder="johndoe@domain.ext"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
        />

        {errors.email && (
          <small className="bg-red-950 text-gray-100 rounded text-center p-1 mt-1">
            {errors.email}
          </small>
        )}

        <label className="mt-2 p-1" htmlFor="password">
          Password:
        </label>
        <input
          className="mt-2 indent-2 p-1 rounded text-slate-950"
          type="password"
          id="password"
          name="password"
          placeholder="************"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        {errors.password && (
          <small className="bg-red-950 text-gray-100 rounded text-center p-1 mt-1">
            {errors.password}
          </small>
        )}

        {err && (
          <small className="bg-red-950 text-gray-100 rounded text-center p-1 mt-1">
            {err}
          </small>
        )}

        <p className="my-2">
          Don't you have an account?{" "}
          <Link to="/register">
            <span className="underline cursor-pointer">Sign up here</span>
          </Link>
          .
        </p>

        <button
          type="submit"
          className=" w-full mt-4 py-1 px-3 border-2 border-gray-950 text-gray-950 hover:bg-slate-950 hover:text-slate-100 rounded transition-all"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
