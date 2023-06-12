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

  // const posts = [
  //   {
  //     id: 1,
  //     title: 'Testing title 1 Testing Testing title 1 TesgTesting title 1 ',
  //     desc: 'Testing description 1, testing description 1 and testing description 1. Testing description 1, testing description 1 and testing description 1. Testing description 1, testing description 1 and testing description 1. Testing description 1, testing description 1 and testing description 1. Testing description 1, testing description 1 and testing description 1. Testing description 1, testing description 1 and testing description 1. Testing description 1, testing description 1 and testing description 1. Testing description 1, testing description 1 and testing description 1. Testing description 1, testing description 1 and testing description 1.',
  //     img: 'https://ichef.bbci.co.uk/images/ic/1200x675/p0b1vctm.jpg'
  //   },
  //   {
  //     id: 2,
  //     title: 'Testing title 2',
  //     desc: 'Testing description 2, testing description 2 and testing description 2.',
  //     img: 'https://images.pexels.com/photos/15787344/pexels-photo-15787344/free-photo-of-model-in-a-fashionable-beige-outfit-posing-in-studio.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  //   },
  //   {
  //     id: 3,
  //     title: 'Testing title 3',
  //     desc: 'Testing description 3, testing description 3 and testing description 3.',
  //     img: 'https://images.pexels.com/photos/1604869/pexels-photo-1604869.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  //   },
  //   {
  //     id: 4,
  //     title: 'Testing title 4',
  //     desc: 'Testing description 4, testing description 4 and testing description 4.',
  //     img: 'https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  //   },
  //   {
  //     id: 5,
  //     title: 'Testing title 5',
  //     desc: 'Testing description 5, testing description 5 and testing description 5.',
  //     img: 'https://images.pexels.com/photos/3970330/pexels-photo-3970330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  //   }
  // ]

  const getText = (html) => {
    const document = new DOMParser().parseFromString(html, "text/html");
    return document.body.textContent;
  };

  return (
    <div className="">
      <h1 className="font-bold text-2xl m-4 text-slate-950">Latest News</h1>

      {posts.map((post) => (
        <div
          className="overflow-hidden p-2 w-full h-auto flex flex-col my-6 border-2 border-gray-300 rounded-md shadow-lg md:flex-row md:items-center md:w-[60%] md:ml-10"
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
    </div>
  );
};

export default Home;
