import React, { useState, useEffect, Component } from "react";
import { useHistory,useLocation } from "react-router-dom";
import { Navbar, NavbarBrand,Button,ModalFooter} from "reactstrap";
import Header from "./HeaderComponent";
import AddFeed from "./AddFeedComponent";
import ModalComponent from "./EditModalComponent";
import EdiText from 'react-editext'
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardSubtitle,
  CardLink,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";

const About=(props) =>{
  const [feeds, setFeeds] = useState([]);
  const [token, setToken] = useState("");
  const [userid, setUserid] = useState("");

  let hist=useHistory();



  useEffect(() => {
    async function fetchFeed() {
    
      //const token1 = props.location.state.obj.token;
      const token1 = localStorage.getItem("token");
      setToken(token1);
      
      //const userid1 = props.location.state.obj.user_id;
      const userid1 = localStorage.getItem("userid");
      setUserid(userid1);
    
      console.log("userid:",userid);
      console.log("token",token);

      let response = await fetch(
        `http://localhost:4000/users/myfeeds/${userid}`,
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
      setFeeds(result.feed);
      console.log("result",result)
      console.warn("received api", feeds);
     
    }
    fetchFeed();
    
  });

  async function deleteFeed(feedid){
    console.log("feedid",feedid)
    let response = await fetch(
      `http://localhost:4000/users/deletefeed/${feedid}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },

      });
    let result = await response.json();
    console.log("result deleted",result)
  }
 
  const edit = (id,text) => {
    localStorage.setItem('id',id);
    localStorage.setItem('prevtext',text);

    hist.push("/edit", {id:id,token:token,prevtext:text});  
  }

  return (
    <div>
      <Header />
      <AddFeed/>
      <div>
      {feeds.map((item)=>{
        return(
          <div>
      <Card key={item.id} >
        <CardBody>
          <CardTitle tag="h5">{item.text}</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
          </CardSubtitle>
        </CardBody>
        <img alt="Card image cap" src="logo.jpg" width="100px" height="100px" />
        <CardBody>
          <CardText>
          
          </CardText>
          
          <button onClick={() => edit(item._id,item.text)}>
            Edit
          </button>
          <button type="button" className="secondary" onClick={() => deleteFeed(item._id)}>
           Delete
          </button>
        </CardBody>
      </Card>
      </div>
      )
      })}
      </div>
      <div className="col-sm-6 offset-sm-3">
        <h1> Successful</h1>
        
        <p>Welcome to About Page </p>
        <p> </p>
        
        <button
          onClick={() => {
            //history.goBack();
          }}
        >
          <a href="/">Logout</a>
        </button>
      </div>
      
      
      <EdiText
        type='text'
        value='What is real? How do you define real?'
      />
    </div>
  );
}

export default About;
