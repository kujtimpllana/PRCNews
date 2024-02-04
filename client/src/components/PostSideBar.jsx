import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const PostSideBar = ({ category, postId }) => {
  const [posts, setPosts] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `http://localhost:9000/api/news/?cat=${category}`
        );
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [category]);

  return (
    <>
      {isLoading ? (
        <span
          className="loader"
          style={{
            display: "block",
            width: "2rem",
            height: "2rem",
            marginTop: "1rem",
            marginLeft: "1rem",
            marginBottom: "1rem",
          }}
        ></span>
      ) : (
        <div className="flex flex-col gap-[25px] mb-6 text-slate-800">
          {posts.length > 1 && (
            <h1 className="font-bold text-slate-800 text-lg">
              You might also be interested in:
            </h1>
          )}
          {posts
            .filter((post) => post.id != postId)
            .map((post) => (
              <Link to={`/post/${post.id}`} key={post.id}>
                <div
                  className="flex flex-col gap-[10px] hover:underline"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <img
                    src={`../uploads/${post?.img}`}
                    className="w-[100%] h-[200px] object-cover rounded opacity-95 hover:opacity-100 transition-all duration-[150ms]"
                    alt=""
                  />
                  <h2 className="font-bold text-md">{post.title}</h2>
                </div>
              </Link>
            ))}
        </div>
      )}
    </>
  );
};

export default PostSideBar;
