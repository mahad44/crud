import React, { useState, useEffect, Component,Link } from "react";
import { useHistory,useLocation } from "react-router-dom";
import PaginationComponent from "react-reactstrap-pagination";
import { Navbar, NavbarBrand,Button,ModalFooter,Pagination,PaginationItem,PaginationLink} from "reactstrap";
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

const Poductdetail=(props) =>{
    const [value, setValue] = useState(1);
    const location = useLocation();

    //const item = props.location.state;
    const item =JSON.parse(localStorage.getItem("item"));
    console.log("product",item)
    let hist = useHistory();



/**  useEffect(() => {
  }**/
  
  function increment(quantity) {
    console.log("quantity",quantity)
    if(value<quantity){
    setValue(value+1);}
  }

  function decrement() {
    if(value>1){
    setValue(value-1);}
}


async function AddtoCart() {
  const userid = localStorage.getItem("userid");
  const token = localStorage.getItem("token");

  let response=await fetch(`http://localhost:4000/users/addtocart?userid=${userid}&quantity=${value}&product=${item._id}&price=${item.price}&name=${item.productname}`,{
    method:'POST',
    headers:{
      "Content-Type":"application/json",
      Authorization: `Bearer ${token}`,
      "Accept":"application/json"
    },
  });
  let result=await response.json();
  

  hist.push('/products');
  


}



  return (
   <div>
 <Header/>
 <div>
 <section class="section-content padding-y bg">
        <div class="container">
    
        <article class="card">
            <div class="card-body">
                    <div class="row">
                        <aside class="col-md-6">
                                <article class="gallery-wrap">
                                    <div class="card img-small-wrap">
                                        <a href="#" > <img src={item.productimage} className="displayimg" /></a>
                                     </div>  
                                    </article> 
                          </aside>   
                          <main class="col-md-6">
                            <article>
                            <h6>{item.category}</h6>
                            <h3 class="title">{item.productname}</h3>
                            <div class="mb-3">
                            <h6>Short description</h6>
                            </div>

                            <div class="mb-3">
                                    <var class="price h4">${item.price}</var> <br />
                                </div> 
                                {item.quantity>0?  <div>{item.quantity}

                                <p>
                             Set the quantity
                                </p>
                             <div className="quantity-input">
                                <button className="quantity-input__modifier quantity-input__modifier--left" onClick={decrement}>
                                     &mdash;
                                </button>
                                 <input className="quantity-input__screen" type="text" value={value} readonly />
                             <button className="quantity-input__modifier quantity-input__modifier--right" onClick={()=>increment(item.quantity)}>
                                &#xff0b;
                             </button>  
                                  </div>  
                                    <br></br>
                                <div class="mb-4">
                                    <a href="#" class="btn btn-primary mr-1" onClick={()=>AddtoCart()}>Add to cart</a>
                                </div>
                                </div>
                                : <h5>Out of Stock</h5>}
                            </article> 
                            </main>     
                        </div> 
                    </div>
               </article>
                </div>
            </section>
        </div>
   </div>
  );

  }
export default Poductdetail;
