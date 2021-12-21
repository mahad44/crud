import './App.css';
import AdminHeader from './AdminHeader';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState,useEffect} from 'react';
import { useHistory,withRouter,useLocation } from "react-router-dom";
import  { Redirect } from 'react-router-dom'
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


function AdminUserEdit(props) {
   let location=useLocation();
    let hist=useHistory();
    //const feedid = props.location.state.id;
    const userid=localStorage.getItem("userid");
    //const token=props.location.state.token;
    const token=localStorage.getItem("token");
    //const prevtext=props.location.state.prevtext;
    const prevtext=localStorage.getItem("prevtext");

    const[name,setName]=useState("");
    const[date,setDate]=useState();
    const[gender,setGender]=useState();
    const user=props.location.user;    
    const [fileInputState, setFileInputState]= useState("");
    const [previewSource, setPreviewSource] = useState("");
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
       // if(!previewSource) return;
        uploadImage(previewSource);
      }

      const uploadImage = async (base64EncodedImage) => {
        try{
            await fetch(`http://localhost:4000/users/updateprofile/${user._id}`, {
              method : 'PUT',
              body: JSON.stringify({image : base64EncodedImage, name: name,dateofBirth:date,gender:gender}),
              headers: {'Content-type': 'application/json',
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
             }
            })
            console.log("done");

          }

           catch(error){
            console.error(error);
          }
          hist.goBack();



      }
   
   /*
    async function editFeed(feedid,token,text){

        console.log("feedid",feedid)
        let newtext={text}
        //prevtext=text;
        let response = await fetch(
          `http://localhost:4000/users/updatefeed/${feedid}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
            body:JSON.stringify(newtext)
          });
        let result = await response.json();
        console.log("result edited",result)
        //this.props.history.push("/about");
        hist.goBack();
      }*/


return(
    <div>
        <AdminHeader/>
        <div className="container">
            <br></br>
            <h3 className="editheader">Edit Profile</h3>
            <br></br>
      <Form>
        <FormGroup>
        <h4>Change Name: </h4>
      <Input id="exampleText" type="text" placeholder={user && user.name}
          onChange={(e)=>setName(e.target.value)} />
          <br></br>
          <h4>Change Date: </h4>
          <Input id="exampleText" type="date" 
          onChange={(e)=>setDate(e.target.value)} />
          <br></br>
          <h4>Change Gender: </h4>
          <select
          onChange = {(e) => setGender(e.target.value)}>
            <option value="none">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="na">don't want to mention</option>
          </select>
          <br></br>
          <br></br>
          <h4>Change Profile Image: </h4>
          <input type="file" name="image" onChange={handleFileInputChange}
          value={fileInputState} className="form-input"/>
         <br></br>
         <br></br>
        </FormGroup>
     <a class="btn btn-success mr-1" onClick={()=>{handleSubmitFile()}}>Edit</a>
     <Button href="/profile">Cancel</Button>


      </Form>
      </div>
      
    </div>
)
}


export default AdminUserEdit;