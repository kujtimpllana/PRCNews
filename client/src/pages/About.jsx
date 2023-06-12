import logo from "../assets/img/prc_news_logo_black.svg";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      <div className="flex justify-center items-center w-full h-96 mt-14">
        <div className="bg-[#D0A650] w-[80%] flex flex-col items-center justify-center p-10 text-gray-950">
          <img src={logo} alt="About PRC News" width="200px" />
          <h1 className="mt-6 uppercase font-bold text-xl border-b-2 border-gray-950">
            About Us
          </h1>
          <p className="mt-4">
            We are an online newspaper, located in <b>Pristina, Kosova</b>. You
            can follow the latest news in Kosova and region at us.
          </p>
          <p className="mt-2">
            Our goal is to provide you with <b>accurate</b> and{" "}
            <b>real-time information</b>.
          </p>
          <p className="mt-2">For more information, feel free to contact us:</p>
          <Link to="/contact">
            <button
              type="button"
              className="mt-4 py-1 px-3 border-2 border-[#244AA5]  text-[#244AA5] hover:bg-[#244AA5] hover:text-slate-100 rounded-full"
            >
              Contact PRCNews
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default About;
