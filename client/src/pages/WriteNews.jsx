import { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import axios from "axios";
import moment from "moment";

import { AuthContext } from "../context/authContext";
import { getText } from "../pages/helper";
import { FaUpload } from "react-icons/fa";

const WriteNews = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  //getting state from post details
  const state = useLocation().state;
  const [title, setTitle] = useState(state?.title || "");
  const [value, setValue] = useState(state?.desc || "");
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState(state?.category || "");

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!currentUser || currentUser.role !== "2") navigate("/");
  }, []);

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(
        "http://localhost:9000/api/upload",
        formData
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      setIsSubmitting(true);
      !state &&
        (await axios.post(
          `http://localhost:9000/api/news/`,
          {
            title: getText(title),
            desc: getText(value),
            category: getText(category),
            img: file ? getText(imgUrl) : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          },
          { withCredentials: "include" }
        ));
      navigate("/");
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();
    try {
      setIsSubmitting(true);
      state &&
        (await axios.put(
          `http://localhost:9000/api/news/${state.id}`,
          {
            title: getText(title),
            desc: getText(value),
            category: getText(category),
            img: file ? getText(imgUrl) : "",
          },
          { withCredentials: true }
        ));
      navigate("/");
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // const getText = (html) => {
  //   const document = new DOMParser().parseFromString(html, "text/html");
  //   return document.body.textContent;
  // };

  return (
    <div className="mt-[20px] p-8 flex flex-col gap-[20px] md:flex md:flex-row md:items-start">
      <div className="mb-14 flex-[5] flex flex-col gap-[20px] md:w-0">
        <input
          type="text"
          placeholder="Title"
          className="p-[10px] border-2 border-gray-200 rounded"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <div className="h-[340px] overflow-x-sdscroll">
          <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            className="h-[100%] border-0 z-[0] rounded"
          />
        </div>
      </div>
      <div className="flex-[2] flex flex-col gap-[20px]">
        <div className="border-2 border-gray-200 rounded p-[10px] flex-[1] flex flex-col gap-[20px] justify-between text-gray-800">
          <h1 className="font-bold text-lg">Publish</h1>
          <label
            htmlFor="file"
            className="flex gap-2 justify-center items-center text-slate-100 bg-slate-800 w-[140px] h-auto text-center cursor-pointer p-1 rounded hover:bg-slate-900 transition-all"
          >
            Upload Image <FaUpload />
          </label>
          <input
            style={{ display: "none" }}
            type="file"
            name=""
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <div className="flex justify-evenly">
            {state && (
              <button
                onClick={handleEdit}
                className="bg-green-800 hover:bg-green-700 text-gray-100 px-4 py-1 transition-all rounded"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save"}
              </button>
            )}
            {!state && (
              <button
                onClick={handleClick}
                className="bg-yellow-700 hover:bg-yellow-600 text-gray-100 px-4 py-1 transition-all rounded"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Publishing..." : "Publish"}
              </button>
            )}
          </div>
        </div>
        <div className="border-2 border-gray-200 rounded p-[10px] flex flex-col gap-[15px] flex-[1]">
          <h1 className="font-bold text-lg">Category</h1>
          <div className="flex gap-[5px]">
            <input
              type="radio"
              checked={category === "politics"}
              name="cat"
              value="politics"
              id="politics"
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor="politics">Politics</label>
          </div>
          <div className="flex gap-[5px]">
            <input
              type="radio"
              checked={category === "sport"}
              name="cat"
              value="sport"
              id="sport"
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor="sport">Sport</label>
          </div>
          <div className="flex gap-[5px]">
            <input
              type="radio"
              checked={category === "fashion"}
              name="cat"
              value="fashion"
              id="fashion"
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor="fashion">Fashion</label>
          </div>
          <div className="flex gap-[5px]">
            <input
              type="radio"
              checked={category === "auto"}
              name="cat"
              value="auto"
              id="auto"
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor="auto">Auto</label>
          </div>
          <div className="flex gap-[5px]">
            <input
              type="radio"
              checked={category === "technology"}
              name="cat"
              value="technology"
              id="technology"
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="flex gap-[5px]">
            <input
              type="radio"
              checked={category === "fun"}
              name="cat"
              value="fun"
              id="fun"
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor="fun">Fun</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteNews;
