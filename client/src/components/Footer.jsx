const Footer = () => {

    const date = new Date()

  return (
        <p className='h-14 bg-slate-950 text-slate-100 flex justify-center items-center'>Copyright &copy; {date.getFullYear() === 2023 ? '2023' : '2023-' + date.getFullYear()}. All rights reserved.</p>
  )
}

export default Footer