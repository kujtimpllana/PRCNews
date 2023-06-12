import { Link } from "react-router-dom";

const NotFound404 = () => {
  return (
    <div className="flex flex-col justify-center items-center text-[#000711] bg-slate-100 h-[100vh] gap-[30px]">
      <h1 className="text-4xl">
        <b>404</b> - Page not found!
      </h1>
      <p className="text-lg">
        <Link to="/" className="font-bold underline">
          Get back to main page
        </Link>
      </p>
    </div>
  );
};

export default NotFound404;
