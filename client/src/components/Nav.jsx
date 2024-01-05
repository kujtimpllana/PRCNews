import { useState } from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="flex justify-center items-center w-full md:h-12 bg-slate-100 text-gray-950">
      <ul className="flex flex-col gap-y-3 md:flex-row gap-x-6 text-center py-4">
        <Link to="/">
          <li className="font-poppins uppercase font-semibold py-1 px-3 hover:bg-[#000711] hover:text-slate-100 rounded transition-all">
            News
          </li>
        </Link>
        <Link to="/?cat=politics">
          <li className="font-poppins uppercase font-semibold py-1 px-3 hover:bg-[slategray] hover:text-slate-100 rounded transition-all">
            Politics
          </li>
        </Link>
        <Link to="/?cat=sport">
          <li className="font-poppins uppercase font-semibold py-1 px-3 hover:bg-[green] hover:text-slate-100 rounded transition-all">
            Sport
          </li>
        </Link>
        <Link to="/?cat=fashion">
          <li className="font-poppins uppercase font-semibold py-1 px-3 hover:bg-[navy] hover:text-slate-100 rounded transition-all">
            Fashion
          </li>
        </Link>
        <Link to="/?cat=technology">
          <li className="font-poppins uppercase font-semibold py-1 px-3 hover:bg-[teal] hover:text-slate-100 rounded transition-all">
            Technology
          </li>
        </Link>
        <Link to="/?cat=auto">
          <li className="font-poppins uppercase font-semibold py-1 px-3 hover:bg-[maroon] hover:text-slate-100 rounded transition-all">
            Auto
          </li>
        </Link>
        <Link to="/?cat=fun">
          <li className="font-poppins uppercase font-semibold py-1 px-3 hover:bg-[chocolate] hover:text-slate-100 rounded transition-all">
            Fun
          </li>
        </Link>
      </ul>
    </nav>
  );
};

export default Nav;
