import './App.css';
import About from './About.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./HeaderComponent";
import React, {useState,useEffect} from 'react';
import { useHistory,withRouter } from "react-router-dom";
import  { Redirect } from 'react-router-dom'


function Register() {
    const[name,setName]=useState("")
    const[email,setEmail]=useState("")
    const[gender,setGender]=useState("")
    const[password,setPassword]=useState("")
    const[message,setMessage]=useState("")
    const [fileInputState, setFileInputState]= useState("");
    const[date,setDate]=useState("")
    const [previewSource, setPreviewSource] = useState("");



    let hist=useHistory();

    const handleFileInputChange = (e) =>  {
      const file = e.target.files[0];
      previewFile(file);
    }

    const previewFile = (file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () =>{
        setPreviewSource(reader.result);
      }
    }

    const handleSubmitFile = (e) => {
      console.log("submitting");
      if(!previewSource) return;
       else {uploadImage(previewSource);
        hist.goBack();
        <Redirect to='/' />;}
      
    }

    const uploadImage = async (base64EncodedImage) => {
      console.warn("data",name,email,gender,password)
      let Image=base64EncodedImage;
      let item ={name,email,gender,password,Image,dateofBirth:date}
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
        hist.push({ pathname:'/', state: {obj:result} });
      }
    }
    
    

    return(
    <div>
      <Header/>
    <br></br>
    <br></br>
    <div className="container-fluid">
    <div className="row">

    <div className="col-sm-3 ">
      <br></br>
      <img className="loginImage" src="/login.JPG"/>
    </div>

    <div className="col-sm-9">
    <div className="App3">
    <div className="create">

      <h1>Register</h1>
      <div className="col-sm-12 ">
     <input type="text" placeholder="Name" className="form-control"
     onChange={(e)=>setName(e.target.value)}/>
     <br/>
     <input type="text" placeholder="Email" className="form-control"
     onChange={(e)=>setEmail(e.target.value)}/>
     <br/>
     <input type="password" placeholder="password" className="form-control"
     onChange={(e)=>setPassword(e.target.value)}/>
     <br/>
     <input type="date" placeholder="Date" className="form-control"
     onChange={(e)=>setDate(e.target.value)}/>
     <br/>
     
     <select
          onChange = {(e) => setGender(e.target.value)}>
            <option value="none">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="na">don't want to mention</option>
          </select>
      <br/>
      <input type="file" name="image" onChange={handleFileInputChange}
          value={fileInputState} className="form-input"/>
     
     </div>

     <h6> {message}</h6>
      <button onClick={()=>handleSubmitFile()} className="btn btn-primary">Register</button>
      

    </div>
   
    </div>

    </div>
    </div>
    </div>
    </div>
    

    );
}

export default Register;
