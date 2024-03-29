import logo from "../assets/img/prc_news_logo_black.svg";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <>
      <div className="my-12 w-full m-auto h-auto flex flex-col items-center md:flex-row md:w-[80%]">
        <div className="bg-[#D0A650] p-12 h-[85vh] w-[80%] flex flex-1 flex-col justify-center items-center rounded-t md:items-end md:rounded-l md:rounded-t-none">
          <img
            src={logo}
            alt="Contact PRC News"
            width="200px"
            className="mb-12"
          />
          <h1 className="mb-1 uppercase font-bold text-lg">Reach Us</h1>
          <p className="mt-6">
            <b>Email</b>: info@prc-news.ks
          </p>
          <p className="mt-2">
            <b>Phone</b>: +383-XX-XXX-XXX
          </p>
          <p className="mt-2">
            <b>Address</b>: Pristina, Kosova. Unknown St.
          </p>
        </div>
        <form className="p-12 flex flex-1 flex-col bg-[#244AA5] w-[80%] h-[85vh] rounded-b text-slate-100 md:rounded-r md:rounded-b-none">
          <h1 className="my-2 uppercase font-bold text-lg text-center">
            Fill out the form
          </h1>
          <label className="mt-2 p-1" htmlFor="name">
            Name:
          </label>
          <input
            className="mt-2 indent-2 p-1 rounded text-slate-950"
            type="text"
            id="name"
            placeholder="John Doe"
            required
          />

          <label className="mt-2 p-1" htmlFor="email">
            Email:
          </label>
          <input
            className="mt-2 indent-2 p-1 rounded text-slate-950"
            type="email"
            id="email"
            placeholder="example@example.ex"
            required
          />

          <label className="mt-2 p-1" htmlFor="number">
            Phone Number:
          </label>
          <input
            className="mt-2 indent-2 p-1 rounded text-slate-950"
            type="text"
            id="number"
            placeholder="+383XXXXXXXX"
            required
          />

          <label className="mt-2 p-1" htmlFor="subject">
            Subject:
          </label>
          <input
            className="mt-2 indent-2 p-1 rounded text-slate-950"
            type="text"
            id="subject"
            placeholder="Subject"
            required
          />

          <label className="mt-2 p-1" htmlFor="message">
            Message:
          </label>
          <textarea
            className="mt-2 indent-2 p-1 rounded text-slate-950"
            name=""
            id="message"
            cols="40"
            rows="10"
            placeholder="Your message"
          ></textarea>

          <Link to="/">
            <button
              type="button"
              className=" w-full mt-4 py-1 px-3 border-2 border-slate-100 text-slate-100 hover:bg-slate-100 hover:text-[#244AA5] rounded transition-all"
            >
              Send
            </button>
          </Link>
        </form>
      </div>
    </>
  );
};

export default Contact;
