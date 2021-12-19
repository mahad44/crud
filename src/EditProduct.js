import React, { useState, useEffect, Component } from "react";
import './Products.css';
import { useHistory,useLocation,Redirect} from "react-router-dom";
import { Navbar, NavbarBrand,Button,ModalFooter} from "reactstrap";
import Header from "./HeaderComponent";
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

const Editproducts=(props) =>{
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
  const [quantity, setQuantity]= useState("");

  const item=props.location.item;   
 



  let hist=useHistory();

  const useridtoken=localStorage.getItem("userid");
  const token=localStorage.getItem("token");
  useEffect(() => {
        
})

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
    //if(!previewSource) return;
   uploadImage(previewSource);
     
    
  }

  const uploadImage = async (base64EncodedImage) => {
    const token=localStorage.getItem("token");
  //  const item=localStorage.getItem("item");

    console.log("item: ",item._id)
     
     try{
       await fetch(`http://localhost:4000/users/editproduct/${item._id}`, {
         method : 'PUT',
         body: JSON.stringify({data : base64EncodedImage, productname: productname, 
          price : productprice,
          category: productcategory,quantity:quantity}),
         headers: {'Content-type': 'application/json',
         Authorization: `Bearer ${token}`,
         Accept: "application/json",
        }
       })
     } catch(error){
       console.error(error);
     }
     console.log("product added");
     hist.push("/profile");
     //<Redirect to='/profile' />;
  }
  
  return (
    <div>
      <Header />
    <br></br>
    <br></br>
    <div className="container-fluid">
    <div className="row">

    <div className="col-sm-4 addproduct">
      <img  src="/addproduct.JPG"/>
    </div>
    

    <div className="col-sm-8">
      <div className="create">
        <h1>Edit Product</h1>
        <form onSubmit={()=>handleSubmitFile()} className="form">
          <label>Product Name</label>
          <input type="text" 
          name="productname" 
          placeholder={item && item.productname}
          value={productname} 
          onChange= {(e) => setProductname(e.target.value)}/>

          <label>Price </label>
          <input type="number" 
          name="price" 
          placeholder={item && item.price}
          min="0"
          value = {productprice}
          onChange={(e) => setProductprice(e.target.value)}/>

        <label>Quantity </label>
          <input type="number" 
          name="quantity" 
          placeholder={item && item.quantity}
          min="0"
          value = {quantity}
          onChange={(e) => setQuantity(e.target.value)}/>

          <label> Cateogry </label>
          <select
          value = {productcategory}
          onChange = {(e) => setProductcategory(e.target.value)}>
            <option value="none">Category</option>
            <option value="Electronic">Electronic</option>
            <option value="Clothes">Clothes</option>
            <option value="Accessories">Accessories</option>
            <option value="Fitness">Fitness</option>
          </select> 
          <input type="file" name="image" onChange={handleFileInputChange}
          value={fileInputState} className="form-input"/>
          <a className="btn btn-success mr-1" onClick={()=>handleSubmitFile()}>Submit</a>
        </form>
      </div>
      </div>


      </div>
      </div>

    </div>
  );
}

export default Editproducts;
