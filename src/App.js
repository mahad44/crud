import './App.css';
import About from './About.js';
import Login from './Login.js';
import Register from './Register.js';
import Edit from './Edit.js';
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
  </Switch>
</BrowserRouter>
</div>
  );
}



export default App;
