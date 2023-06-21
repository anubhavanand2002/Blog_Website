import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Blog from './pages/Blog/Blog';
import AddBlog from './pages/AddBlog/AddBlog';
import MyBlog from './pages/MyBlog/MyBlog';
import EditBlog from './pages/EditBlog/EditBlog';
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/add-blog" element={<AddBlog/>}/>
        <Route path="/my-blog" element={<MyBlog/>}/>
        <Route path="/edit-blog/:id" element={<EditBlog/>}/>
      </Routes>
    </>
  );
}

export default App;
