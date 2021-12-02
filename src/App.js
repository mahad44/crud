import './App.css';
//import './style.css';
import About from './About.js';
import Login from './Login.js';
import Register from './Register.js';
import Addproducts from './Addproducts.js';
import Productdetail from './Productdetail';
import Edit from './Edit.js';
import Products from './Products.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState,useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { BrowserRouter , Route, Link, Switch,Redirect} from "react-router-dom";

function App() {
  
  return(
    <div>
  <BrowserRouter>
  
  <Switch>
  <Route path={"/"} exact component={Login} />
    <Route path={"/about"} component={About} />
    <Route path={"/edit"} component={Edit} />
    <Route path={"/register"} component={Register} />
    <Route path={"/products"} component={Products} />
    <Route path={"/addproducts"} component={Addproducts} />
    <Route path={"/productdetail"} component={Productdetail} />

  </Switch>
</BrowserRouter>
</div>
  );
}



export default App;
