import { useContext } from "react";
import { FaUserSecret } from "react-icons/fa";

import { AuthContext } from "../context/authContext";

const AdminDashboard = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <nav className="flex justify-start px-3 gap-[5px] items-center w-full md:h-12 bg-slate-100 text-gray-950">
      <div>
        <h1 className="font-bold">Administrator:</h1>
      </div>
      <div className="flex gap-[5px]">
        <FaUserSecret size={25} />
        <p>{currentUser?.role === "1" && currentUser?.fullname}</p>
      </div>
    </nav>
  );
};

export default AdminDashboard;
