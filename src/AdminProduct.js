import "./App.css";
import About from "./About.js";
import AdminHeader from "./AdminHeader";
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
    CardSubtitle,
    NavItem,
    Jumbotron,
    Form,
    FormText,
    Input,
    Label,
    FormGroup,
    Button,
    CardImg,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "reactstrap";

function AdminProduct() {
    const [token, setToken] = useState("");
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [feeds, setFeeds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [feedPage, setFeedpage] = useState(1);
    const [searchtext, setSearchtext] = useState("");
    const [productboolean, setProductboolean] = useState(true);
    const [boolean, setBoolean] = useState(false);
    const [removeuser, setRemoveUser] = useState();



    let hist = useHistory();

    useEffect(() => {
        const token1 = localStorage.getItem("token");
        const userid = localStorage.getItem("userid");
        setToken(token1);


        async function fetchUser() {
            let response = await fetch(
                `http://localhost:4000/users/alladminproducts`,
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
            setUsers(result.productsList);
             console.log("result", result)
            // console.warn("received user", user);
        }


        fetchUser();
    });

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
        // console.log("searchresult", result)
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

    function togglefunct() {
        setProductboolean(!productboolean)
    }

    async function remove(user) {
        const token = localStorage.getItem("token");

        //console.log("item",user._id)

        let response = await fetch(
            `http://localhost:4000/users/deleteproduct/${removeuser}`,
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
        console.log("result", result)
        noRefCheck();



    }

    function removeUser(user) {
        //setProduct(cart);
        setRemoveUser(user);
        noRefCheck()
    }

    function noRefCheck() {
        setBoolean(!boolean)
    }

    function adduser() {
        hist.push("/adminaddproduct");
    }

    return (
        <div>
            <AdminHeader />
            <br></br>

            <div className="d-flex justify-content-center">

                <a className="btn btn-primary" onClick={() => adduser()}>
                    Add Product
                </a>
                

            </div>

            <br></br>
            {users && users.map((user) => {
                return (
                    <div>
                        <Card
                        >
                            <div className="card_img">
                            <img src={user.productimage}/>
                            </div>
                            <CardBody>
                                <CardTitle tag="h5">
                                    Id: {user._id}
                                </CardTitle>
                                <CardSubtitle
                                    className="mb-2 text-muted"
                                    tag="h6"
                                >
                                    Name: {user.productname}
                                </CardSubtitle>
                                <CardText>
                                    Category: {user.category}
                                    <br></br>
                                    Price: ${user.price}
                                    <br></br>
                                    quantity: {user.quantity}

                                </CardText>
                                <Link to={{ pathname: "/admineditproduct", item: user }}>
                                    {" "}
                                    <a class="btn btn-secondary mr-1">Edit</a>
                                </Link>
                                <Button color="danger" onClick=
                                    {() => removeUser(user._id)}>
                                    Delete
                                </Button>{" "}
                            </CardBody>
                        </Card>
                        <Modal isOpen={boolean} toggle={function noRefCheck() { }}>
                            <ModalHeader toggle={() => noRefCheck()}>
                                Confirmation
                            </ModalHeader>
                            <ModalBody>
                                Are you sure you want to remove this product?
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" onClick={() => remove()}>
                                    Remove
                                </Button>{" "}
                                <Button onClick={() => noRefCheck()}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                    </div>

                )

            })}


        </div>

    );
}

export default AdminProduct;
