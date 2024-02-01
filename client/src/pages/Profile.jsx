import React from "react";
import logo from "../assets/img/prc_news_logo_black.svg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";

import { AuthContext } from "../context/authContext";
import ProfileInfo from "../components/ProfileInfo";
import ProfilePicture from "../components/ProfilePicture";

const Profile = () => {
  const { currentUser, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) navigate("/");
  }, [currentUser]);

  const location = useLocation();
  const path = location.search.split("=")[1] || "";

  return (
    <div className="flex flex-col p-10 py-20 w-full h-[100vh] items-center bg-gray-500">
      <div className="mb-10 hover:scale-110 cursor-pointer transition-all">
        <img src={logo} alt="PRC News Logo" width="200px" />
      </div>
      <div>
        <h2 className="text-2xl uppercase mb-4 font-semibold w-fit border-b-4 border-red-900">
          Profile Management
        </h2>
      </div>

      <ul className="flex justify-center items-center w-full gap-8 cursor-pointer">
        <Link to="/profile?edit=data">
          {path == "data" ? (
            <li className="py-1 px-3 my-5 text-slate-100 border-2 border-slate-900 bg-slate-900 hover:bg-slate-950 rounded transition-all">
              Profile
            </li>
          ) : (
            <li className="py-1 px-3 my-5 border-2 border-slate-900 text-slate-900 hover:text-slate-100  hover:bg-slate-950 rounded transition-all">
              Profile
            </li>
          )}
        </Link>
        <Link to="/profile?edit=image">
          {path === "image" ? (
            <li className="py-1 px-3 my-5 border-2 border-slate-900 text-slate-100 bg-slate-900 hover:bg-slate-950 rounded transition-all">
              Picture
            </li>
          ) : (
            <li className="py-1 px-3  my-5 border-2 border-slate-900  text-slate-900 hover:text-slate-100 hover:bg-slate-900 rounded transition-all">
              Picture
            </li>
          )}
        </Link>
      </ul>

      <div>
        {path === "data" ? (
          <ProfileInfo currentUser={currentUser} logout={logout} />
        ) : (
          <ProfilePicture currentUser={currentUser} logout={logout} />
        )}
      </div>
    </div>
  );
};

export default Profile;
