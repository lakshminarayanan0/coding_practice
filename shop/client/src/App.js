import React, { useEffect, useState } from 'react'
import Login from './components/Login'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Register from './components/Register'
import Home from './components/Home'
import Dashboard from './components/Dashboard'

function App() {
    const [credentials,setCredentials]=useState({
        username:"",
        password:""
    })
    const [user,setUser]=useState({})
    const navigate=useNavigate()

    useEffect(() => {
        console.log('User state updated:', user);
      }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prevCredentials) => ({
          ...prevCredentials,
          [name]: value,
        }));
      };
    

    const handleLogin = async(e) => {
        e.preventDefault();
        const status=await onLogin(credentials);
        if(status){
           navigate('/dashboard')
        }
      };

      async function onLogin(user) {
        try {
          const authenticate = await fetch('http://localhost:8000/signin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(user),
          });
    
          const result = await authenticate.json();
    
          if (authenticate.ok) {
            console.log(result);
             setUser(prev=>({...prev,...result.user}))
            return true;
          } else {
            throw new Error(result.message || 'Login failed');
          }
        } catch (error) {
          console.error(error);
          return false;
        }
      }
    
    
  return (
    <div>
        <Routes>
        <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login handleChange={handleChange} handleLogin={handleLogin} credentials={credentials}/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/dashboard' element={<Dashboard user={user}/>}/>


        </Routes>
        
    </div>
  )
}

export default App