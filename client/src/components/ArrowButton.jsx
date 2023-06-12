import { FaArrowUp } from "react-icons/fa";

const ArrowButton = () => {
  return (
    <div className="relative">
      <FaArrowUp
        size={50}
        onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
        className="fixed right-3 bottom-[80px] cursor-pointer border-2 border-gray-300 rounded-full text-gray-800 p-1"
      />
    </div>
  );
};

export default ArrowButton;
