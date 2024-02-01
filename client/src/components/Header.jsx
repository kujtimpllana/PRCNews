import logo from "../assets/img/prc_news_logo.svg";
import { FaAd, FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import {
  FaUser,
  FaDoorOpen,
  FaBriefcase,
  FaAddressBook,
  FaChartLine,
  FaFeather,
  FaCaretDown,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import UserProfileDropDown from "./UserProfileDropDown";

const Header = () => {
  const [nav, setNav] = useState(false);

  const [profileDrop, setProfileDrop] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className="bg-[#000711] text-slate-100">
      <div className="flex justify-between items-center h-16 max-w-[1440px] mx-auto px-4 text-slate-100">
        <Link to="/">
          <img src={logo} alt="PRC News" width="140px" />
        </Link>
        <ul className="hidden md:flex items-center gap-6 font-bold">
          <Link to="/">
            <div className="flex gap-2 items-center py-1 px-2 rounded hover:bg-slate-100 hover:text-slate-950 transition-all">
              <FaDoorOpen />
              <li className="font-poppins ">Home</li>
            </div>
          </Link>
          <Link to="/about">
            <div className="flex gap-2 items-center py-1 px-2 rounded hover:bg-slate-100 hover:text-slate-950 transition-all">
              <FaBriefcase />
              <li className="font-poppins">About</li>
            </div>
          </Link>
          <Link to="/contact">
            <div className="flex gap-2 items-center py-1 px-2 rounded hover:bg-slate-100 hover:text-slate-950 transition-all">
              <FaAddressBook />
              <li className="font-poppins">Contact</li>
            </div>
          </Link>
          {currentUser?.role === "1" && (
            <Link to="/admin">
              <div className="flex gap-2 items-center py-1 px-2 rounded hover:bg-slate-100 hover:text-slate-950 transition-all">
                <FaChartLine />
                <li className="font-poppins">Dashboard</li>
              </div>
            </Link>
          )}
          {currentUser?.role === "2" && (
            <Link to="/write">
              <div className="flex gap-2 items-center py-1 px-2 rounded hover:bg-slate-100 hover:text-slate-950 transition-all">
                <FaFeather />
                <li className="font-poppins">Write News</li>
              </div>
            </Link>
          )}
          {currentUser?.fullname && (
            <div
              className="relative"
              onClick={() => setProfileDrop((prev) => !prev)}
            >
              <div className="flex gap-2 items-center text-[#D0A650] hover:text-red-800 cursor-pointer transition-all">
                {currentUser?.profile_photo ? (
                  <img
                    className="rounded"
                    width={38}
                    height={38}
                    src={`../public/pictures/${currentUser?.profile_photo}`}
                  />
                ) : (
                  <FaUser />
                )}
                <span className="font-poppins text-center flex items-center gap-1">
                  {currentUser?.fullname}
                </span>
                <FaCaretDown />
              </div>
              {profileDrop && <UserProfileDropDown />}
            </div>
          )}
          {!currentUser?.fullname && (
            <Link to="/login">
              <li className="font-poppins py-1 px-2 rounded border-2 border-[#244AA5] text-[#244AA5]  hover:bg-[#244AA5] hover:text-slate-100 transition-all">
                Login
              </li>
            </Link>
          )}
          {!currentUser?.fullname && (
            <Link to="/register">
              <li className="font-poppins py-1 px-2 rounded border-2 border-[#D0A650] text-[#D0A650] hover:bg-[#D0A650] hover:text-slate-900 transition-all">
                Sign Up
              </li>
            </Link>
          )}
          {currentUser?.fullname && (
            <Link to="/">
              <button
                onClick={logout}
                className="font-poppins py-1 px-2 rounded border-2 border-red-900 text-red-900 text-center hover:bg-red-900 hover:text-gray-100 transition-all"
              >
                Logout
              </button>
            </Link>
          )}
        </ul>
        <div onClick={handleNav} className="block md:hidden">
          {nav ? <AiOutlineClose size={20} /> : <FaBars size={20} />}
        </div>
        <div
          className={
            nav === true
              ? "z-[1] fixed left-0 top-0 w-[85%] h-full flex flex-col items-center border-r border-r-gray-900 bg-slate-950 transition-all"
              : "fixed left-[-100%]"
          }
        >
          <img src={logo} alt="PRC News" width="200px" className="m-4" />
          <ul className="flex flex-col gap-12 mt-12 text-lg font-bold w-full">
            <Link to="/">
              <div className="flex gap-2 justify-center items-center py-2 hover:bg-slate-100 hover:text-slate-950 text-center transition-all">
                <FaDoorOpen />
                <li className="font-poppins">Home</li>
              </div>
            </Link>
            <Link to="/about">
              <div className="flex gap-2 justify-center items-center py-2 hover:bg-slate-100 hover:text-slate-950 text-center transition-all">
                <FaBriefcase />
                <li className="font-poppins">About</li>
              </div>
            </Link>
            <Link to="/contact">
              <div className="flex gap-2 justify-center items-center py-2 hover:bg-slate-100 hover:text-slate-950 text-center transition-all">
                <FaAddressBook />
                <li className="font-poppins">Contact</li>
              </div>
            </Link>
            {currentUser?.role === "1" && (
              <Link to="/admin">
                <div className="flex gap-2 justify-center items-center py-2 hover:bg-slate-100 hover:text-slate-950 text-center transition-all">
                  <FaChartLine />
                  <li className="font-poppins">Dashboard</li>
                </div>
              </Link>
            )}
            {currentUser?.role === "2" && (
              <Link to="/write">
                <div className="flex gap-2 justify-center items-center py-2 hover:bg-slate-100 hover:text-slate-950 text-center transition-all">
                  <FaFeather />
                  <li className="font-poppins">Write News</li>
                </div>
              </Link>
            )}
            <hr />
            {currentUser?.fullname && (
              <div
                className="relative"
                onClick={() => setProfileDrop((prev) => !prev)}
              >
                <div className="flex gap-2 items-center justify-center text-[#D0A650] hover:text-red-800 cursor-pointer transition-all">
                  {currentUser?.profile_photo ? (
                    <img
                      className="rounded"
                      width={38}
                      height={38}
                      src={`../public/pictures/${currentUser?.profile_photo}`}
                    />
                  ) : (
                    <FaUser />
                  )}
                  <span className="font-poppins text-center flex items-center gap-1">
                    {currentUser?.fullname}
                  </span>
                  <FaCaretDown />
                </div>
                {profileDrop && <UserProfileDropDown />}
              </div>
            )}
            {!currentUser?.fullname && (
              <Link to="/login">
                <li className="font-poppins py-2 hover:bg-[#244AA5] hover:text-slate-100 text-center transition-all">
                  Login
                </li>
              </Link>
            )}
            {!currentUser?.fullname && (
              <Link to="/register">
                <li className="font-poppins py-2 hover:bg-[#D0A650] text-center hover:text-slate-950 transition-all">
                  Sign Up
                </li>
              </Link>
            )}
            {currentUser?.fullname && (
              <Link to="/">
                <button
                  onClick={logout}
                  className="font-poppins py-1 px-2 text-red-900 text-center w-full hover:bg-red-900 hover:text-gray-100 transition-all"
                >
                  Logout
                </button>
              </Link>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
