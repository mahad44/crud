import './App.css';
import About from './About.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState,useEffect} from 'react';
import { useHistory,withRouter } from "react-router-dom";
import  { Redirect } from 'react-router-dom'


  function Login() {
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const[message,setMessage]=useState("")
    let hist=useHistory();


    var that=this;
    /*useEffect(() =>{
      if(localStorage.getItem('user-info')){
        history.push("/about")
      }
    },[])*/
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
     //<Redirect to="/about"/>;
     
    // this.props.history.push("/about")
    localStorage.setItem('token',result.token);
    localStorage.setItem('userid',result.user_id);
    localStorage.setItem('name',result.name);
    console.log("password",password)
    hist.push({ pathname:'/about', state: {obj:result} });
     //break;
    }
  //}
  else{
  setMessage(result.message)
}

}

  return (
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
    <h5>Don't have an account? then  <a href="/register">Register</a></h5>
    </div>
   
    </div>
  );
  }

  export default Login;
