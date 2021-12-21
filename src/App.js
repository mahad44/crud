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
import AdminLogin from './Adminlogin.js';
import AdminUser from './AdminUser.js';
import AdminFeed from './AdminFeed.js';
import AdminAddUser from './AdminAddUser.js';
import AdminAddProduct from './AdminAddProduct.js';
import AdminAddFeed from './AdminAddFeed.js';
import AdminUserEdit from './AdminUserEdit.js';
import AdminProduct from './AdminProduct.js';
import AdminEditProduct from './AdminEditProduct';
import AdminEditFeed from './AdminEditFeed';
import Products from './Products.js';
import Admin from './Admin.js';
import Profile from './Profile.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-credit-cards/es/styles-compiled.css';
import React, {useState,useEffect} from 'react';
import ProtectedRoute from './ProtectedRoute.js';
import ProtectedRouteAdmin from './ProtectedRouteAdmin';
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
    <ProtectedRouteAdmin path={"/adminportal"} component={Admin} />
    <ProtectedRouteAdmin path={"/adminuseredit"} component={AdminUserEdit} />
    <ProtectedRouteAdmin path={"/adminuser"} component={AdminUser} />
    <ProtectedRouteAdmin path={"/adminproduct"} component={AdminProduct} />
    <ProtectedRouteAdmin path={"/adminfeed"} component={AdminFeed} />
    <ProtectedRouteAdmin path={"/adminadduser"} component={AdminAddUser} />
    <ProtectedRouteAdmin path={"/adminaddproduct"} component={AdminAddProduct} />
    <ProtectedRouteAdmin path={"/adminaddfeed"} component={AdminAddFeed} />
    <ProtectedRouteAdmin path={"/admineditproduct"} component={AdminEditProduct} />
    <ProtectedRouteAdmin path={"/admineditfeed"} component={AdminEditFeed} />
    <Route path={"/adminlogin"} component={AdminLogin} />
    <Route path={"/logout"} component={Logout} />



  </Switch>
</BrowserRouter>
</div>
  );
}



export default App;
