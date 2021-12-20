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

const Editfeed=(props) =>{
  const [products, setProducts] = useState([]);
  const [token1, setToken] = useState("");
  const [name, setName] = useState("");
  const [fileInputState, setFileInputState]= useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [productname, setProductname] = useState("");
  const [productprice, setProductprice] = useState("");
  const [productcategory, setProductcategory]= useState("");
  const [quantity, setQuantity]= useState("");
  const [product, setProduct]= useState("");
  const [text, setText] = useState("");



  const item=props.location.item;   
 



  let hist=useHistory();

  const userid=localStorage.getItem("userid");
  const token=localStorage.getItem("token");

  useEffect(() => {
    async function fetchProducts() {
        //const token1 = props.location.state.obj.token;
        const token1 = localStorage.getItem("token");
        setToken(token1);
        console.log("token", token);
  
        let response = await fetch(
          `http://localhost:4000/users/productsbyuser/${userid}`,
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
        setProducts(result.product);
        //console.log("result",result)
        console.warn("received api", products);
      }
      fetchProducts();
        
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
       await fetch(`http://localhost:4000/users/updatefeed/${item._id}`, {
         method : 'PUT',
         body: JSON.stringify({image : base64EncodedImage, text: text, 
          product:product}),
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
        <h1>Edit Feed</h1>
        <br></br>
        <form onSubmit={()=>handleSubmitFile()} className="form">
          <label>Feed Text</label>
          <input type="textarea" 
          name="text"
          className="feedtext"
          placeholder={item && item.text}
          onChange= {(e) => setText(e.target.value)}/>

          <label> Add Product  </label>


          
          <select
          onChange = {(e) => setProduct(e.target.value)}>
            
            <option value="none">Select Product</option>
            {products &&
          products.map((item) => {
            return (
            <option value={item._id}>{item.productname}</option>
             )
            })}
          </select> 
           

          <input type="file" name="image" onChange={handleFileInputChange}
          value={fileInputState} className="form-input"/>
          <button className="btn" type="submit">Submit</button>
        </form>
      </div>
      </div>


      </div>
      </div>

    </div>
  );
}

export default Editfeed;
