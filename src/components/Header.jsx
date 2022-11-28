import React from 'react'
import "./PosBill.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

function Header() {
    const current = new Date();
    const date = `${current.getDate()}/${
      current.getMonth() + 1
    }/${current.getFullYear()}`;
  return (
    <div className="bill-header">
    <Navbar>
      <Container>
        <Navbar.Brand>
          <div className="profile-header" >
            <img className="profile-icon" src="images/profile-img.png" alt="" />&nbsp;&nbsp;
            <span>Ishika Anandani</span>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <h6 className="date-text">{date}</h6>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </div>
  )
}

export default Header