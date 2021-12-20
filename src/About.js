import React, { useState, useEffect, Component } from "react";
import { useHistory,useLocation } from "react-router-dom";
import { Navbar, NavbarBrand,Button,ModalFooter} from "reactstrap";
import Header from "./HeaderComponent";
import FeedComponent from "./FeedComponent";
import AddFeed from "./AddFeed";

import Carousel from "./CarouselComponent";
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
  const [name, setName] = useState("");

  let hist=useHistory();



  useEffect(() => {
    async function fetchFeed() {
    
      //const token1 = props.location.state.obj.token;
      const token1 = localStorage.getItem("token");
      setToken(token1);
      
      //const userid1 = props.location.state.obj.user_id;
      const userid1 = localStorage.getItem("userid");
      setUserid(userid1);

      const name1 = localStorage.getItem("name");
      setName(name1);
     // console.log("name:::",name)
    
      //console.log("userid:",userid);
      //console.log("token",token);

      let response = await fetch(
        `http://localhost:4000/users/allfeeds`,
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
      setFeeds(result.feedList);
     // console.log("result",result)
     // console.warn("received api", feeds);
     
    }
    fetchFeed();
    
  });

  async function deleteFeed(feedid){
   // console.log("feedid",feedid)
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
  //  console.log("result deleted",result)
  }
 
  const edit = (id,text) => {
    localStorage.setItem('id',id);
    localStorage.setItem('prevtext',text);

    hist.push("/edit", {id:id,token:token,prevtext:text});  

  }

  async function gotoproduct(product){
    let response = await fetch(
      `http://localhost:4000/users/product/${product}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );
    let item = await response.json()
    console.log("item",item.product)
    localStorage.setItem('item',JSON.stringify(item.product[0]));
    hist.push("/productdetail", item.product);
  }

  return (
    <div>
      <Header />
      <Carousel/>
      <FeedComponent/>
      <div>
      {feeds && feeds.map((item)=>{
        return(
          <div>
      <Card key={item.id} >
        <CardBody>
          <CardTitle tag="h5">{item.text}</CardTitle>
        <img alt="Card image cap" src={item.feedImage} width="300px" height="300px" />
        </CardBody>

        <CardBody>
          <CardText>
          
          </CardText>
          
          <a className="button3" onClick={() => edit(item._id,item.text)}>
                    View Details
          </a>

          <a className="button3" onClick={() => gotoproduct(item.product)}>
                    Go to Product
          </a>
          {/*
          <Button onClick={() => edit(item._id,item.text)}>
            Edit
          </Button>
          <Button color="danger"  onClick={() => deleteFeed(item._id)}>
           Delete
          </Button>
          */}
        </CardBody>
      </Card>
      </div>
      )
      })}
      </div>
      {/*
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
        />*/}
    </div>
  );
}

export default About;
