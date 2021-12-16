import "./App.css";
import About from "./About.js";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import Header from "./HeaderComponent";
import PaymentForm from "./Payment";
import { useHistory, withRouter, useLocation } from "react-router-dom";
import { Redirect } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
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

function Cart() {
  const [carts, setCarts] = useState([]);
  //const [total, setTotal] = useState(0);
  const [boolean, setBoolean] = useState(false);
  const [checkoutboolean, setCheckoutboolean] = useState(false);
 // const [product, setProduct] = useState();
  let product;
 let total=0;

  useEffect(() => {
    async function fetchCart() {
      const token = localStorage.getItem("token");
      const userid = localStorage.getItem("userid");

      let response = await fetch(
        `http://localhost:4000/users/getcart/${userid}`,
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
      setCarts(result.cart);
      console.warn("received api", carts);
    }

    fetchCart();
  });

 

  async function remove() {

    const token = localStorage.getItem("token");

    let response = await fetch(
      `http://localhost:4000/users//deletecart/${product}`,
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
    noRefCheck()

  }

function removeProduct(cart){
  //setProduct(cart);
  product=cart;
  noRefCheck()
}

  function noRefCheck(){
    setBoolean(!boolean)
  }
  function noRefCheck2(){
    setCheckoutboolean(!checkoutboolean)
  }

  function getTotal() {
    total=0;
    {carts &&
      carts.map((cart) => {
        total=total+(cart.quantity*cart.price)
      })}

  }



 function checkout(){
    {carts &&
      carts.map((cart) => {
        let id=cart.product;
        let quantity=cart.quantity;
        let item={quantity}
        checkoutAll(id,item,cart._id);
       //setProduct(cart.id);
       product=cart._id;
       console.log("product",product)
        remove();


      })}
      noRefCheck2();
  }

  async function checkoutAll(id, item,cart){

    
    const token = localStorage.getItem("token");

    let response = await fetch(
      `http://localhost:4000/users/updatecart/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body:JSON.stringify(item)
      });
    let result = await response.json();
  }

  return (
    <div>
      <Header />
      {carts &&
        carts.map((cart) => {
          return (
            <div className="card" key={cart.id}>
              <Card>
                <CardBody>
                  <CardTitle tag="h5">
                    {cart.name} (${cart.price})
                  </CardTitle>
                  <CardSubtitle className="mb-2 text-muted" tag="h6">
                    Quantity: {cart.quantity}
                  </CardSubtitle>
                  <CardSubtitle className="mb-2 text-muted" tag="h6">
                    Price: ${cart.quantity * cart.price}
                    <Button className="float-right" onClick={() => removeProduct(cart._id)}>
                    <span className="fa fa-trash fa-lg"> </span>
                    &nbsp; Remove
                    </Button>
                  </CardSubtitle>
                </CardBody>
              </Card>

              <Modal isOpen={boolean} toggle={function noRefCheck() {}}>
                <ModalHeader toggle={()=> noRefCheck()}>
                  Confirmation
                </ModalHeader>
                <ModalBody>
                  Are you sure you want to remove this product?
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" onClick={()=> remove() }>
                    Remove
                  </Button>{" "}
                  <Button onClick={()=> noRefCheck()}>Cancel</Button>
                </ModalFooter>
              </Modal>

              <Modal isOpen={checkoutboolean} toggle={function noRefCheck2() {}}>
                <ModalHeader toggle={()=> noRefCheck2()}>
                  Checkout 
                </ModalHeader>
                <ModalBody>
                  <h5>Are you sure you want to Checkout?</h5>
                  {getTotal()}
                  <br></br>
                  <h4>Total Payment= ${total}</h4>
                  <br></br>
                  <div>
                  <PaymentForm/>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="success" onClick={()=> checkout() }>
                    Checkout
                  </Button>{" "}
                  <Button onClick={()=> noRefCheck2()}>Cancel</Button>
                </ModalFooter>
              </Modal>
            </div>
          );
        })}

        <div >
        <Card className="total">
          {getTotal()}
          <CardTitle className="totalContent">
          <h2>Total : &nbsp;  <span className="totalpice">${total}</span></h2>
          <Button color="success" className="cartproceed"  onClick={() => noRefCheck2()}>
                    <span className="fa fa-shopping-cart fa-lg"> </span>
                    &nbsp; CheckOut
                    </Button>
          </CardTitle>
        </Card>
        </div>
    </div>
  );
}

export default Cart;
