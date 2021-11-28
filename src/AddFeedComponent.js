import React,{useState,useEffect} from "react";
import react, { Component } from "react";
import {
  Card,
  CardBody,
  Button,
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
import { NavLink } from "react-router-dom";

function AddFeed() {
  const[text,setText]=useState("")

  
    async function postFeed(){
      const token = localStorage.getItem("token");
      const userid = localStorage.getItem("userid");
      const name= localStorage.getItem("name");
     
      let item={userid,text,name}

      let response = await fetch(
        'http://localhost:4000/users/uploadfeed',
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          body:JSON.stringify(item)

        });
      let result = await response.json();
      console.log("result",result)
    }
  
  

  return (
    <div>
      <Card>
      <CardBody>
      <Form>
        <FormGroup>
          <Label for="exampleText">Add Your Post</Label>
          <Input id="exampleText" name="text" type="textarea" 
          onChange={(e)=>setText(e.target.value)} />
        </FormGroup>
        <button className="postButton"
          onClick={() => {
           postFeed();
          }}
        >
          <a>Post</a>
        </button>
      </Form>
      </CardBody>
      </Card>
    </div>
  );
}

export default AddFeed;
