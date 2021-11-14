import './App.css';
import About from './About.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState,useEffect} from 'react';
import { useHistory,withRouter } from "react-router-dom";
import  { Redirect } from 'react-router-dom'


function Register() {
    const[firstName,setFname]=useState("")
    const[lastName,setLname]=useState("")
    const[username,setUser]=useState("")
    const[password,setPassword]=useState("")
    const[message,setMessage]=useState("")

    let hist=useHistory();



    async function registerUser(){
      console.warn("data",firstName,lastName,username,password)
      let item ={firstName,lastName,username,password}
      let result=await fetch('http://localhost:4000/users/register',{
        method:'POST',
        headers:{
          "Content-Type":"application/json",
          "Accept":"application/json"
        },
        
        body:JSON.stringify(item)
      });
      if(result.status!=200){
        result=await result.json();
        console.warn(result.status);
        setMessage(result.message)
      }
      else{
        result=await result.json();
        hist.push({ pathname:'/about', state: {obj:result} });
      }
    }
    
    

    return(
    <div className="App">
      <h1>Register</h1>
      <div className="col-sm-6 offset-sm-3">
     <input type="text" placeholder="First Name" className="form-control"
     onChange={(e)=>setFname(e.target.value)}/>
     <br/>
     <input type="text" placeholder="Last Name" className="form-control"
     onChange={(e)=>setLname(e.target.value)}/>
     <br/>
     <input type="text" placeholder="User Name" className="form-control"
     onChange={(e)=>setUser(e.target.value)}/>
     <br/>
     <input type="password" placeholder="password" className="form-control"
     onChange={(e)=>setPassword(e.target.value)}/>
     <br/>
     <h6> {message}</h6>
      <button onClick={registerUser} className="btn btn-primary">Register</button>
      

    </div>
   
    </div>

    );
}

export default Register;
