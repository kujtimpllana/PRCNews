import logo from "../assets/img/prc_news_logo_black.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminDashboard from "../components/AdminDashboard";
import { useEffect, useState } from "react";

import axios from "axios";
import DOMPurify from "dompurify";

const AdminEdit = () => {
  //grab id from URL
  const { id } = useParams();
  const [values, setValues] = useState({
    //default values
    id: id,
    fullname: "",
    email: "",
    role: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/api/users/${id}`);
        console.log(res.data);
        setValues({
          ...values,
          fullname: res.data[0].fullname,
          email: res.data[0].email,
          role: res.data[0].role,
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await axios.put(`http://localhost:9000/api/users/${id}`, values);
      navigate("/admin");
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AdminDashboard />
      <div className="flex flex-col p-10 w-full h-[100vh] justify-center items-center bg-gray-500">
        <div className="mb-10">
          <img src={logo} alt="PRC News Login" width="200px" />
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
            value={values.fullname || ""}
            onChange={(e) =>
              setValues({
                ...values,
                fullname: DOMPurify.sanitize(e.target.value),
              })
            }
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
            onChange={(e) =>
              setValues({
                ...values,
                email: DOMPurify.sanitize(e.target.value),
              })
            }
          />

          <label className="mt-2 p-1" htmlFor="role">
            Role:
          </label>
          <input
            className="mt-2 indent-2 p-1 rounded text-slate-950"
            type="text"
            id="role"
            name="role"
            placeholder="0(Simple), 1(Admin) & 2(Journalist)"
            value={values.role || ""}
            onChange={(e) =>
              setValues({ ...values, role: DOMPurify.sanitize(e.target.value) })
            }
          />

          <p className="my-2">
            Get back to admin page?{" "}
            <Link to="/admin">
              <span className="underline cursor-pointer">Admin Page</span>
            </Link>
            .
          </p>
          <button
            className="w-full mt-4 py-1 px-3 border-2 border-gray-950 text-gray-950 hover:bg-slate-950 hover:text-slate-100 rounded"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Confirming Changes..." : "Confirm Changes"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AdminEdit;
