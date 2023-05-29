import { Link } from 'react-router-dom'

const Home = () => {

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

  return (
    <div className=''>
      <h1 className='font-bold text-2xl m-4 text-slate-950'>Latest News</h1>

      { posts.map((post) => (
          
          <div className='overflow-hidden p-2 w-full h-auto flex flex-col my-6 border-2 border-gray-300 rounded-md shadow-lg md:flex-row md:items-center md:w-[60%] md:ml-10' key={ post.id }>

              <Link to={`/post/${ post.id }`} className='w-[100%] h-[165px] flex items-center md:w-[55%] md:h-[250px]'>
                <img src={ post.img } alt={ post.title } className='h-full w-full object-cover rounded-md' />
              </Link>

              <Link to={`/post/${ post.id }`} className='w-[100%] h-[100px] flex flex-col mt-3 md:justify-evenly md:px-4 md:w-[50%] md:h-[150px]'>
                <h1 className='font-bold text-lg md:text-xl'>{ post.title.length > 40 ? post.title.substring(0, 40).concat('...') : post.title }</h1>
                <p className='text-gray-600 md:text-md'>{ post.desc.length > 80 ? post.desc.substring(0, 80).concat('...') : post.desc }</p>
              </Link>
          </div>
          
      )) }
    </div>
  ); 
};

export default Home
