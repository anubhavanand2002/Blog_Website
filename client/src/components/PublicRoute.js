import React from 'react'
import { Navigate } from 'react-router-dom'
export default function PublicRoute({children}) {
  const token=localStorage.getItem("session");
  if(token)
  {
    return <Navigate to="/"/>
  }
  else{
    return children;
  }
}
