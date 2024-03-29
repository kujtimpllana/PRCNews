import logo from "../assets/img/prc_news_logo_black.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useFormik } from "formik";
import { registerValidation } from "./validations/authValidation";

import axios from "axios";

import Header from "../components/Header";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

import { getText } from "../pages/helper";

const Register = () => {
  const initialValues = {
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      setIsSubmitting(true);
      const { confirmPassword, ...data } = values;
      const response = await axios.post(
        "http://localhost:9000/api/auth/register",
        data
      );
      if (response) {
        toast.success("Successfully registered");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
    initialValues: initialValues,
    validationSchema: registerValidation,
    onSubmit: onSubmit,
  });

  return (
    <>
      <Header />
      <Nav />

      <div className="flex flex-col p-10 w-full h-[100vh] justify-center items-center bg-gray-500">
        <div className="mb-10 hover:scale-110 cursor-pointer transition-all">
          <img src={logo} alt="PRC News Logo" width="200px" />
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="mt-2 p-1" htmlFor="fullname">
            Full Name:
          </label>
          <input
            className="mt-2 indent-2 p-1 rounded text-slate-950"
            type="text"
            id="fullname"
            name="fullname"
            placeholder="John Doe"
            value={getText(values.fullname)}
            onChange={handleChange}
            onBlur={handleBlur}
            autoFocus
          />

          {errors.fullname && (
            <small className="bg-red-950 text-gray-100 rounded text-center p-1 mt-1">
              {errors.fullname}
            </small>
          )}

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

          <label className="mt-2 p-1" htmlFor="cpassword">
            Re-enter Password:
          </label>
          <input
            className="mt-2 indent-2 p-1 rounded text-slate-950"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="************"
            value={getText(values.confirmPassword)}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          {errors.confirmPassword && (
            <small className="bg-red-950 text-gray-100 rounded text-center p-1 mt-1">
              {errors.confirmPassword}
            </small>
          )}
          <Link to="/login">
            <p className="my-2">
              Already have an account?{" "}
              <span className="underline cursor-pointer">Login here</span>.
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
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Register;
