import './App.css';
import Header from "./HeaderComponent";
import About from './About.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState,useEffect} from 'react';
import { useHistory,withRouter } from "react-router-dom";
import  { Redirect } from 'react-router-dom'


  function AdminLogin() {
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const[message,setMessage]=useState("")
    let hist=useHistory();


    var that=this;
    


    async function login(){
    //console.warn("data",username,password)
    let item ={email,password}

    let response=await fetch('http://localhost:4000/users/login',{
      method:'POST',
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
      },
      body:JSON.stringify(item)
    });
    let result=await response.json();
    console.warn("received",result)
    console.warn("token",result.token)

    if (response.status==200){
      console.warn("yes");
      setMessage("user Successfully logged in");
    
      if (result.data.isAdmin){
    localStorage.setItem('token',result.data.token);
    localStorage.setItem('userid',result.data.user_id);
    localStorage.setItem('name',result.data.name);
    localStorage.setItem('isAuthenticated',"True");
    localStorage.setItem('isAdmin',"True");
    hist.push({ pathname:'/adminportal', state: {obj:result} });
      }

      else{
        setMessage("Admin login failed")
      }
      
    }
 

}

  return (
    <div>
      <Header/>
    <br></br>
    <br></br>
    <div className="container-fluid">
    <div className="row">

    <div className="col-sm-4 ">
      <br></br>
      <img className="loginImage" src="/login.JPG"/>
    </div>
    
    <div className="col-sm-8">
    <div className="App">
      <h1 id="heading">Connecting People with Products</h1>
      <br>
      </br>
      <div className="login col-sm-6 offset-sm-3">
     <input type="text" placeholder="Email" className="form-control"
     onChange={(e)=>setEmail(e.target.value)}/>
     <br/>
     <input type="password" placeholder="password" className="form-control"
     onChange={(e)=>setPassword(e.target.value)}/>
     <br/>
      <button onClick={login} className="btn btn-primary">Login</button>
      <br/>
     <h6> {message}</h6>
    </div>
   </div>

    </div>
    </div>
    </div>
    </div>
  );
  }

  export default AdminLogin;
