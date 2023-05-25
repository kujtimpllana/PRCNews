const Nav = () => {
  return (
    <div className='flex justify-center items-center w-full md:h-12 bg-slate-100 text-gray-950'>
      <ul className='flex flex-col gap-y-3 md:flex-row gap-x-6 text-center py-4'>
        <li className='py-1 px-3 hover:bg-red-800 hover:text-slate-100 rounded-full'>News</li>
        <li className='py-1 px-3 hover:bg-green-800 hover:text-slate-100 rounded-full'>Sport</li>
        <li className='py-1 px-3 hover:bg-[#00515A] hover:text-slate-100 rounded-full'>Fashion</li>
        <li className='py-1 px-3 hover:bg-[#302B29] hover:text-slate-100 rounded-full'>Auto</li>
        <li className='py-1 px-3 hover:bg-blue-800 hover:text-slate-100 rounded-full'>Technology</li>
        <li className='py-1 px-3 hover:bg-orange-500 hover:text-slate-100 rounded-full'>Fun</li>
      </ul>
    </div>
  )
}

export default Nav