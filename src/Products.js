import React, { useState, useEffect, Component, Link } from "react";
import { useHistory, useLocation } from "react-router-dom";
import PaginationComponent from "react-reactstrap-pagination";
import {
  Navbar,
  NavbarBrand,
  Button,
  ModalFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import Header from "./HeaderComponent";
import AddFeed from "./AddFeedComponent";
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
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const Products = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [boolean, setBoolean] = useState([]);
  const [searchtext, setSearchtext] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const [token, setToken] = useState("");
  const [pager, setPage] = useState([]);
  const [userid, setUserid] = useState("");
  const [name, setName] = useState("");
   
  let category="";
  let hist = useHistory();

  let PageSize = 3;
  useEffect(() => {
    async function fetchProducts() {
      //const token1 = props.location.state.obj.token;
      const token1 = localStorage.getItem("token");
      setToken(token1);
      console.log("token", token);
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
  },[currentPage]);

  function handleSelected(selectedPage) {
    console.log("selected", selectedPage);
    setCurrentPage(selectedPage);
  }

  //for going to selected product page
  function details(item) {
    localStorage.setItem('item',JSON.stringify(item));
    hist.push("/productdetail", item);
  }

  async function search() {
   /**  setBoolean(
      category.filter((cat) =>
        cat.toLowerCase().includes(searchtext.toLowerCase())
      )
    );**/
    let response = await fetch(
      `http://localhost:4000/users/allproducts/${currentPage}?search=${searchtext}`,
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
  }

  function toggle() {
   setDropdown(!dropdown)
  }

  function Select(item){
   category=item;
    categorySelect()
  }

  async function categorySelect() {
    let response = await fetch(
      `http://localhost:4000/users/allproducts/${currentPage}?filter=${category}`,
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
   }

  return (
    <div>
      <Header />

      <div className="d-flex">
      
      </div>

      <div class="search col-lg-3 col-sm-3 d-flex justify-content-end">
      <Dropdown className="Dropdown" isOpen={dropdown} toggle={()=> toggle()}>
          <DropdownToggle className="caret" caret>Filter </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Categories</DropdownItem>
            <DropdownItem><div  onClick={() => Select("clothes")}>clothes</div></DropdownItem>
            <DropdownItem><div onClick={() => Select("electronics")}>electronics</div></DropdownItem>
            <DropdownItem><div onClick={() => Select("fitness")}>fitness</div></DropdownItem>
            <DropdownItem><div onClick={() => Select("accessories")}>accessories</div></DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <div class="input-group w-100">
          <input
            type="text"
            class="form-control"
            placeholder="Search"
            onChange={(e) => setSearchtext(e.target.value)}
          />
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
  );
};

export default Products;
