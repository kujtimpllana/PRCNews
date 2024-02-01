import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaBookmark } from "react-icons/fa";

const UserProfileDropDown = () => {
  return (
    <div className="flex flex-col left-[4.8rem] text-center w-[12rem] md:left-0 md:w-[9rem] custom-user-drop-style">
      <ul className="flex flex-col gap-3">
        <Link to={"/profile?edit=data"}>
          <div className="flex gap-1 justify-left items-center hover:text-red-800 transition-all">
            <FaUser />
            <li className="font-poppins capitalize  cursor-pointer">Profile</li>
          </div>
        </Link>
        <Link to={"/archive"}>
          <div className="flex gap-1 justify-left items-center hover:text-red-800 transition-all">
            <FaBookmark />
            <li className="font-poppins capitalize  cursor-pointer">Saved</li>
          </div>
        </Link>
      </ul>
    </div>
  );
};

export default UserProfileDropDown;
