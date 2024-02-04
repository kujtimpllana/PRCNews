import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaPen,
  FaTrash,
  FaUser,
  FaBookmark,
  FaRegBookmark,
} from "react-icons/fa";
import PostSideBar from "../components/PostSideBar";

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/authContext";
import Comment from "../components/Comment";

import { getText } from "../pages/helper";

const PostDetails = () => {
  const [post, setPost] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);

  const [bookmarks, setBookmarks] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/api/news/${postId}`);
        setPost(res.data);
        const bookmark_res = await axios.get(
          `http://localhost:9000/api/bookmark/save/${postId}`,
          { withCredentials: "include" }
        );
        setBookmarks(bookmark_res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      setIsSubmitting(true);
      await axios.delete(`http://localhost:9000/api/news/${postId}`, {
        withCredentials: "include",
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveBookmark = async () => {
    try {
      setIsSubmitting(true);
      await axios.post(
        `http://localhost:9000/api/bookmark/save/${postId}`,
        { isSaved: "true" },
        {
          withCredentials: "include",
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
    fetchDataAfterDeletion();
  };

  const handleDeleteBookmark = async () => {
    try {
      setIsSubmitting(true);
      await axios.delete(`http://localhost:9000/api/bookmark/save/${postId}`, {
        withCredentials: "include",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
    fetchDataAfterDeletion();
  };

  const fetchDataAfterDeletion = async () => {
    try {
      const bookmark_res = await axios.get(
        `http://localhost:9000/api/bookmark/save/${postId}`,
        { withCredentials: "include" }
      );
      setBookmarks(bookmark_res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // const getText = (html) => {
  //   const document = new DOMParser().parseFromString(html, "text/html");
  //   return document.body.textContent;
  // };

  return (
    <>
      <div className="flex flex-col gap-10 px-6 mt-6 md:flex-row md:w-full">
        <div className="md:flex-[5]">
          <img
            src={`../uploads/${post?.img}`}
            className="w-full md:h-[450px] object-cover rounded"
            alt={`${post?.title}`}
          />
          <div className="flex items-center justify-between gap-[10px] my-6">
            <div className="flex gap-[10px] items-center">
              {post.profile_photo ? (
                <img
                  src={`../../public/pictures/${post?.profile_photo}`}
                  className="w-[60px] h-[60px] rounded-full object-cover"
                  alt="Journalist Profile Picture"
                />
              ) : (
                <FaUser className="w-[60px] h-[60px] rounded-full object-cover p-1 border-2 border-slate-900" />
              )}
              <div className="">
                <span className="font-bold text-slate-950">
                  {post?.fullname}
                </span>
                <p className="text-slate-900">
                  Posted {moment(post.date).fromNow()}
                </p>
              </div>
              {currentUser?.fullname === post?.fullname && (
                <div className="flex gap-[10px] text-gray-800">
                  <Link to={`/write?edit=${post.id}`} state={post}>
                    <FaPen className="hover:text-yellow-800 cursor-pointer transition-all" />
                  </Link>
                  <button onClick={handleDelete} disabled={isSubmitting}>
                    <FaTrash className="hover:text-red-800 cursor-pointer transition-all" />
                  </button>
                </div>
              )}
            </div>
            <div className="flex items-center">
              {bookmarks[0]?.saved_status == "true" ? (
                <button onClick={handleDeleteBookmark} disabled={isSubmitting}>
                  <FaBookmark className="text-2xl cursor-pointer" />
                </button>
              ) : (
                <button onClick={handleSaveBookmark} disabled={isSubmitting}>
                  <FaRegBookmark className="text-2xl cursor-pointer" />
                </button>
              )}
            </div>
          </div>
          <div className="mb-10">
            <h1 className="font-bold text-slate-950 text-lg mb-4">
              {getText(post.title)}
            </h1>
            <p className="text-slate-900 text-justify leading-7">
              {getText(post.desc)}
            </p>
          </div>
        </div>
        <div className="md:flex-[2]">
          <PostSideBar category={post.category} postId={postId} />
        </div>
      </div>
      <div className="flex flex-col gap-10 px-6 my-10">
        <Comment currentUser={currentUser ? currentUser : ""} postId={postId} />
      </div>
    </>
  );
};

export default PostDetails;
