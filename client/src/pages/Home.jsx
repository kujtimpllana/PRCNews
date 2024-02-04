import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

import { FaSearchengin } from "react-icons/fa";
import { setColor, loadMoreBtnStyle, getText } from "./helper";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [totalNumOfPosts, setTotalNumOfPosts] = useState(0);
  const [searchInput, setSearchInput] = useState("");

  const category = useLocation().search;
  const ref = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:9000/api/news/total/${category}`
        );
        setTotalNumOfPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [category]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:9000/api/news/${category}`
        );
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [category]);

  const fetchPostsByFixedSize = async () => {
    try {
      const res = await axios.get(
        `http://localhost:9000/api/news/fixed/${category}`
      );
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFocus = () => {
    ref.current.style.borderColor = "#64748b";
    ref.current.style.borderRadius = "0.375rem";
  };

  return (
    <>
      <h1 className="font-bold text-2xl m-4 text-slate-950">Latest News</h1>
      {posts.length == 0 ? (
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
          {!category.includes("cat") && (
            <div
              ref={ref}
              className="flex gap-2 px-2 text-slate-900 border-2 border-slate-300 rounded-md justify-start items-center mx-[1rem] w-[80%] md:w-[60%] md:ml-10"
              onClick={handleFocus}
            >
              <label htmlFor="search" className="hover:cursor-pointer text-xl">
                <FaSearchengin className="text-slate-500" />
              </label>
              <input
                type="text"
                id="search"
                name="search"
                placeholder="Search news..."
                className="p-2 w-full rounded-md"
                onChange={(event) => setSearchInput(event.target.value)}
                value={searchInput}
                style={{ border: "none", outline: "none" }}
              />
              {searchInput.length > 0 && (
                <button
                  type="button"
                  className="font-semibold text-slate-500 hover:text-red-700 transition-all"
                  onClick={() => setSearchInput("")}
                >
                  X
                </button>
              )}
            </div>
          )}
          {searchInput
            ? posts
                .filter((post) =>
                  post.title
                    .toLowerCase()
                    .trim()
                    .includes(searchInput.toLowerCase().trim())
                )
                .map((post) => (
                  <div
                    className="overflow-hidden p-2 h-auto flex flex-col my-6 mx-[1rem] border-2 border-slate-300 rounded-md shadow-lg md:hover:ml-[4.5rem] md:flex-row md:items-center md:w-[60%] md:ml-10 transition-all duration-[250ms]"
                    key={post.id}
                    id="post-container"
                    style={{
                      "--hover-border-color": `${setColor(post.category)}`,
                    }}
                  >
                    <Link
                      to={`/post/${post.id}`}
                      className="w-[100%] h-[165px] flex items-center md:w-[55%] md:h-[250px]"
                    >
                      <img
                        src={`../uploads/${post.img}`}
                        alt={post.title}
                        className="h-full w-full object-cover rounded-md"
                      />
                    </Link>

                    <Link
                      to={`/post/${post.id}`}
                      className="w-[100%] h-[100px] flex flex-col mt-3 md:justify-evenly md:px-4 md:w-[50%] md:h-[150px]"
                    >
                      <p
                        style={{
                          color: setColor(post.category),
                          textTransform: "uppercase",
                          fontWeight: "bold",
                          fontFamily: "Roboto Slab",
                        }}
                      >
                        {post.category}
                      </p>
                      <h1 className="font-bold text-slate-950 text-lg md:text-xl">
                        {getText(post.title).length > 40
                          ? getText(post.title).substring(0, 40).concat("...")
                          : getText(post.title)}
                      </h1>
                      <p className="text-slate-900 md:text-md">
                        {getText(post.desc).length > 80
                          ? getText(post.desc).substring(0, 80).concat("...")
                          : getText(post.desc)}
                      </p>
                    </Link>
                  </div>
                ))
            : posts.map((post) => (
                <div
                  className="overflow-hidden p-2 h-auto flex flex-col my-6 mx-[1rem] border-2 border-slate-300 rounded-md shadow-lg md:hover:ml-[4.5rem] md:flex-row md:items-center md:w-[60%] md:ml-10 transition-all duration-[250ms]"
                  key={post.id}
                  id="post-container"
                  style={{
                    "--hover-border-color": `${setColor(post.category)}`,
                  }}
                >
                  <Link
                    to={`/post/${post.id}`}
                    className="w-[100%] h-[165px] flex items-center md:w-[55%] md:h-[250px]"
                  >
                    <img
                      src={`../uploads/${post.img}`}
                      alt={post.title}
                      className="h-full w-full object-cover rounded-md"
                    />
                  </Link>

                  <Link
                    to={`/post/${post.id}`}
                    className="w-[100%] h-[100px] flex flex-col mt-3 md:justify-evenly md:px-4 md:w-[50%] md:h-[150px]"
                  >
                    <p
                      style={{
                        color: setColor(post.category),
                        textTransform: "uppercase",
                        fontWeight: "bold",
                        fontFamily: "Roboto Slab",
                      }}
                    >
                      {post.category}
                    </p>
                    <h1 className="font-bold text-slate-950 text-lg md:text-xl">
                      {getText(post.title).length > 40
                        ? getText(post.title).substring(0, 40).concat("...")
                        : getText(post.title)}
                    </h1>
                    <p className="text-slate-900 md:text-md">
                      {getText(post.desc).length > 80
                        ? getText(post.desc).substring(0, 80).concat("...")
                        : getText(post.desc)}
                    </p>
                  </Link>
                </div>
              ))}
          {posts.length < totalNumOfPosts && (
            <button
              type="button"
              className="py-1 px-3 ml-10 my-5 rounded text-slate-100 bg-slate-900 hover:bg-slate-950 transition-all"
              onClick={() => fetchPostsByFixedSize()}
              style={{
                display: loadMoreBtnStyle(posts.length, totalNumOfPosts),
              }}
            >
              {searchInput ? "Search" : "Load More"}
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default Home;
