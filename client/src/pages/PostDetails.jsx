import { Link } from 'react-router-dom'
import { FaPen, FaTrash } from 'react-icons/fa'
import PostSideBar from '../components/PostSideBar'

const PostDetails = () => {
  return (
    <div className='flex flex-col gap-10 px-6 mt-6 md:flex-row md:w-full'>
        <div className='md:flex-[5]'>
            <img src='https://ichef.bbci.co.uk/images/ic/1200x675/p0b1vctm.jpg' className='w-full h-[450px] object-cover' alt='' />
            <div className='flex items-center gap-[10px] my-6'>
                <img src='https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' className='w-[60px] h-[60px] rounded-full object-cover' alt='' />
                <div className='text-gray-800'>
                    <span className='font-bold'>Alexandra</span>
                    <p>Posted 2 days ago</p>
                </div>
                <div className='flex gap-[10px] text-gray-800'>
                    <Link to={`/edit?edit=2`}><FaPen className='hover:text-yellow-800' /></Link>
                    <FaTrash className='hover:text-red-800 cursor-pointer' />
                </div>
            </div>
            <div className=''>
                <h1 className='font-bold text-lg mb-4'>What is Lorem Ipsum?</h1>
                <p className='text-gray-800 text-justify mb-2'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
        </div>
        <div className='md:flex-[2]'>
            <PostSideBar />
        </div>
    </div>
  )
}

export default PostDetails