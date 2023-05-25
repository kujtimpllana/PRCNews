import logo from '../assets/img/prc_news_logo.svg'
import {FaBars} from 'react-icons/fa'
import {AiOutlineClose} from 'react-icons/ai'
import {Link} from 'react-router-dom'

import { useState } from 'react'

const Header = () => {

  const [nav, setNav] = useState(false)

  const handleNav = () => {
    setNav(!nav)
  }

  return (
    <div className='bg-[#000711] text-slate-100 uppercase'>
      <div className='flex justify-between items-center h-16 max-w-[1440px] mx-auto px-4 text-slate-100'>
        <Link to='/'>
          <img src={logo} alt='PRC News' width='140px'/>
        </Link>
        <ul className='hidden md:flex items-center gap-6 font-bold'>
          <Link to='/'>
            <li className='py-1 px-2 rounded-full hover:bg-slate-100 hover:text-slate-950'>Home</li>
          </Link>
          <Link to='/about'>
            <li className='py-1 px-2 rounded-full hover:bg-slate-100 hover:text-slate-950'>About</li>
          </Link>
          <Link to='/contact'>
            <li className='py-1 px-2 rounded-full hover:bg-slate-100 hover:text-slate-950'>Contact</li>
          </Link>
          <Link to='/admin'>
            <li className='py-1 px-2 rounded-full hover:bg-slate-100 hover:text-slate-950'>Admin</li>
          </Link>
          <Link to='/login'>
            <li className='py-1 px-2 rounded-full border-2 border-[#244AA5] text-[#244AA5]  hover:bg-[#244AA5] hover:text-slate-100'>Login</li>
          </Link>
          <Link to='/register'>
            <li className='py-1 px-2 rounded-full border-2 border-[#D0A650] text-[#D0A650] hover:bg-[#D0A650] hover:text-slate-900'>Sign Up</li>
          </Link>
        </ul>
        <div onClick={handleNav} className='block md:hidden'>
          {!nav ? <AiOutlineClose size={20} /> : <FaBars size={20} />}
        </div>
        <div className={!nav ? 'fixed left-0 top-0 w-[60%] h-full flex flex-col items-center border-r border-r-gray-900 bg-slate-950 ease-in-out duration-500' : 'fixed left-[-100%]'}>
          <img src={logo} alt='PRC News' width='200px' className='m-4'/>
          <ul className='flex flex-col gap-12 mt-12 text-lg font-bold w-full'>
            <Link to='/'>
              <li className='py-2 hover:bg-slate-100 hover:text-slate-950 text-center'>Home</li>
            </Link>
            <Link to='/about'>
              <li className='py-2 hover:bg-slate-100 hover:text-slate-950 text-center'>About</li>
            </Link>
            <Link to='/contact'>
              <li className='py-2 hover:bg-slate-100 hover:text-slate-950 text-center'>Contact</li>
            </Link>
            <Link to='/admin'>
              <li className='py-2 hover:bg-slate-100 hover:text-slate-950 text-center'>Admin</li>
            </Link>
            <hr />
            <Link to='/login'>
              <li className='py-2 hover:bg-[#244AA5] hover:text-slate-100 text-center'>Login</li>
            </Link>
            <Link to='/register'>
              <li className='py-2 hover:bg-[#D0A650] hover:text-slate-950 text-center'>Sign Up</li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header