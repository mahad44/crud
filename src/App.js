import './App.css';
//import './style.css';
import About from './About.js';
import Login from './Login.js';
import Register from './Register.js';
import Logout from './logout.js';
import Addproducts from './Addproducts.js';
import Productdetail from './Productdetail';
import Editproducts from './EditProduct';
import Editfeed from './EditFeed';
import AddFeed from './AddFeed';
import Productdetailprofile from './Productdetailprofile';
import Feeddetailprofile from './Feeddetailprofile';
import Cart from './cart';
import Edit from './Edit.js';
import EditProfile from './EditProfile.js';
import Products from './Products.js';
import Profile from './Profile.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-credit-cards/es/styles-compiled.css';
import React, {useState,useEffect} from 'react';
import ProtectedRoute from './ProtectedRoute.js';
import { useHistory } from 'react-router-dom';
import { BrowserRouter , Route, Link, Switch,Redirect} from "react-router-dom";

function App() {
  
  return(
    <div>
  <BrowserRouter>
  
  <Switch>
  <Route path={"/"} exact component={About} />
    <Route path={"/login"} component={Login} />
    <Route path={"/edit"} component={Edit} />
    <ProtectedRoute path={"/editprofile"} component={EditProfile} />
    <Route path={"/register"} component={Register} />
    <Route path={"/products"} component={Products} />
    <ProtectedRoute path={"/addproducts"} component={Addproducts} />
    <Route path={"/productdetail"} component={Productdetail} />
    <ProtectedRoute path={"/editproduct"} component={Editproducts} />
    <ProtectedRoute path={"/editfeed"} component={Editfeed} />
    <ProtectedRoute path={"/productdetailprofile"} component={Productdetailprofile} />
    <ProtectedRoute path={"/feeddetailprofile"} component={Feeddetailprofile} />
    <ProtectedRoute path={"/profile"} exact component={Profile} />
    <ProtectedRoute path={"/cart"} component={Cart} />
    <ProtectedRoute path={"/addfeed"} component={AddFeed} />
    <Route path={"/logout"} component={Logout} />



  </Switch>
</BrowserRouter>
</div>
  );
}



export default App;
