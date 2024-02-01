import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import PostDetails from "./pages/PostDetails.jsx";
import WriteNews from "./pages/WriteNews.jsx";
import Admin from "./pages/Admin.jsx";
import NotFound404 from "./pages/NotFound404.jsx";
import AdminEdit from "./pages/AdminEdit.jsx";
import Profile from "./pages/Profile.jsx";
import Saved from "./pages/Saved.jsx";

import { AuthContextProvider } from "./context/authContext.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" index element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/post/:id" element={<PostDetails />} />
      <Route path="/post/*" element={<NotFound404 />} />
      <Route path="/write" element={<WriteNews />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/update/:id" element={<AdminEdit />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/archive" element={<Saved />} />
      <Route path="*" element={<NotFound404 />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);
