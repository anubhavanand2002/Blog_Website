import React, { useEffect, useeffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Blog from './pages/Blog/Blog';
import AddBlog from './pages/AddBlog/AddBlog';
import MyBlog from './pages/MyBlog/MyBlog';
import EditBlog from './pages/EditBlog/EditBlog';
import { setUser } from './Redux/Features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import axios from 'axios';
function App() {
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const getUser = () => {
    axios
      .get('https://blog-website-api-eta.vercel.app/api/getUser', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('session'),
        },
      })
      .then(result => {
        if (result.data.status) {
          dispatch(setUser(result.data.user));
          console.log(result.data.user);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem('session');
    if (token && !user) {
      getUser();
    }
  }, []);

  return (
    <>
      <Navbar />

      
        <Routes>
          <Route 
          path="/login" 
          element=
          {
            <PublicRoute>
              <Login />
          </PublicRoute>
          } />
        </Routes>
     

      
        <Routes>
          <Route 
          path="/register" 
          element=
          {
            <PublicRoute>
             <Register />
          </PublicRoute>
          } 
          />
        </Routes>
     

      
        <Routes>
          <Route 
          path="/blogs" 
          element=
          {
            <ProtectedRoute>
           <Blog />
          </ProtectedRoute>
          } 
          />
        </Routes>
    

     
        <Routes>
          <Route 
          path="/add-blog" 
          element=
          {
            <ProtectedRoute> <AddBlog /></ProtectedRoute>
          } />
        </Routes>
      

     
        <Routes>
          <Route 
          path="/my-blog" 
          element=
          {
            <ProtectedRoute><MyBlog /></ProtectedRoute>
           }
           />
        </Routes>
   

     
        <Routes>
          <Route 
          path="/edit-blog/:id" 
          element=
          {
            <ProtectedRoute><EditBlog /> </ProtectedRoute>
          } />
        </Routes>
     
    </>
  );
}

export default App;
