import React,{useState} from 'react';
import axios from "axios";
import {message as msg} from "antd";
import { useNavigate } from 'react-router-dom';
import {useDispatch} from "react-redux";
import { Link } from 'react-router-dom';
import './Login.css';
import { login } from '../../Redux/Features/authSlice';

export default function Login() {
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const[email,setEmail]=useState();
    const[password,setPassword]=useState();

    const handleInput=(e)=>{
       e.preventDefault();
       axios.post("https://blog-website-api-eta.vercel.app/api/login",{
        email,
        password
       }).then((result)=>{
        const{status,message,token}=result.data;
        if(status)
        {
          msg.success(message);
          localStorage.setItem("session",token);
          dispatch(login());
          navigate("/blogs");
        }
        else{
            msg.error(message);
        }
       }).catch((error)=>{
        console.log(error);
       })
    }
  return (
    <div className='login-container'>

        <div className='header'>
            <h1 className='login'>Login</h1>
        </div>

        <div className='inputs'>
            <div className='input'>
                <label>Email</label>
             <input type='email' 
             className='input1'
             value={email}
             onChange={e=>{setEmail(e.target.value)}}
             />
          </div>
          <div className='input'>
            <label>Password</label>
             <input type='password' 
             className='input1'
             value={password}
             onChange={e=>{setPassword(e.target.value)}}
             />
          </div>
         
        </div>

        <div className='button1'>
            <button className='submit' type="submit" onClick={e=>{handleInput(e)}}>Submit</button>
        </div>
        <div className="sign"><Link to="/register">Are You a new user?Sign Up</Link></div>
        
    </div>
  )
}
