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
                <NavLink className="nav-link" to="/adminuser"><span className="fa fa-lg"></span>Users</NavLink>
            </NavItem>

            <NavItem>
                <NavLink className="nav-link" to="/adminproduct"><span className="fa fa-lg"></span>Products</NavLink>
            </NavItem>
            

             <NavItem>
             <NavLink className="nav-link logout" to="/adminfeed"><span className="fa  fa-lg"></span>Feeds</NavLink>
            </NavItem>

            <NavItem>
             <NavLink className="nav-link logout" to="/logout"><span className="fa fa-sign-out fa-lg "></span>Logout</NavLink>
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
