import { useContext } from "react";
import { FaUserSecret } from "react-icons/fa";

import { AuthContext } from "../context/authContext";

const AdminDashboard = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <nav className="flex justify-start py-2 px-3 gap-[5px] items-center w-full md:h-12 bg-slate-100 text-gray-950">
      <div>
        <h1 className="font-bold">Administrator:</h1>
      </div>
      <div className="flex items-center gap-[5px]">
        {currentUser?.profile_photo ? (
          <img
            className="rounded object-cover"
            width={36}
            height={36}
            src={`../../public/pictures/${currentUser?.profile_photo}`}
          />
        ) : (
          <FaUserSecret size={25} />
        )}

        <p>{currentUser?.role === "1" && currentUser?.fullname}</p>
      </div>
    </nav>
  );
};

export default AdminDashboard;
