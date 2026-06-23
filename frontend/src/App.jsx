import React from 'react'
import axios from 'axios'

import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Orders from './pages/Orders'
import Dashboard from './pages/Dashboard'
import Userdata from './pages/Userdata'
import Product from './pages/product'
import Viewproducts from './pages/Viewproducts'

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'



function App(){
  axios.defaults.withCredentials=true
  return (
    <div>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Login/>}></Route>  
              <Route path="/register" element={<Register/>}></Route>
              <Route path="/login" element={<Login/>}></Route>       
              <Route path="/home" element={<Home/>}></Route>      
              <Route path="/Cart" element={<Cart/>}></Route>
              <Route path="/Orders" element={<Orders/>}></Route>
              <Route path="/Dashboard" element={<Dashboard/>}></Route>
              <Route path="/Userdata" element={<Userdata/>}></Route>
              <Route path="/product" element={<Product/>}></Route>
              <Route path="/Viewproducts" element={<Viewproducts/>}></Route>

          </Routes>
      </BrowserRouter>
      <ToastContainer position ='top-center' autoClose={2000} pauseOnHover closeOnClick/>
    </div>

  )
}

export default App