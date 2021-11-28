import React, { useState, useEffect, Component } from "react";
import { useHistory,useLocation } from "react-router-dom";
import { Navbar, NavbarBrand,Button,ModalFooter} from "reactstrap";
import Header from "./HeaderComponent";
import AddFeed from "./AddFeedComponent";
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

const Products=(props) =>{
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const [userid, setUserid] = useState("");
  const [name, setName] = useState("");

  let hist=useHistory();



  useEffect(() => {
    async function fetchProducts() {
    
      //const token1 = props.location.state.obj.token;
      const token1 = localStorage.getItem("token");
      setToken(token1);
      console.log("token",token)
      //const userid1 = props.location.state.obj.user_id;
      
    
      //console.log("userid:",userid);
      //console.log("token",token);

      let response = await fetch(
        `http://localhost:4000/users/allproducts`,
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
      setProducts(result.productsList);
     //console.log("result",result)
     console.warn("received api", products);
     
    }
    fetchProducts();
    
  });

  

  return (
    <div>
      <Header />

<div className="main_content">
{products && products.map((item)=>{
        return(
          <div className="card" key={item.id}>             
            <div className="card_img">
             <img src={item.productimage}/>
             <br></br>
            </div>
            <div className="card_header">
              <h2 className="productname">{item.productname}</h2>
              <p>{item.category}</p>
              <p className="price">${item.price}</p>
           <div className="btn">Add to Cart</div>
            </div>
          </div>
   )
})}
     
      </div>
    </div>
  );
}

export default Products;
