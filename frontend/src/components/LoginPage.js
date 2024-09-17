import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../features/loginSlice'
import { Link, useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
const LoginPage = () => {
  const {role,loading} = useSelector((state)=> state.login)
  const[username , setUserName] =useState("")
  const[password , setPassword] =useState("")
console.log(role)
  const dispatch = useDispatch()

  function handlesubmit(e){
    e.preventDefault()
    const data = {username,password}
    dispatch(login(data))
    console.log(data)
  }
  const navigate = useNavigate();

  useEffect(() => {
   
    if (role === 'admin') {
      navigate('/dashboard');
    } else if(role === 'user'){
      navigate('/product')
    }

   
  }, [role]);

 
  return (
    <div>
     <div>
      <section className="vh-100 mt-5" >
  <div className="container-fluid h-custom" style={{backgroundColor:'white'}} >
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-md-9 col-lg-6 col-xl-5">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          className="img-fluid" alt="Sample image"/>
      </div>
      <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1" >


        <form onSubmit={(e)=>{handlesubmit(e)}} >
          

          

          
          <div data-mdb-input-init className="form-outline mb-4">
            <input type="text" id="form3Example3" className="form-control form-control-lg"
              placeholder="Enter a valid username" value={username} onChange={(e)=>{setUserName(e.target.value)}}/>
            <label className="form-label">Username</label>
          </div>

         
          <div data-mdb-input-init className="form-outline mb-3">
            <input type="password" id="form3Example4" className="form-control form-control-lg"
              placeholder="Enter password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            <label className="form-label" >Password</label>
          </div>

          <div className="d-flex justify-content-between align-items-center">
           
           
            <a href="#!" className="text-body">Forgot password?</a>
          </div>

          <div className="text-center text-lg-start mt-4 pt-2">
            <button  type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg"
             style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }} >{loading ? <Spinner animation="border" variant="light" /> :'Login'}</button>
            <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <Link to='/signup'
                className="link-danger">Register</Link></p>
          </div>

        </form>
      </div>
    </div>
  </div>
  <div
    className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary mt-5">
 
    <div className="text-white mb-3 mb-md-0">
      Copyright © 2020. All rights reserved.
    </div>

    <div>
      <a href="#!" className="text-white me-4">
        <i className="fab fa-facebook-f"></i>
      </a>
      <a href="#!" className="text-white me-4">
        <i className="fab fa-twitter"></i>
      </a>
      <a href="#!" className="text-white me-4">
        <i className="fab fa-google"></i>
      </a>
      <a href="#!" className="text-white">
        <i className="fab fa-linkedin-in"></i>
      </a>
    </div>
    
  </div>
</section>
    </div>
      
    </div>
  )
}

export default LoginPage
