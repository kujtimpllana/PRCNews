import logo from "../assets/img/prc_news_logo_black.svg";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

import { AuthContext } from "../context/authContext";
import { loginValidation } from "./validations/authValidation";
import { useFormik } from "formik";

import { getText } from "../pages/helper";

const Login = () => {
  const initialValues = { email: "", password: "" };

  const [err, setErr] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const onSubmit = async (values) => {
    try {
      setIsSubmitting(true);
      await login(values);
      toast.success("Successfully logged in");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      setErr("Something went wrong, please try again!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
    initialValues: initialValues,
    validationSchema: loginValidation,
    onSubmit: onSubmit,
  });

  return (
    <>
      <Header />
      <Nav />
      <div className="flex flex-col p-10 w-full h-[100vh] justify-center items-center bg-gray-500">
        <div className="mb-10 hover:scale-110 transition-all">
          <Link to="/">
            <img src={logo} alt="PRC News Logo" width="200px" />
          </Link>
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
            value={getText(values.email)}
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
            value={getText(values.password)}
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

          <Link to="/register">
            <p className="my-2">
              Don't you have an account?{" "}
              <span className="underline cursor-pointer">Sign up here</span>.
            </p>
          </Link>
          <Link to="/">
            <p className="my-2 underline cursor-pointer">
              Get back to the main page {">"}
            </p>
          </Link>
          <button
            type="submit"
            className="w-full mt-4 py-1 px-3 border-2 border-gray-950 text-gray-950 hover:bg-slate-950 hover:text-slate-100 rounded transition-all"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Login;
