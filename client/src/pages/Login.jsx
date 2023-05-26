import logo from '../assets/img/prc_news_logo_black.svg'
import {Link} from 'react-router-dom'

const Login = () => {
  return (
    <div className='flex flex-col p-10 w-full h-[100vh] justify-center items-center bg-gray-500'>
        <div className='mb-10'>
            <img src={logo} alt="PRC News Login" width='200px'/>
        </div>
        <form action="" className='flex flex-col'>
            <label className='mt-2 p-1' htmlFor='email'>Email:</label>
            <input className='mt-2 indent-2 p-1 rounded-full text-slate-950' type='email' id='email' placeholder='example@example.ex' required/>

            <label className='mt-2 p-1' htmlFor='password'>Password:</label>
            <input className='mt-2 indent-2 p-1 rounded-full text-slate-950' type='password' id='password' placeholder='********' required/>

            <p className='my-2'>Don't have an account? <Link to='/register'><span className='underline cursor-pointer'>Register here</span></Link>.</p>

            <button type='submit' className=' w-full mt-4 py-1 px-3 border-2 border-gray-950 text-gray-950 hover:bg-slate-950 hover:text-slate-100 rounded-full'>Login</button>
        </form>
    </div>
  )
}

export default Login