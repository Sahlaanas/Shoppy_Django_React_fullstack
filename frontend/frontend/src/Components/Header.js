import React from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import logo from "../assets/shoppy-logo.svg";
import { UserContext, CartContext } from "../Context";
import { useContext } from "react";

function Header() {
  const userContext = useContext(UserContext)
  const {cartData, setCartData} = useContext(CartContext)
  if(cartData == null){
    var cartItems = 0;
  }else{
    cartItems = cartData.length;
  }
  
  return (
    <div className="Container">
      <Navbar expand="lg" className="custom-navbar">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img src={logo} alt="Shoppy Logo" width="120" height="40" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/categories">Categories</Nav.Link>
              <Nav.Link as={Link} to="/checkout">My Cart({cartItems})</Nav.Link>
              <Nav.Link as={Link} to="/checkout">New Orders(1)</Nav.Link>
              <NavDropdown title="My Account" id="basic-nav-dropdown">
                {!userContext &&
                <>
                <NavDropdown.Item as={Link} to="/customer/register">Register</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/customer/login">Login</NavDropdown.Item>
                </>
                }
                {userContext && 
                <>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/customer/dashboard">Dashboard</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/customer/logout">Logout</NavDropdown.Item>
                </>
                }
              </NavDropdown>
              <NavDropdown title="Vendor Panel" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/seller/register">Register</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/seller/login">Login</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/seller/dashboard">Dashboard</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/seller/login">Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
