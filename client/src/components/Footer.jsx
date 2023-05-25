const Footer = () => {

    const date = new Date()

  return (
        <p className='h-14 bg-[#000711] text-slate-100 flex justify-center items-center mt-auto fixed bottom-0 w-full'>Copyright &copy; {date.getFullYear() === 2023 ? '2023' : '2023-' + date.getFullYear()}. All rights reserved.</p>
  )
}

export default Footer