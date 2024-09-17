import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector } from 'react-redux';
import { signup } from '../features/signupSlice';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const[username , setUserName] =useState("")
  const[email , setEmail] =useState("")
  const[password , setPassword] =useState("")

  const {name} = useSelector((state)=>state.signup)
  console.log(name)
 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleform(e){
    e.preventDefault();
    const formData = {username,email,password};

    dispatch(signup(formData));
   
}
useEffect(()=>{
  if(name.status === 201){
    navigate("/")
  }else{
    navigate("/signup")
  }
},[name])



  return (
    <div>
    <section className="vh-100" style={{backgroundColor:"#eee"}}>
<div className="container h-100">
<div className="row d-flex justify-content-center align-items-center h-100">
<div className="col-lg-12 col-xl-11">
  <div className="card text-black" style={{borderRadius: "25px"}}>
    <div className="card-body p-md-5">
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

          <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
          {/* <h5 id='message'>{message}</h5> */}
          <form className="mx-1 mx-md-4" onSubmit={(e)=>{handleform(e)}}>

            <div className="d-flex flex-row align-items-center mb-4">
              <i className="fas fa-user fa-lg me-3 fa-fw"></i>
              <div data-mdb-input-init className="form-outline flex-fill mb-0">
                <input type="text" id="form3Example1c" className="form-control" value={username} onChange={(e)=>{setUserName(e.target.value)}} />
                <label className="form-label" >Username</label>
              </div>
            </div>

            <div className="d-flex flex-row align-items-center mb-4">
              <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
              <div data-mdb-input-init className="form-outline flex-fill mb-0">
                <input type="email" id="form3Example3c" className="form-control" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                <label className="form-label">Your Email</label>
              </div>
            </div>

            <div className="d-flex flex-row align-items-center mb-4">
              <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
              <div data-mdb-input-init className="form-outline flex-fill mb-0">
                <input type="password" id="form3Example4c" className="form-control" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                <label className="form-label" >Password</label>
              </div>
            </div>

           

           

            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
              <button  type='submit' data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg">Register</button>
              
            </div>
            <p className="small fw-bold mt-2 pt-1 mb-0">Do you have an account?<Link to='/'
                className="link-danger">Login</Link></p>

          </form>

        </div>
        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
            className="img-fluid" alt="Sample image"/>

        </div>
      </div>
    </div>
  </div>
</div>
</div>
</div>
</section>
    </div>
  )
}

export default Signup
