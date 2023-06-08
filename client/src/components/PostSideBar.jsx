import { useState, useEffect } from "react"

const PostSideBar = ({category}) => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get(`http://localhost:9000/api/news/?cat=${category}`)
          setPosts(res.data)
        } catch (err) {
          console.log(err)
        }
      }
    }, [category])

    /*
    const posts = [
        {
          id: 1,
          title: 'Testing title 1 Testing Testing title 1 TesgTesting title 1 ',
          desc: 'Testing description 1, testing description 1 and testing description 1. Testing description 1, testing description 1 and testing description 1. Testing description 1, testing description 1 and testing description 1. Testing description 1, testing description 1 and testing description 1. Testing description 1, testing description 1 and testing description 1. Testing description 1, testing description 1 and testing description 1. Testing description 1, testing description 1 and testing description 1. Testing description 1, testing description 1 and testing description 1. Testing description 1, testing description 1 and testing description 1.',
          img: 'https://ichef.bbci.co.uk/images/ic/1200x675/p0b1vctm.jpg'
        },
        {
          id: 2,
          title: 'Testing title 2',
          desc: 'Testing description 2, testing description 2 and testing description 2.',
          img: 'https://images.pexels.com/photos/15787344/pexels-photo-15787344/free-photo-of-model-in-a-fashionable-beige-outfit-posing-in-studio.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
          id: 3,
          title: 'Testing title 3',
          desc: 'Testing description 3, testing description 3 and testing description 3.',
          img: 'https://images.pexels.com/photos/1604869/pexels-photo-1604869.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
          id: 4,
          title: 'Testing title 4',
          desc: 'Testing description 4, testing description 4 and testing description 4.',
          img: 'https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
          id: 5,
          title: 'Testing title 5',
          desc: 'Testing description 5, testing description 5 and testing description 5.',
          img: 'https://images.pexels.com/photos/3970330/pexels-photo-3970330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        }
      ]
      */

  return (
    <div className='flex flex-col gap-[25px] mb-6 text-gray-800'>
        <h1 className='font-bold text-lg'>You also might be interested in</h1>
        { posts.map(post => (
            <div className='flex flex-col gap-[10px]' key={ post.id }>
                <img src={ post.img } className='w-[100%] h-[200px] object-cover' alt='' />
                <h2 className='font-bold text-md'>{ post.title }</h2>
                <button className="w-[115px] h-[35px] border-2 border-gray-800 hover:bg-gray-800 hover:text-gray-100">Read more</button>
            </div>
        )) }
    </div>
  )
}

export default PostSideBar