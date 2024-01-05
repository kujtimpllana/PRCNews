import { useContext, useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import AdminDashboard from "../components/AdminDashboard";
import { FaPen, FaTrash } from "react-icons/fa";

import { AuthContext } from "../context/authContext";
import axios from "axios";

const Admin = () => {
  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);

  if (!currentUser || currentUser.role !== "1") navigate("/");

  const [users, setUsers] = useState([]);

  const role = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/api/users/${role}`);
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [role]);

  const fetchDataAfterDeletion = async () => {
    try {
      const res = await axios.get(`http://localhost:9000/api/users/${role}`);
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/api/users/${id}`, {
        withCredentials: "include",
      });
    } catch (err) {
      console.log(err);
    }
    fetchDataAfterDeletion();
  };

  console.log(currentUser);

  return (
    <div className="text-slate-900">
      <AdminDashboard />
      <div className="mb-4 mt-10 flex justify-center">
        <h1 className="font-bold text-xl w-fit border-b-4 border-red-900">
          User Management
        </h1>
      </div>
      <div className="flex justify-center p-2 border-b-2 border-gray-200 gap-[15px]">
        <Link to="/admin">
          <button className="py-1 px-3 hover:bg-gray-800  hover:text-slate-100 rounded transition-all">
            All Users
          </button>
        </Link>
        <Link to="/admin?user=0">
          <button className="py-1 px-3 hover:bg-gray-800  hover:text-slate-100 rounded transition-all">
            Simple Users
          </button>
        </Link>
        <Link to="/admin?user=2">
          <button className="py-1 px-3 hover:bg-gray-800  hover:text-slate-100 rounded transition-all">
            Journalists
          </button>
        </Link>
        <Link to="/admin?user=1">
          <button className="py-1 px-3 hover:bg-gray-800  hover:text-slate-100 rounded transition-all">
            Administrators
          </button>
        </Link>
      </div>
      <div className="my-10 h-auto">
        <table className="border-collapse w-full">
          <thead>
            <tr>
              <th className="p-[8px] text-left">ID</th>
              <th className="p-[8px] text-left">Full Name</th>
              <th className="p-[8px] text-left">Email</th>
              <th className="p-[8px] text-left">Role</th>
              <th className="p-[8px] text-left">Edit</th>
              <th className="p-[8px] text-left">Delete</th>
            </tr>
          </thead>
          {users.map((user) => (
            <tbody key={user.id}>
              <tr className="border-b border-slate-400">
                <td className="p-[8px]">{user?.id}</td>
                <td className="p-[8px]">
                  {currentUser.fullname === user.fullname
                    ? user?.fullname + " (You)"
                    : user?.fullname}
                </td>
                <td className="p-[8px]">{user?.email}</td>
                <td className="p-[8px]">{user?.role}</td>
                <td className="py-[8px]">
                  <Link to={`/admin/update/${user.id}`}>
                    <FaPen className="hover:text-yellow-800 transition-all" />
                  </Link>
                </td>
                <td className="py-[8px]">
                  <Link onClick={() => handleDelete(user.id)} to="/admin">
                    {user?.role === "1" ? (
                      <></>
                    ) : (
                      <FaTrash className="hover:text-red-800 cursor-pointer transition-all" />
                    )}
                  </Link>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Admin;
