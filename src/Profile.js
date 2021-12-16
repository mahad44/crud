import './App.css';
import About from './About.js';
import Header from './HeaderComponent';
import ReactRoundedImage from "react-rounded-image";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState,useEffect} from 'react';
import { useHistory,withRouter,useLocation } from "react-router-dom";
import  { Redirect,Link } from 'react-router-dom'
import {
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    NavItem,
    Jumbotron,
    Form,
    FormText,
    Input,
    Label,
    FormGroup,
  
  } from "reactstrap";


function Profile() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState();


  useEffect(() => {
    async function fetchUser() {

      const token1 = localStorage.getItem("token");
      const userid = localStorage.getItem("userid");

      setToken(token1);
      

      let response = await fetch(
        `http://localhost:4000/users/getuser/${userid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      let result = await response.json();
      setUser(result.foundUser);
      //console.log("result",result)
      console.warn("received user", user);
    }
    fetchUser();
  });

return(
    <div>
    <Header/>
    <br></br>
    <div className="container">
    <div className="row">
    <div className="col-sm-6 d-flex justify-content-start" >
    {user && 
    <ReactRoundedImage
    image={user.Image}
    roundedColor="#321124"
    imageWidth="250"
    imageHeight="250"
    roundedSize="3"
    borderRadius="140"
  />
   }
  
   </div>
   <div className="col-sm-6 float-start">
     <br></br>
   <h3>Name: {user && user.name}</h3>
   <br></br>
   <h3>Email: {user && user.email}</h3>
   <br></br>
  <Link to ={{pathname:"/editprofile", user:user}}> <a  class="btn btn-primary mr-1">Edit Profile</a></Link> 
</div>
   </div>
   </div>
   <hr></hr>


         
    </div>
)
}


export default Profile;