import './App.css';
import About from './About.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState,useEffect} from 'react';
import { useHistory,withRouter,useLocation } from "react-router-dom";
import  { Redirect } from 'react-router-dom'
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


function Edit(props) {
   let location=useLocation();
    let hist=useHistory();
    //const feedid = props.location.state.id;
    const feedid=localStorage.getItem("id");
    //const token=props.location.state.token;
    const token=localStorage.getItem("token");
    //const prevtext=props.location.state.prevtext;
    const prevtext=localStorage.getItem("prevtext");

    const[text,setText]=useState("")
    //const [token, setToken] = useState("");
    
    useEffect(() => {
        
    })
   
   
    async function editFeed(feedid,token,text){

        console.log("feedid",feedid)
        let newtext={text}
        //prevtext=text;
        let response = await fetch(
          `http://localhost:4000/users/updatefeed/${feedid}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
            body:JSON.stringify(newtext)
          });
        let result = await response.json();
        console.log("result edited",result)
        //this.props.history.push("/about");
        hist.goBack();
      }


return(
    <div>
      <Form>
        <FormGroup>
          <Label for="exampleText">Text Area</Label>
          <Input id="exampleText" name="text" type="textarea" placeholder={prevtext}
          onChange={(e)=>setText(e.target.value)} />
        </FormGroup>
        <button
        onClick={() => {
           editFeed(feedid,token,text);
           }}
        >
          <a>Edit</a>
        </button>
      </Form>
      
    </div>
)
}


export default Edit;