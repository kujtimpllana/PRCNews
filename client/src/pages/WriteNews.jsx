import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import ReactQuill from 'react-quill'
import "react-quill/dist/quill.snow.css"

import axios from "axios"
import moment from "moment"

const WriteNews = () => {

    //getting state from post details
    const state = useLocation().state
    const [title, setTitle] = useState(state?.title || "")
    const [value, setValue] = useState(state?.desc || "")
    const [file, setFile] = useState(null)
    const [category, setCategory] = useState(state?.category || "")  
    
    const navigate = useNavigate()

    const upload = async () => {
        try {
           const formData = new FormData()
           formData.append("file", file) 
           const res = await axios.post("http://localhost:9000/api/upload", formData)
           return res.data
        } catch (err) {
            console.log(err)
        }
    }

    const handleClick = async (e) => {
        e.preventDefault()
        const imgUrl = await upload()

        try {
            !state && await axios.post(`http://localhost:9000/api/news/`, {
                title, desc: value, category, img: file ? imgUrl : "", date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            }, {withCredentials: true})
            navigate("/")
        } catch (err) {
            console.log(err)
        }
    }

    const handleEdit = async (e) => {
        e.preventDefault()
        const imgUrl = await upload()
        try {
            state && await axios.put(`http://localhost:9000/api/news/${state.id}`, {
                title, desc: value, category, img: file ? imgUrl : "",
            }, {withCredentials:true})
            navigate("/")
        } catch (err) {
            console.log(err)
        }
    }

    const getText = (html) => {
        const document = new DOMParser().parseFromString(html, "text/html")
        return document.body.textContent
    }

  return (
    <div className='mt-[20px] p-8 flex flex-col gap-[20px] md:flex md:flex-row md:items-start'>
        <div className='mb-14 flex-[5] flex flex-col gap-[20px] md:w-0'>
            <input type="text" placeholder='Title' className='p-[10px] border-2 border-gray-200' onChange={e => setTitle(e.target.value)} value={getText(title)}/>
            <div className='h-[340px] overflow-x-sdscroll'>
                <ReactQuill theme='snow' value={value} onChange={setValue} className='h-[100%] border-0 z-[0]'/>
            </div>
        </div>
        <div className='flex-[2] flex flex-col gap-[20px]'>
            <div className='border-2 border-gray-200 p-[10px] flex-[1] flex flex-col gap-[20px] justify-between text-gray-800'>
                <h1 className='font-bold text-lg'>Publish</h1>
                <label htmlFor='file' className='bg-gray-200 w-[140px] h-auto text-center cursor-pointer p-1'>Upload Image</label>
                <input style={{ display:'none' }} type='file' name='' id='file' onChange={e => setFile(e.target.files[0])}/>
                <div className='flex justify-evenly'>
                    <button onClick={ handleEdit } className='bg-green-800 hover:bg-green-700 text-gray-100 px-4 py-1'>Save</button>
                    <button onClick={ handleClick } className='bg-yellow-700 hover:bg-yellow-600 text-gray-100 px-4 py-1'>Publish</button>
                </div>
            </div>
            <div className='border-2 border-gray-200 p-[10px] flex flex-col gap-[15px] flex-[1]'>
                <h1 className='font-bold text-lg'>Category</h1>
                <div className='flex gap-[5px]'>     
                <input type='radio' checked={category === "politics"} name='cat' value='politics' id='politics' onChange={e => setCategory(e.target.value)}/>
                <label htmlFor='politics'>Politics</label>
                </div>
                <div className='flex gap-[5px]'>     
                <input type='radio' checked={category === "sport"} name='cat' value='sport' id='sport' onChange={e => setCategory(e.target.value)}/>
                <label htmlFor='sport'>Sport</label>
                </div>
                <div className='flex gap-[5px]'>
                <input type='radio' checked={category === "fashion"} name='cat' value='fashion' id='fashion' onChange={e => setCategory(e.target.value)}/>
                <label htmlFor='fashion'>Fashion</label>
                </div>
                <div className='flex gap-[5px]'>
                <input type='radio' checked={category === "auto"} name='cat' value='auto' id='auto' onChange={e => setCategory(e.target.value)}/>
                <label htmlFor='auto'>Auto</label>
                </div>
                <div className='flex gap-[5px]'>
                <input type='radio' checked={category === "technology"} name='cat' value='technology' id='technology' onChange={e => setCategory(e.target.value)}/>
                <label htmlFor='technology'>Technology</label>
                </div>
                <div className='flex gap-[5px]'>
                <input type='radio' checked={category === "fun"} name='cat' value='fun' id='fun' onChange={e => setCategory(e.target.value)}/>
                <label htmlFor='fun'>Fun</label>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WriteNews