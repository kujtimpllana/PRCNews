const Footer = () => {
  const date = new Date();

  return (
    <p className="font-poppins font-semibold h-14 bg-[#000711] text-slate-100 flex justify-center items-center mt-auto w-full">
      <span className="font-poppins text-[#D0A650]">
        PRC News &copy;{" "}
        {date.getFullYear() === 2023 ? "2023" : "2023-" + date.getFullYear()}.
      </span>
      &nbsp; All rights reserved.
    </p>
  );
};

export default Footer;
