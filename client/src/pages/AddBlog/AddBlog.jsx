import React,{useState} from 'react'
import './AddBlog.css';
import axios from "axios";
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function AddBlog() {
    const navigate=useNavigate();

   const[title,setTitle]=useState();
   const[description,setDescription]=useState();
   const[image,setImage]=useState();
   let userId='646c53103718e7211197f9b1';
   const handleTitle=(e)=>{
    setTitle(e.target.value);
   }
   const handleDescription=(e)=>{
    setDescription(e.target.value);
   } 
   const handleImage=(e)=>{
    setImage(e.target.value);
   }
  const handleClick=()=>{
    // console.log(title);console.log(image);console.log(description);console.log(user_id);
    axios.post("https://blog-website-api-eta.vercel.app/api/add-blog",{
        title,
        description,
        image,
        userId
    })
    .then((result)=>{
        // console.log(result);
       if(result.data.status)
       {
        message.success("Data Posted Successfully!!");
        navigate("/blogs");
       }
       else{
        message.error("data not posted!!");
       }
    })
    .catch((error)=>{
        console.log(error);
    })
  }
  return (
    <div className='Post-Blog'>
      <div className='containers'>
            <h1 className='head'>Post Your Blog</h1>
            <div className='titles'>
                <h1>Title</h1>
                <input type='text' value={title} onChange={(e)=>{handleTitle(e)}}></input>
            </div>
            <div className='description'>
                <h1>Description</h1>
                <textarea value={description} onChange={(e)=>{handleDescription(e)}}></textarea>
            </div>
            <div className='ima'>
                <h1>Image_url</h1>
                <input type='text' value={image} onChange={(e)=>{handleImage(e)}}></input>
            </div>
            <div  className='btns'>
                <button type='submit' className='bt' onClick={()=>{handleClick()}}>Submit</button>
            </div>
        </div>
    </div>
  )
}
