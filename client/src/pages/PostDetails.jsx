import { Link, useLocation, useNavigate} from 'react-router-dom'
import { FaPen, FaTrash } from 'react-icons/fa'
import PostSideBar from '../components/PostSideBar'

import { useState, useEffect, useContext } from 'react'
import axios from "axios"
import moment from "moment"
import { AuthContext } from "../context/authContext"

const PostDetails = () => {
    
  const [post, setPost] = useState({})

  const location = useLocation()
  const navigate = useNavigate()

  const postId = location.pathname.split("/")[2]

  const { currentUser } = useContext(AuthContext)
      
  useEffect(() => {
     const fetchData = async () => {
        try {
            const res = await axios.get(`http://localhost:9000/api/news/${postId}`)
            setPost(res.data)
        } catch (err) {
            console.log(err)
        }
     } 
     fetchData()
  }, [postId])
  
  const handleDelete = async () => {
    try {
        await axios.delete(`http://localhost:9000/api/news/${postId}`, {withCredentials: "include"})
        navigate("/")
    } catch (err) {
        console.log(err)
    }
  }

  const getText = (html) => {
    const document = new DOMParser().parseFromString(html, "text/html")
    return document.body.textContent
  }

  return (
    <div className='flex flex-col gap-10 px-6 mt-6 md:flex-row md:w-full'>
        <div className='md:flex-[5]'>
            <img src={`../uploads/${post?.img}`} className='w-full h-[450px] object-cover rounded' alt={`Image of/about ${post?.title}`} />
            <div className='flex items-center gap-[10px] my-6'>
                <img src={post?.profile_photo} className='w-[60px] h-[60px] rounded-full object-cover' alt='' />
                <div className='text-gray-800'>
                    <span className='font-bold'>{post?.fullname}</span>
                    <p>Posted {moment(post.date).fromNow()}</p>
                </div>
                {currentUser?.fullname === post?.fullname && 
                <div className='flex gap-[10px] text-gray-800'>
                    <Link to={`/write?edit=2`} state={post}><FaPen className='hover:text-yellow-800' /></Link>
                    <FaTrash onClick={ handleDelete } className='hover:text-red-800 cursor-pointer' />
                </div>
                }
            </div>
            <div className='mb-10'>
                <h1 className='font-bold text-lg mb-4'>{getText(post.title)}</h1>
                {getText(post.desc)}
            </div>
        </div>
        <div className='md:flex-[2]'>
            <PostSideBar category={post.category} />
        </div>
    </div>
  )
}

export default PostDetails