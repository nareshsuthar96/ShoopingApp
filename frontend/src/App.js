import React from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import { Toaster } from 'sonner';
import Signup from './components/Signup'
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/AdminDashboard';
import UserProduct from './components/UserProduct';
import Navbar from './components/Navbar';
import AdminProductForm from './components/AdminProductForm';
import AdminProductUpdate from './components/AdminProductUpdate';
import Addtocart from './components/Addtocart';
import Footer from './components/Footer';

import PrivateRoutes from './components/PrivateRoutes';
import Users from './components/Users';


const App = () => {
  return (
    <div>
    <Toaster richColors  position="top-center"/>
    <Router>
    <Navbar/>
      <Routes>
      <Route path='/' element={<LoginPage/>}/>
      <Route path='/signup' element={<Signup/>}/>
       
      <Route element ={<PrivateRoutes allowedRole={['admin']}/>}>

      <Route path='/dashboard' element={<AdminDashboard/>}/>
      <Route path='/addProductForm' element={<AdminProductForm/>}/>
      <Route path='/adminproductupdate/:id' element={<AdminProductUpdate/>}/>
      <Route path='/users' element={<Users/>}/>

      </Route>


      <Route element ={<PrivateRoutes allowedRole={['user']}/>}>

      <Route path='/product' element={<UserProduct/>} />
      <Route path='/shoppingcart' element={<Addtocart/>}/>

      </Route>
        
       
      </Routes>
      <Footer/>
    </Router>
      
    </div>
  )
}

export default App
