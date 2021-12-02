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
    const [value, setValue] = useState(0);
    const location = useLocation();

    const item = props.location.state;


/**  useEffect(() => {
  }**/
  
  function increment() {
    setValue(value+1);
  }

  function decrement() {
    setValue(value-1);
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
                            <h6>Clothes</h6>
                            <h3 class="title">{item.productname}</h3>
                            <div class="mb-3">
                            <h6>Short description</h6>
                            </div>
                            <div class="mb-3">
                                    <var class="price h4">${item.price}</var> <br />
                                </div> 
                                <p>
                             Set the quantity
                                </p>
                             <div className="quantity-input">
                                <button className="quantity-input__modifier quantity-input__modifier--left" onClick={decrement}>
                                     &mdash;
                                </button>
                                 <input className="quantity-input__screen" type="text" value={value} readonly />
                             <button className="quantity-input__modifier quantity-input__modifier--right" onClick={increment}>
                                &#xff0b;
                             </button>  
                                  </div>  
                                    <br></br>
                                <div class="mb-4">
                                    <a href="#" class="btn btn-primary mr-1">Add to cart</a>
                                </div>
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
