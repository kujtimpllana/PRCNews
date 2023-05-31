import logo from '../assets/img/prc_news_logo_black.svg'
import {Link} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify"

import axios from "axios"

const Login = () => {

  const initialValues = { email: '', password: ''}
  const [formInput, setFormInput] = useState(initialValues)
  //form inputs error
  const [inputError, setInputError] = useState({})
  //error from api
  const [err, setErr] = useState(null)

  const [isSubmit, setIsSubmit] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    if (Object.keys(inputError).length === 0 && isSubmit && !err) {
      toast.success('You have logged in successfully!')
      setTimeout(() => {navigate('/')}, 2000)
    } else if(Object.keys(inputError).length > 0 ){
      toast.error(Object.values(inputError)[0])
    }
  }, [inputError])

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormInput(prev => ({...prev, [name]: value}))
  }

  const handleSubmit = async (e) => { 
    e.preventDefault();
    setInputError(handleValidation(formInput))

    try {
      await axios.post("http://localhost:9000/api/auth/login", formInput)
     } catch(err) {
       setErr(err.response.data)
     }
     
     if(err) {
       setIsSubmit(false)
     } else {
     setIsSubmit(true)
     }
  }

  const handleValidation = (values) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
    const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/
    const errResult = {}
 
    if (!values.email) {
        errResult.email = 'You must have an email!'
    } else if (!emailRegex.test(values.email)) {
        errResult.email = 'Not a valid email, try again!'
    } else if (!values.password) {
        errResult.password = 'You must have a password!'
    } else if (!passwordRegex.test(values.password)) {
        errResult.password = 'Your password must contain:\natleast 8 characters,\na uppercase letters,\na number and symbol!'
    }  
      return errResult;
  }

  return (
    <div className='flex flex-col p-10 w-full h-[100vh] justify-center items-center bg-gray-500'>
        <div className='mb-10'>
            <img src={logo} alt="PRC News Login" width='200px'/>
        </div>
        <form className='flex flex-col'>
            <label className='mt-2 p-1' htmlFor='email'>Email:</label>
            <input className='mt-2 indent-2 p-1 rounded-full text-slate-950' type='text' id='email' name='email' placeholder='example@example.com' onChange={ handleChange } />

            <label className='mt-2 p-1' htmlFor='password'>Password:</label>
            <input className='mt-2 indent-2 p-1 rounded-full text-slate-950' type='password' id='password' name='password' placeholder='********' onChange={ handleChange } />

            <p className='my-2'>Don't have an account? <Link to='/register'><span className='underline cursor-pointer'>Register here</span></Link>.</p>

            {err && <p className='bg-red-950 text-gray-100 rounded-full text-center p-1'>{err}</p>}

            <button onClick={ handleSubmit } className='w-full mt-4 py-1 px-3 border-2 border-gray-950 text-gray-950 hover:bg-slate-950 hover:text-slate-100 rounded-full'>Login</button>
        </form>
    </div>
  )
}

export default Login