import React from 'react'
import axios from 'axios'

import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Cart from './pages/Cart'
import Orders from './pages/Orders'
import Dashboard from './pages/Dashboard'
import Userdata from './pages/Userdata'
import Product from './pages/Product'
import Viewproducts from './pages/Viewproducts'
import ProtectedRoute from './components/ProtectedRoute'
import Editproducts from './pages/Editproducts'
import Productdetails from './pages/Productdetails'

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { UserProvider } from './context/UserContext'



function App(){
  axios.defaults.withCredentials=true
  return (
    <UserProvider>
      <div>
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login/>}></Route>
              <Route path="/register" element={<Register/>}></Route>
              <Route path="/login" element={<Login/>}></Route>
              <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}></Route>
              <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
              <Route path="/Cart" element={<ProtectedRoute><Cart/></ProtectedRoute>}></Route>
              <Route path="/Orders" element={<ProtectedRoute><Orders/></ProtectedRoute>}></Route>
              <Route path="/Dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}></Route>
              <Route path="/Userdata" element={<ProtectedRoute><Userdata/></ProtectedRoute>}></Route>
              <Route path="/product" element={<ProtectedRoute><Product/></ProtectedRoute>}></Route>
              <Route path="/Viewproducts" element={<ProtectedRoute><Viewproducts/></ProtectedRoute>}></Route>
              <Route path="/Editproducts/:id" element={<ProtectedRoute><Editproducts/></ProtectedRoute>}></Route>
              <Route path="/Productdetails/:id" element={<ProtectedRoute><Productdetails/></ProtectedRoute>}></Route>
            </Routes>
        </BrowserRouter>
        <ToastContainer position ='top-center' autoClose={2000} pauseOnHover closeOnClick/>
      </div>
    </UserProvider>

  )
}

export default App