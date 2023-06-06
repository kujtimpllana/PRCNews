import { Link } from "react-router-dom"

const Nav = () => {
  return (
    <div className='flex justify-center items-center w-full md:h-12 bg-slate-100 text-gray-950'>
      <ul className='flex flex-col gap-y-3 md:flex-row gap-x-6 text-center py-4'>
        <Link to="/"><li className='py-1 px-3 hover:bg-red-800 hover:text-slate-100 rounded-full'>News</li></Link>
        <Link to="/?cat=politics"><li className='py-1 px-3 hover:bg-[#302B29] hover:text-slate-100 rounded-full'>Politics</li></Link>
        <Link to="/?cat=sport"><li className='py-1 px-3 hover:bg-green-800 hover:text-slate-100 rounded-full'>Sport</li></Link>
        <Link to="/?cat=fashion"><li className='py-1 px-3 hover:bg-[#00515A] hover:text-slate-100 rounded-full'>Fashion</li></Link>
        <Link to="/?cat=auto"><li className='py-1 px-3 hover:bg-red-900 hover:text-slate-100 rounded-full'>Auto</li></Link>
        <Link to="/?cat=technology"><li className='py-1 px-3 hover:bg-blue-800 hover:text-slate-100 rounded-full'>Technology</li></Link>
        <Link to="/?cat=fun"><li className='py-1 px-3 hover:bg-orange-500 hover:text-slate-100 rounded-full'>Fun</li></Link>
      </ul>
    </div>
  )
}

export default Nav