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
  Card,
  CardText,
  CardBody,
  CardTitle,
  NavItem,
  Jumbotron,
  Form,
  FormText,
  Input,
  Label,
  FormGroup,
  Button
} from "reactstrap";

function Profile() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState();
  const [products, setProducts] = useState([]);
  const [feeds, setFeeds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [feedPage, setFeedpage] = useState(1);
  const [searchtext, setSearchtext] = useState("");
  const [productboolean, setProductboolean] = useState(true);


  let hist = useHistory();

  useEffect(() => {
    const token1 = localStorage.getItem("token");
    const userid = localStorage.getItem("userid");
    setToken(token1);

    async function fetchProducts() {
      let response = await fetch(
        `http://localhost:4000/users/myproducts/${userid}?page=${currentPage}`,
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
      setProducts(result.listofproducts);
      //console.log("results", result.listofproducts);
    }

    async function fetchUser() {
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
      // console.warn("received user", user);
    }

    async function fetchFeeds() {
      let response = await fetch(
        `http://localhost:4000/users/myfeeds/${userid}?page=${feedPage}`,
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

    }

    fetchFeeds();
    fetchUser();
    fetchProducts();
  },[currentPage,feedPage]);

  async function search() {
    /**  setBoolean(
       category.filter((cat) =>
         cat.toLowerCase().includes(searchtext.toLowerCase())
       )
     );**/
     const userid = localStorage.getItem("userid");
     let response = await fetch(
      `http://localhost:4000/users/myproducts/${userid}?search=${searchtext}`,
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
     console.log("searchresult",result)
     setProducts(result.listofproducts);
   }
 

  function handleSelected(selectedPage) {
    setCurrentPage(selectedPage);
  }

  function handleSelectedFeed(selectedPage) {
    setFeedpage(selectedPage);
  }

  function details(item) {
    localStorage.setItem("item", JSON.stringify(item));
    hist.push("/productdetailprofile", item);
  }

  function feedDetails(item) {
    localStorage.setItem("feed", JSON.stringify(item));
    hist.push("/feeddetailprofile", item);
  }

  function addproduct() {
    hist.push("/addproducts");
  }

  function addfeed() {
    hist.push("/addfeed");
  }

  function togglefunct(){
    setProductboolean(!productboolean)
  }
  return (
    <div>
      <Header />
      <br></br>
      <div className="container">
        <div className="row">
          <div className="col-sm-6 d-flex justify-content-start">
            {user && (
              <ReactRoundedImage
                image={user.Image}
                roundedColor="#321124"
                imageWidth="250"
                imageHeight="250"
                roundedSize="3"
                borderRadius="140"
              />
            )}
          </div>
          <div className="col-sm-6 float-start">
            <br></br>
            <h3>Name: {user && user.name}</h3>
            <br></br>
            <h3>Email: {user && user.email}</h3>
            <br></br>
            <Link to={{ pathname: "/editprofile", user: user }}>
              {" "}
              <a class="btn btn-primary mr-1">Edit Profile</a>
            </Link>
            <a class="btn btn-primary mr-1" onClick={()=>addproduct()}> Add Product</a>
              <a class="btn btn-primary mr-1" onClick={()=>addfeed()}> Add Feed</a>
          </div>
        </div>
      </div>
      <hr></hr>

      <div className="d-flex justify-content-center">
      
      <a className="button3" onClick={()=>togglefunct()}>
             My Products
          </a>
          <a className="button3" onClick={()=>togglefunct()}>
             My Feeds
          </a>

      </div>
      {productboolean  ?(
       <div>
      <div class="search col-lg-3 col-sm-3 d-flex justify-content-end">
      <div class="input-group w-100">
          <input
            type="text"
            class="form-control"
            placeholder="Search"
            onChange={(e) => setSearchtext(e.target.value)}
          />
          </div>
          <div class="input-group-append">
          <button
              class="btn btn-primary"
              type="button"
              onClick={() => search()}
            >
              <i class="fa fa-search"></i>
            </button>
          </div>
          </div>
     
      <div className="main_content">
        {products &&
          products.map((item) => {
            return (
              <div className="card" key={item.id}>
                <div className="card_img">
                  <img src={item.productimage} />
                  <br></br>
                </div>
                <div className="card_header">
                  <h2 className="productname">{item.productname}</h2>
                  <p>{item.category}</p>
                  <p className="price">
                    <b>${item.price}</b>
                  </p>
                  <button className="btn" onClick={() => details(item)}>
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
      </div>
      <div className="pagination">
        <PaginationComponent
          totalItems={50}
          pageSize={4}
          onSelect={handleSelected}
          maxPaginationNumbers={9}
          defaultActivePage={1}
        />
      </div>
      </div>
     ):(<div>
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
          
          <a className="button3" onClick={()=>feedDetails(item)}>
                    View Details
          </a>

          
         
        </CardBody>
      </Card>
      </div>
      )
      })}
      <div className="pagination">
        <PaginationComponent
          totalItems={50}
          pageSize={4}
          onSelect={handleSelectedFeed}
          maxPaginationNumbers={9}
          defaultActivePage={1}
        />
      </div>
     </div>)}
    </div>
  );
}

export default Profile;
