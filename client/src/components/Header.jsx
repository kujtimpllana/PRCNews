import logo from '../assets/img/prc_news_logo.svg'

const Header = () => {
  return (
    <div className='w-full h-20 flex justify-center items-center bg-slate-950'>
        <img src={logo} alt='PRC News' className='h-12'/>
    </div>
  )
}

export default Header