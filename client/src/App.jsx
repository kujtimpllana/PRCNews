import Home from "./pages/Home"
import { Outlet } from "react-router-dom"

function App() {
  
  return (
    <div className='app'>
      <Outlet />
    </div>
  )
}

export default App
