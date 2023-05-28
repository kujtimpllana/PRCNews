import { useState } from 'react'
import ReactQuill from 'react-quill'
import "react-quill/dist/quill.snow.css"
const WriteNews = () => {
    const [value, setValue] = useState('')
  return (
    <div className='mt-[20px] p-8 flex flex-col gap-[20px] md:flex md:flex-row md:items-start'>
        <div className='mb-14 flex-[5] flex flex-col gap-[20px] md:w-0'>
            <input type="text" placeholder='Title' className='p-[10px] border-2 border-gray-200'/>
            <div className='h-[340px] overflow-x-sdscroll'>
                <ReactQuill theme='snow' value={value} onChange={setValue} className='h-[100%] border-0 z-[0]'/>
            </div>
        </div>
        <div className='flex-[2] flex flex-col gap-[20px]'>
            <div className='border-2 border-gray-200 p-[10px] flex-[1] flex flex-col gap-[20px] justify-between text-gray-800'>
                <h1 className='font-bold text-lg'>Publish</h1>
                <label htmlFor='file' className='bg-gray-200 w-[140px] h-auto text-center cursor-pointer p-1'>Upload Image</label>
                <input style={{ display:'none' }} type='file' name='' id='file' />
                <div className='flex justify-evenly'>
                    <button className='bg-green-800 hover:bg-green-700 text-gray-100 px-4 py-1'>Save</button>
                    <button className='bg-yellow-700 hover:bg-yellow-600 text-gray-100 px-4 py-1'>Update</button>
                </div>
            </div>
            <div className='border-2 border-gray-200 p-[10px] flex flex-col gap-[15px] flex-[1]'>
                <h1 className='font-bold text-lg'>Category</h1>
                <div className='flex gap-[5px]'>     
                <input type='radio' name='cat' value='sport' id='sport' />
                <label htmlFor='sport'>Sport</label>
                </div>
                <div className='flex gap-[5px]'>
                <input type='radio' name='cat' value='fashion' id='fashion' />
                <label htmlFor='fashion'>Fashion</label>
                </div>
                <div className='flex gap-[5px]'>
                <input type='radio' name='cat' value='auto' id='auto' />
                <label htmlFor='auto'>Auto</label>
                </div>
                <div className='flex gap-[5px]'>
                <input type='radio' name='cat' value='technology' id='technology' />
                <label htmlFor='technology'>Technology</label>
                </div>
                <div className='flex gap-[5px]'>
                <input type='radio' name='cat' value='fun' id='fun' />
                <label htmlFor='fun'>Fun</label>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WriteNews