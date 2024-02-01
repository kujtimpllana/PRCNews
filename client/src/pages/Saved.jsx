import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import { getText, setColor } from "./helper";

const Saved = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:9000/api/bookmark/saved/posts",
          { withCredentials: "include" }
        );
        setBookmarks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h1 className="font-bold text-2xl m-4 text-slate-950">Saved Posts</h1>
      {bookmarks.length == 0 ? (
        <span
          className="loader"
          style={{
            width: "2rem",
            height: "2rem",
            marginLeft: "1rem",
            marginBottom: "1rem",
          }}
        ></span>
      ) : (
        <div>
          {bookmarks.map((bookmark) => (
            <div
              className="overflow-hidden p-2 h-auto flex flex-col my-6 mx-[1rem] border-2 border-slate-300 rounded-md shadow-lg md:hover:ml-[4.5rem] md:flex-row md:items-center md:w-[60%] md:ml-10 transition-all duration-[250ms]"
              key={bookmark.id}
              id="post-container"
              style={{
                "--hover-border-color": `${setColor(bookmark.category)}`,
              }}
            >
              <Link
                to={`/post/${bookmark.id}`}
                className="w-[100%] h-[165px] flex items-center md:w-[55%] md:h-[250px]"
              >
                <img
                  src={`../uploads/${bookmark.img}`}
                  alt={bookmark.title}
                  className="h-full w-full object-cover rounded-md"
                />
              </Link>
              <Link
                to={`/post/${bookmark.id}`}
                className="w-[100%] h-[100px] flex flex-col mt-3 md:justify-evenly md:px-4 md:w-[50%] md:h-[150px]"
              >
                <p
                  style={{
                    color: setColor(bookmark.category),
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    fontFamily: "Roboto Slab",
                  }}
                >
                  {bookmark.category}
                </p>
                <h1 className="font-bold text-slate-950 text-lg md:text-xl">
                  {getText(bookmark.title).length > 40
                    ? getText(bookmark.title).substring(0, 40).concat("...")
                    : getText(bookmark.title)}
                </h1>
                <p className="text-slate-900 md:text-md">
                  {getText(bookmark.desc).length > 80
                    ? getText(bookmark.desc).substring(0, 80).concat("...")
                    : getText(bookmark.desc)}
                </p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Saved;
