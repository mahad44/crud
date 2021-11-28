import './App.css';
import About from './About.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState,useEffect} from 'react';
import { useHistory,withRouter } from "react-router-dom";
import  { Redirect } from 'react-router-dom'


function Register() {
    const[name,setName]=useState("")
    const[email,setEmail]=useState("")
    const[gender,setGender]=useState("")
    const[password,setPassword]=useState("")
    const[message,setMessage]=useState("")


    let hist=useHistory();



    async function registerUser(){
      console.warn("data",name,email,gender,password)
      let item ={name,email,gender,password}
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
     <input type="text" placeholder="Name" className="form-control"
     onChange={(e)=>setName(e.target.value)}/>
     <br/>
     <input type="text" placeholder="Email" className="form-control"
     onChange={(e)=>setEmail(e.target.value)}/>
     <br/>
     <input type="text" placeholder="Gender" className="form-control"
     onChange={(e)=>setGender(e.target.value)}/>
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
