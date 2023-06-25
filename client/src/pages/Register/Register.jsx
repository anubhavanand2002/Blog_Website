import React,{useState} from 'react'
import {message as msg} from 'antd';
import './Register.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
export default function Register() {
    const navigate=useNavigate();
    const[name,setName]=useState();
    const[email,setEmail]=useState();
    const[password,setPassword]=useState();

    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post("https://blog-website-api-eta.vercel.app/api/register",{
            name,
            email,
            password
        }).then((result)=>{
            console.log(result);
            const{status,message}=result.data;
            if(status)
            {
                msg.success(message);
                navigate("/login");
            }else{
                msg.error(message);
            }
        }).catch((error)=>{
            console.log(error);
        })
    }
  return (
    <div>
       <div className='login-container'>
            <div className='header'>
                <h1 className='login'>Register</h1>
            </div>
            
        <form>
            <div className='inputs'>
                    <div className='input'>
                        <label>Name</label>
                        <input type='text' 
                        className='input1' 
                        value={name} 
                        onChange={e=>{setName(e.target.value)}}
                        />
                    </div>

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
                  
                    <div>
                        <button className='button' type="submit" onClick={e=>{handleSubmit(e)}}>Submit</button>
                    </div>
        </form>
          <div className="register"><Link to="/login">Have you already registered?Sign In</Link></div>
            </div>
    </div>
  )
}
