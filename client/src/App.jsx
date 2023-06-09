import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import ArrowButton from "./components/ArrowButton";

import { useLocation } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const location = useLocation();
  console.log(location.pathname.match("/"));

  return (
    <div className="app">
      {!location.pathname.match("/login") &&
        !location.pathname.match("/register") && <Header />}
      {!location.pathname.match("/login") &&
        !location.pathname.match("/register") &&
        !location.pathname.match("/admin") && <Nav />}
      <Outlet />
      {!location.pathname.match("/login") &&
        !location.pathname.match("/register") && <ArrowButton />}
      {!location.pathname.match("/login") &&
        !location.pathname.match("/register") && <Footer />}
      <ToastContainer />
    </div>
  );
}

export default App;
