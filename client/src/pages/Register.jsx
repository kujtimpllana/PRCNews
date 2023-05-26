import { useEffect, useState } from 'react'
import logo from '../assets/img/prc_news_logo_black.svg'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify"

const Register = () => {

  const initialValues = { fullname: '', email: '', password: '', confirmPassword: '',}
  const [formInput, setFormInput] = useState(initialValues)
  const [inputError, setInputError] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)

  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(inputError).length === 0 && isSubmit) {
      toast.success('You have registered successfully!')
      setTimeout(() => {navigate('/')}, 2000)
    } else if(Object.keys(inputError).length > 0 ){
      toast.error(Object.values(inputError)[0])
    }
  }, [inputError])

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormInput({...formInput, [name]: value})
  }

  const handleSubmit = (e) => { 
    e.preventDefault();
    setInputError(handleValidation(formInput))
    setIsSubmit(true)
  }

  const handleValidation = (values) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/
    const errResult = {}
 
      if (!values.fullname || !isNaN(values.fullname) || values.fullname.length <= 2) {
        errResult.fullname = 'You must have a full name!'
      } else if (!values.email) {
        errResult.email = 'You must have an email!'
      } else if (!emailRegex.test(values.email)) {
        errResult.email = 'Not a valid email, try again!'
      } else if (!values.password) {
        errResult.password = 'You must have a password!'
      } else if (!passwordRegex.test(values.password)) {
        errResult.password = 'Your password must contain:\natleast 8 characters,\n2 uppercase letters,\n2 numbers symbols!'
      } else if (!values.confirmPassword) {
        errResult.confirmPassword = 'You must have to confirm password!'
      } else if (!passwordRegex.test(values.confirmPassword)) {
        errResult.confirmPassword = 'Your password must contain:\natleast 8 characters,\n2 uppercase letters,\n2 numbers symbols!'
      } else if (values.password !== values.confirmPassword) {
        errResult.confirmPassword = 'Your passwords do not match, try again!'
      }
      return errResult;
  }

  return (
    <div className='flex flex-col p-10 w-full h-[100vh] justify-center items-center bg-gray-500'>
        <div className='mb-10'>
            <img src={logo} alt="PRC News Login" width='200px'/>
        </div>
        <form onSubmit={ handleSubmit } className='flex flex-col'>

            <label className='mt-2 p-1' htmlFor='name'>Name:</label>
            <input className='mt-2 indent-2 p-1 rounded-full text-slate-950' type='text' id='name' name='fullname' placeholder='John Doe' value={ formInput.name } onChange={ handleChange }/>

            <label className='mt-2 p-1' htmlFor='email'>Email:</label>
            <input className='mt-2 indent-2 p-1 rounded-full text-slate-950' type='text' id='email' name='email' placeholder='example@example.com' value={ formInput.email } onChange={ handleChange }/>

            <label className='mt-2 p-1' htmlFor='password'>Password:</label>
            <input className='mt-2 indent-2 p-1 rounded-full text-slate-950' type='password' id='password' name='password' placeholder='********' value={ formInput.password } onChange={ handleChange }/>

            <label className='mt-2 p-1' htmlFor='cpassword'>Re-enter Password:</label>
            <input className='mt-2 indent-2 p-1 rounded-full text-slate-950' type='password' id='cpassword' name='confirmPassword' placeholder='********' value={ formInput.confirmPassword } onChange={ handleChange }/>

            <p className='my-2'>Already have an account? <Link to='/login'><span className='underline cursor-pointer'>Login here</span></Link>.</p>

            <input type='submit' className=' w-full mt-4 py-1 px-3 border-2 border-gray-950 text-gray-950 hover:bg-slate-950 hover:text-slate-100 rounded-full' value='Register' />
        </form>
    </div>
  )
}

export default Register