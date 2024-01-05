import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const PostSideBar = ({ category, postId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:9000/api/news/?cat=${category}`
        );
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [category]);

  return (
    <div className="flex flex-col gap-[25px] mb-6 text-gray-800">
      {posts
        .filter((post) => post.id != postId)
        .map((post) => (
          <Link to={`/post/${post.id}`}>
            <h1 className="font-bold text-lg">
              You also might be interested in
            </h1>
            <div className="flex flex-col gap-[10px]" key={post.id}>
              <img
                src={`../uploads/${post?.img}`}
                className="w-[100%] h-[200px] object-cover rounded"
                alt=""
              />
              <h2 className="font-bold text-md">{post.title}</h2>
              <button className="w-[115px] h-[35px] border-2 border-gray-800 hover:bg-gray-800 hover:text-gray-100 rounded transition-all">
                Read more
              </button>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default PostSideBar;
