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
                <NavLink className="nav-link" to="/about"><span className="fa fa-home fa-lg"></span>Home</NavLink>
            </NavItem>
            <NavItem>
                <NavLink className="nav-link" to="#"><span className="fa fa-info fa-lg"></span>About Us</NavLink>
            </NavItem>
            <NavItem>
                <NavLink className="nav-link" to="/products"><span className="fa fa-list fa-lg"></span>Products</NavLink>
            </NavItem>
            <NavItem>
                <NavLink className="nav-link" to="#"><span className="fa fa-address-card fa-lg"></span>Contact Us</NavLink>
            </NavItem>
            <NavItem>
                <NavLink className="nav-link" to="#"><span className="fa fa-shopping-cart fa-lg align-right shoppingcart"></span>Cart</NavLink>
            </NavItem>
          </Nav>
          </Collapse>
          </div>
        </Navbar>
        
      </React.Fragment>
    );
  }
}

export default Header;
