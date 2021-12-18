import "./App.css";
import About from "./About.js";
import Header from "./HeaderComponent";
import ReactRoundedImage from "react-rounded-image";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
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

function Profile() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState();
  const [products, setProducts] = useState([]);
  let hist = useHistory();

  useEffect(() => {
    const token1 = localStorage.getItem("token");
    const userid = localStorage.getItem("userid");
    setToken(token1);

    async function fetchProducts() {
      let response = await fetch(
        `http://localhost:4000/users/myproducts/${userid}`,
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
      console.log("results", result.listofproducts);
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

    fetchUser();
    fetchProducts();
  });

  function details(item) {
    localStorage.setItem("item", JSON.stringify(item));
    hist.push("/productdetailprofile", item);
  }
  function addproduct() {
    hist.push("/addproducts");
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
          </div>
        </div>
      </div>
      <hr></hr>

      <div className="d-flex justify-content-center">
      
              <a class="btn btn-primary mr-1" onClick={()=>addproduct()}>Add Product</a>
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
    </div>
  );
}

export default Profile;
