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

const Products=(props) =>{
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const [pager, setPage] = useState([]);

  const [userid, setUserid] = useState("");
  const [name, setName] = useState("");

  let hist=useHistory();


 let PageSize=3
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
        `http://localhost:4000/users/allproducts/${currentPage}`,
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

  function handleSelected(selectedPage) {
    console.log("selected", selectedPage);
    setCurrentPage(selectedPage );
  };
  

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
              <p className="price"><b>${item.price}</b></p>
           <div className="btn">View Details</div>
            </div>
          </div>
   )
})}
      </div>
      <div className="pagination">
      <PaginationComponent
          totalItems={50}
          pageSize={4}
          onSelect={handleSelected}
          maxPaginationNumbers={9}
          defaultActivePage={10}
        />
        </div>
    </div>
  );
}

export default Products;
