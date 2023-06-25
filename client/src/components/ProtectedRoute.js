import React from 'react'
import { Navigate } from 'react-router-dom';
export default function ProtectedRoute({children}) {
 const token=localStorage.getItem("session");
 if(token)
 {
    return children;
 }
 else{
    return <Navigate to="/login"/>
 }
}
