import React, { useState, useEffect, Component } from "react";
import { useHistory, useLocation, Redirect, Link } from "react-router-dom";
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

const Feeddetailprofile = (props) => {
    const [value, setValue] = useState(1);
    const location = useLocation();
    const [boolean, setBoolean] = useState(false);


    //const item = props.location.state;
    const item = JSON.parse(localStorage.getItem("feed"));
    console.log("product", item);
    let hist = useHistory();

    async function remove() {
        const token = localStorage.getItem("token");

        console.log("item", item._id)

        let response = await fetch(
            `http://localhost:4000/users/deletefeed/${item._id}`,
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
        hist.goBack();
        <Redirect to='/profile' />;


    }

    function noRefCheck() {
        setBoolean(!boolean)
    }



    return (
        <div>
            <Header />
            <div>
                <div>
                    <Card key={item.id} >
                        <CardBody>
                            <CardTitle tag="h5">{item.text}</CardTitle>
                            <img alt="Card image cap" src={item.feedImage} width="300px" height="300px" />
                        </CardBody>

                        <CardBody>
                            <CardText>

                            </CardText>

                            <Link to={{ pathname: "/editfeed", item: item }}>
                                {" "}
                                <a class="btn btn-secondary mr-1">Edit</a>
                            </Link>

                            <Button color="danger" onClick=
                                {() => noRefCheck()}>
                                Delete
                            </Button>{" "}

                        </CardBody>
                    </Card>
                </div>

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
        </div>
    );
};
export default Feeddetailprofile;
