import React, { useState, useEffect, Component } from "react";
import './Products.css';
import { useHistory,useLocation } from "react-router-dom";
import { Navbar, NavbarBrand,Button,ModalFooter} from "reactstrap";
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

const Addproducts=(props) =>{
  const [products, setProducts] = useState([]);
  const [token1, setToken] = useState("");
  const [userid, setUserid] = useState("");
  const [name, setName] = useState("");
  const [fileInputState, setFileInputState]= useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [productname, setProductname] = useState("");
  const [productprice, setProductprice] = useState("");
  const [productcategory, setProductcategory]= useState("");

  let hist=useHistory();

  const useridtoken=localStorage.getItem("userid");
  const token=localStorage.getItem("token");

 console.log(useridtoken);
  const handleFileInputChange = (e) =>  {
    const file = e.target.files[0];
    previewFile(file);
  }

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () =>{
      setPreviewSource(reader.result);
    }
  }

  const handleSubmitFile = (e) => {
    console.log("submitting");
    if(!previewSource) return;
    uploadImage(previewSource);
  }

  const uploadImage = async (base64EncodedImage) => {
     console.log(base64EncodedImage);
     console.log(useridtoken);
     try{
       await fetch(`http://localhost:4000/users/addproduct/${useridtoken}`, {
         method : 'POST',
         body: JSON.stringify({data : base64EncodedImage, prodname: productname, 
          prodprice : productprice,
          prodcategory: productcategory}),
         headers: {'Content-type': 'application/json',
         Authorization: `Bearer ${token}`,
         Accept: "application/json",
        }
       })
     } catch(error){
       console.error(error);
     }
     console.log("product added")
  }
  
  return (
    <div>
      <Header />

      <div className="create">
        <h2>Add Product</h2>
        <form onSubmit={handleSubmitFile} className="form">
          <label>Product Name</label>
          <input type="text" 
          name="productname" 
          value={productname} 
          onChange= {(e) => setProductname(e.target.value)}/>
          <label>Price </label>
          <input type="number" 
          name="price" 
          value = {productprice}
          onChange={(e) => setProductprice(e.target.value)}/>
          <label> Cateogry </label>
          <select
          value = {productcategory}
          onChange = {(e) => setProductcategory(e.target.value)}>
            <option value="Electronic">Electronic</option>
            <option value="Clothes">Clothes</option>
            <option value="Accessories">Accessories</option>
            <option value="Fitness">Fitness</option>
          </select> 
          <input type="file" name="image" onChange={handleFileInputChange}
          value={fileInputState} className="form-input"/>
          <button className="btn" type="submit">Submit</button>
        </form>
      </div>

    </div>
  );
}

export default Addproducts;
