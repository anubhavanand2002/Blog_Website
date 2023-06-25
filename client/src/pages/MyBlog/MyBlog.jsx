import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BlogCard from '../../components/BlogCard/BlogCard';
import {message} from "antd";
import { useSelector } from 'react-redux';
export default function MyBlog() {

  const{user}=useSelector((state)=>(state.user));
  const handleDelete=(id)=>{
       axios.delete(`https://blog-website-api-eta.vercel.app/api/delete-blog/${id}`)
       .then((res)=>{
          if(res.status){
            message.success("Deletion take place Successfully!!!");
            setBlogs(blogs.filter((blog)=>{
               return blog._id!==id;
            }))
          }
          else{
            message.error("There is some error in deletion!!!");
          }   
       })
      .catch((error)=>{
        console.log(error);
      })
  }
  
  const [blogs, setBlogs] = useState([]);
  const getAllBlogs = async () => {
    const allBlogs = await axios.get(`https://blog-website-api-eta.vercel.app/api/getbyId/${user?._id}`);
    console.log(allBlogs);
    if(allBlogs.data.status)
      setBlogs(allBlogs.data.message.blogs);
  };

  useEffect(() => {
    if(user)
       getAllBlogs();
  }, []);

  return(
     blogs.map((item)=>{
       return <BlogCard data={item} deletes={()=>{handleDelete(item._id)}} val={0}/>
     })
  );
}