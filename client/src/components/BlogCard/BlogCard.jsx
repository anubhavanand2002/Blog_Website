import React from 'react';
import './BlogCard.css';
import { Modal,message } from 'antd';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
export default function BlogCard({data,deletes,val}) {
  const navigate=useNavigate();
  return (
    <div>
        <div className='card'>
       {val!=1?<span className='icons'>
            <ion-icon 
            name="trash"
            onClick={() => {
                Modal.confirm({
                  title: 'Confirm',
                  content: 'Are you sure you want to delete?',
                  onOk() {
                    deletes();
                  },
                });
              }}
            ></ion-icon>
            <ion-icon name="create" 
            onClick={()=>{
                 navigate(`/edit-blog/${data._id}`);
            }}
            ></ion-icon>
        </span>:<></>}

       <div className='title'>
            <div className='name'>A</div>
            <p>{data.title.toUpperCase()}</p>
        </div>

        <div className='image'>
             <img src={data.image}></img>
        </div>

          <div className='containers'>
            <div>{data.description.slice(0,200)+"...."}</div>
          </div>
      </div>
    </div>
  )
}
