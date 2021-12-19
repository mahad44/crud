import "./App.css";
import About from "./About.js";
import Header from "./HeaderComponent";
import ReactRoundedImage from "react-rounded-image";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import PaginationComponent from "react-reactstrap-pagination";
import { useHistory, withRouter, useLocation } from "react-router-dom";
import { Redirect, Link } from "react-router-dom";
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
  Button
} from "reactstrap";



const Logout = () =>{
let hist=useHistory();
  localStorage.clear();
  hist.push("/login");

  return(
      <div>
     </div>
  )

}


export default Logout;
