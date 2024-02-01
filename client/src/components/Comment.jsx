import React, { useState, useEffect, useRef } from "react";
import { FaPen, FaTrash, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import moment from "moment";

const Comment = ({ currentUser, postId }) => {
  //Comments from back-end
  const [comments, setComments] = useState([]);

  const [isEditing, setIsEditing] = useState(false);

  const [input, setInput] = useState("");

  const reqData = {
    postId: postId ? postId : 0,
    description: input ? input : "",
  };

  const [updateComment, setUpdateComment] = useState({
    id: 0,
    nid: 0,
    user_id: currentUser.id,
  });

  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:9000/api/news/comment/total/${postId}`
        );
        setComments(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const clearComment = () => {
    setInput("");
  };

  const handleSubmitComment = async () => {
    try {
      await axios.post("http://localhost:9000/api/news/comment", reqData, {
        withCredentials: "include",
      });
      const res = await axios.get(
        `http://localhost:9000/api/news/comment/total/${postId}`
      );
      setComments(res.data);
    } catch (error) {
      console.log(error);
    }
    clearComment();
  };

  const handleEditComment = async () => {
    const values = {
      id: updateComment.id,
      nid: updateComment.nid,
      user_id: updateComment.user_id,
      description: input,
    };

    try {
      await axios.put(
        `http://localhost:9000/api/news/comment/update/${updateComment.id}`,
        values,
        { withCredentials: "include" }
      );
    } catch (error) {
      console.log(error);
    }
    setIsEditing(false);
    setInput("");

    //re-fetch comments
    const res = await axios.get(
      `http://localhost:9000/api/news/comment/total/${postId}`
    );
    setComments(res.data);
  };

  const handleSetEdit = async (
    comment_id,
    comment_nid,
    comment_description
  ) => {
    setInput(comment_description);
    setUpdateComment({
      id: comment_id,
      nid: comment_nid,
      user_id: currentUser.id,
    });
    setIsEditing(true);
    ref.current.focus();
    window.scrollTo(ref.current);
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(
        `http://localhost:9000/api/news/comment/delete/${commentId}`,
        {
          withCredentials: "include",
        }
      );
    } catch (error) {
      console.log(error);
    }
    //re-fetch comments
    const res = await axios.get(
      `http://localhost:9000/api/news/comment/total/${postId}`
    );
    setComments(res.data);
  };

  return (
    <div className="flex flex-col gap-7">
      {comments && (
        <h3 className="font-semibold text-slate-950 text-lg">
          Comments {`(${comments.length})`}
        </h3>
      )}
      {currentUser?.fullname && (
        <>
          <div className="flex flex-col gap-4 md:w-[70%] justify-center items-start border-2 border-slate-950 border-opacity-[.4] rounded py-2 px-5">
            {currentUser?.profile_photo ? (
              <div className="flex gap-3 items-center">
                <img
                  src={`../../public/pictures/${currentUser?.profile_photo}`}
                  className="w-[40px] h-[40px] rounded-full object-cover"
                  alt="Commenter Profile Picture"
                />
                <span className="font-semibold text-slate-950">
                  {currentUser?.fullname}
                </span>
              </div>
            ) : (
              <div className="flex gap-3 items-center">
                <FaUser className="w-[40px] h-[40px] p-1 border-2 border-slate-950 rounded-full object-cover" />
                <span className="font-semibold text-slate-950">
                  {currentUser?.fullname}
                </span>
              </div>
            )}

            <textarea
              type="textarea"
              name="comment"
              placeholder="Write your comment..."
              className="text-sm text-slate-900 w-full border-2 border-slate-950 border-opacity-[.4] rounded py-2 px-2 min-h-[4rem]"
              rows={3}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              ref={ref}
            />
            <div className="flex w-full justify-end gap-3 text-sm text-slate-900">
              <button
                type="button"
                className="py-1 px-3 rounded text-slate-100 bg-red-900 hover:bg-red-800 cursor-pointer transition-all"
                onClick={clearComment}
              >
                Clear
              </button>
              <button
                type="button"
                className="py-1 px-3 rounded text-slate-100 bg-green-900 hover:bg-green-800 cursor-pointer transition-all"
                onClick={isEditing ? handleEditComment : handleSubmitComment}
                disabled={input.length <= 1}
              >
                {isEditing ? "Update" : "Publish"}
              </button>
            </div>
          </div>
        </>
      )}

      {comments &&
        comments
          .filter((comment) => comment.nid == postId)
          .map((comment) => (
            <div
              key={comment.id}
              className="flex flex-col gap-4 md:w-[70%] justify-center items-start border-2 border-slate-950 border-opacity-[.4] rounded py-2 px-5"
            >
              <div className="flex items-center gap-3">
                {comment?.profile_photo ? (
                  <img
                    src={`../../public/pictures/${comment?.profile_photo}`}
                    className="w-[40px] h-[40px] rounded-full object-cover"
                    alt="Commenter Profile Picture"
                  />
                ) : (
                  <FaUser className="w-[40px] h-[40px] p-1 border-2 border-slate-950 rounded-full object-cover" />
                )}

                <div className="flex flex-col">
                  <span className="font-semibold text-slate-950">
                    {comment?.fullname}
                  </span>
                  <span className="text-xs text-slate-800">
                    Posted {moment(comment.date).fromNow()}
                  </span>
                </div>
                {currentUser.fullname === comment.fullname && (
                  <div className="flex items-center gap-3">
                    <FaPen
                      className="hover:text-yellow-800 cursor-pointer transition-all"
                      onClick={() => {
                        handleSetEdit(
                          comment.id,
                          comment.nid,
                          comment.description
                        );
                      }}
                    />
                    <Link to={`/post/${postId}`}>
                      <FaTrash
                        className="hover:text-red-800 cursor-pointer transition-all"
                        onClick={() => {
                          handleDeleteComment(comment.id);
                          navigate(`/post/${postId}`);
                        }}
                      />
                    </Link>
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <p className="text-sm text-slate-900">{comment.description}</p>
              </div>
            </div>
          ))}
    </div>
  );
};

export default Comment;
