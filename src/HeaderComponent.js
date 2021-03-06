import React from "react";
import react, { Component } from "react";
import { Nav, Navbar, NavbarBrand, NavbarToggler,Collapse, NavItem,Jumbotron } from "reactstrap";
import {NavLink} from 'react-router-dom';

class Header extends Component {
  constructor(props){
    super(props);
    this.toggleNav=this.toggleNav.bind(this);
    this.state={
      isNavOpen:false
    };
  }
  toggleNav(){
    this.setState({
      isNavOpen:!this.state.isNavOpen
    });
  }
  render() {
    return (
      <React.Fragment>
        <Navbar dark expand="md">
          <div className="container1 w-container">
            <NavbarToggler onClick={this.toggleNav}/>
            <NavbarBrand className="mr-auto navitem"><img id="logo" src="logo.jpg" height="70" width="90"  alt="Socioholic"/></NavbarBrand>
          <Collapse isOpen={this.state.isNavOpen} navbar>
          <Nav navbar className="item mr-auto nav-bar w-nav-menu">
            <NavItem>
                <NavLink className="nav-link" to="/"><span className="fa fa-home fa-lg"></span>Home</NavLink>
            </NavItem>
            <NavItem>
                <NavLink className="nav-link" to="/products"><span className="fa fa-list fa-lg"></span>Products</NavLink>
            </NavItem>
            
            {localStorage.getItem("isAuthenticated")==null?(
              <NavItem>
              <NavLink className="nav-link logout" to="/login"><span className="fa fa-sign-in fa-lg "></span>Login</NavLink>
             </NavItem>
            ):(
              <Nav navbar className="item mr-auto nav-bar w-nav-menu">
              <NavItem>
                <NavLink className="nav-link" to="/cart"><span className="fa fa-shopping-cart fa-lg align-right shoppingcart"></span>Cart</NavLink>
            </NavItem>

              <NavItem>
                <NavLink className="nav-link" to="/profile"><span className="fa fa-user fa-lg "></span>My Profile</NavLink>
            </NavItem>

             <NavItem>
             <NavLink className="nav-link logout" to="/logout"><span className="fa fa-sign-out fa-lg "></span>Logout</NavLink>
            </NavItem>
            </Nav>
            )}
           
          </Nav>
          </Collapse>
          </div>
        </Navbar>
        
      </React.Fragment>
    );
  }
}

export default Header;
