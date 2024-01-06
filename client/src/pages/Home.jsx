import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const category = useLocation().search;

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

  const setColor = (cat) => {
    let color = "";
    switch (cat) {
      case "politics":
        color = "slategray";
        break;
      case "sport":
        color = "green";
        break;
      case "fashion":
        color = "navy";
        break;
      case "technology":
        color = "teal";
        break;
      case "auto":
        color = "maroon";
        break;
      case "fun":
        color = "chocolate";
        break;
      default:
        color = "";
    }
    return color;
  };

  const getText = (html) => {
    const document = new DOMParser().parseFromString(html, "text/html");
    return document.body.textContent;
  };

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`http://localhost:9000/api/news/fixed/${category}`);
      setPosts(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <h1 className="font-bold text-2xl m-4 text-slate-950">Latest News</h1>

      {posts.map((post) => (
        <div
          className="overflow-hidden p-2 w-full h-auto flex flex-col my-6 border-2 border-gray-300 rounded-md shadow-lg hover:border-gray-500 md:flex-row md:items-center md:w-[60%] md:ml-10 transition-all"
          key={post.id}
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
            <h1 className="font-bold text-lg md:text-xl">
              {getText(post.title).length > 40
                ? getText(post.title).substring(0, 40).concat("...")
                : getText(post.title)}
            </h1>
            <p className="text-gray-600 md:text-md">
              {getText(post.desc).length > 80
                ? getText(post.desc).substring(0, 80).concat("...")
                : getText(post.desc)}
            </p>
          </Link>
        </div>
      ))}
      <button type="button" className="py-1 px-2 ml-10 mb-5 rounded text-slate-100 bg-slate-900 hover:bg-slate-950 transition-all" onClick={() => fetchPosts(10)}>Load More</button>
    </div>
  );
};

export default Home;
