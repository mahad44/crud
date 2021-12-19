import React, { useState, useEffect, Component } from "react";
import { useHistory, useLocation, Redirect,Link} from "react-router-dom";
import PaginationComponent from "react-reactstrap-pagination";
import {
  Navbar,
  NavbarBrand,
  Button,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import Header from "./HeaderComponent";
import Carousel from "./CarouselComponent";
import ModalComponent from "./EditModalComponent";
import EdiText from "react-editext";
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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

const Poductdetailprofile = (props) => {
  const [value, setValue] = useState(1);
  const location = useLocation();
  const [boolean, setBoolean] = useState(false);


  //const item = props.location.state;
  const item = JSON.parse(localStorage.getItem("item"));
  console.log("product", item);
  let hist = useHistory();

  async function remove() {
    const token = localStorage.getItem("token");

    console.log("item",item._id)

    let response = await fetch(
      `http://localhost:4000/users/deleteproduct/${item._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );
    let result = await response.json();
    console.log("result",result)
    noRefCheck();
    hist.goBack();
    <Redirect to='/profile' />;


  }

  function noRefCheck(){
    setBoolean(!boolean)
  }

  

  return (
    <div>
      <Header />
      <div>
        <section class="section-content padding-y bg">
          <div class="container">
            <article class="card">
              <div class="card-body">
                <div class="row">
                  <aside class="col-md-6">
                    <article class="gallery-wrap">
                      <div class="card img-small-wrap">
                        <a href="#">
                          {" "}
                          <img src={item.productimage} className="displayimg" />
                        </a>
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
                      {item.quantity > 0 ? (
                        <div>
                          Quantity: {item.quantity}

                          <br></br>
                          <br></br>
                          <div class="mb-4">

                          <Link to={{ pathname: "/editproduct", item: item }}>
                          {" "}
                          <a class="btn btn-secondary mr-1">Edit</a>
                            </Link>

                            <Button color="danger" onClick=
                            {()=>noRefCheck()}>
                              Delete
                            </Button>{" "}
                          </div>
                        </div>
                      ) : (
                          <div>
                        <h5>Out of Stock</h5>
                        <br></br>
                          <br></br>
                          <div class="mb-4">

                          <Link to={{ pathname: "/editproduct", item: item }}>
                          <a class="btn btn-secondary mr-1">Edit</a>
                           </Link>

                           <Button color="danger" onClick=
                            {()=>noRefCheck()}>
                              Delete
                            </Button>{" "}
                          </div>
                          </div>
                      )}
                    </article>
                  </main>
                </div>
              </div>
            </article>
          </div>
        </section>
        <Modal isOpen={boolean} toggle={function noRefCheck() {}}>
                <ModalHeader toggle={()=> noRefCheck()}>
                  Confirmation
                </ModalHeader>
                <ModalBody>
                  Are you sure you want to remove this product?
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" onClick={()=> remove()}>
                    Remove
                  </Button>{" "}
                  <Button onClick={()=> noRefCheck()}>Cancel</Button>
                </ModalFooter>
              </Modal>
      </div>
    </div>
  );
};
export default Poductdetailprofile;
