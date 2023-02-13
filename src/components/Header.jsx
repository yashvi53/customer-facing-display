import React from 'react'
import "./PosBill.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Button } from 'react-bootstrap';

function Header({username,room}) {
    const current = new Date();
    const date = `${current.getDate()}/${
      current.getMonth() + 1
    }/${current.getFullYear()}`;

    const cfdbtn = {
    background: "black",
    padding:" 5px 24px",
    display: 'flex',
    position: "absolute",
    right: "115px",
    color:"white",
    textDecoration:"none",
    borderRadius:"6px"

    }
  return (
    <div className="bill-header">
    <Navbar>
      <Container>
        <Navbar.Brand>
          <div className="profile-header" >
            <img className="profile-icon" src="images/profile-img.png" alt="" />&nbsp;&nbsp;
            <span>{username}</span>
          </div>
          
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-center">
        <div className="profile-header" >
            <span>RoomId: {room}</span>
          </div>
          </Navbar.Collapse>
        
        <Navbar.Collapse className="justify-content-end">
       
          <Navbar.Text>
          
            <h6 className="date-text"><span>{date}</span></h6>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </div>
  )
}

export default Header