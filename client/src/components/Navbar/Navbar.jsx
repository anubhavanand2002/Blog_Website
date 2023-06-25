import React from 'react'
import {Link} from 'react-router-dom';
import './Navbar.css';
import { useSelector } from 'react-redux';
import { message } from 'antd';
export default function Navbar() {


  const {isLoggedIn}=useSelector(state=>state.auth);

  const handleLogout=()=>{
     localStorage.clear('token');
     message.success("Logout successfully!!");
  }

  return (
    <div className='container'>
        <div className='logo-container'>
             <h1 className='logo'>Blog Apps</h1>
        </div>
       <div className='check-blogs'>
        <Link to="add-blog">
             <button className='btn'>AddBlog</button>
        </Link>

        <Link to="/my-blog">
          <button className='btn'>MyBlog</button>
         </Link>

         <Link to="/blogs">
            <button className='btn'>AllBlogs</button>
         </Link>
       </div>
       {!isLoggedIn? <div className='button-container'>
            <Link to="/login">
                    <button className='btn'>Login</button>
            </Link>
            <span></span>
            <Link to="/register">
                    <button className='btn'>Signup</button>
            </Link>
            <Link to="/register">
                    <button className='btn' onClick={()=>{handleLogout()}}>Logout</button>
            </Link>
        </div>:<p>I m logged in</p>}
    </div>
  )
}
