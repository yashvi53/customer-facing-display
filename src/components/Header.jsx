<<<<<<< HEAD
import React from 'react';
import './PosBill.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import {FiPhoneCall} from 'react-icons/fi'

function Header({ username, room }) {
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

=======
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
>>>>>>> 85f19087d1afb0dd50bcee0c0c0898bffaa4fedf
  return (
    <Container fluid className="bill-header">
      <Navbar className="d-flex w-100">
        <Container fluid className="justify-content-between">
          <div className="profile-header">
            <img className="profile-icon" src="images/profileicon.png" alt="" />&nbsp;&nbsp;
            <span>Yashvi Soni</span>
          </div>

          <div className="profile-header d-flex">
            <span><FiPhoneCall style={{fontSize:"20px"}}/> :9899235480</span>
          </div>
<<<<<<< HEAD
          <div className="profile-header d-flex">
            <span>Loyalty Points: 5000</span>
          </div>
          <div className="profile-header d-flex">
            <span>Membership-type: platinium Membership</span>
          </div>

          <div className="profile-header d-flex">
            <span>Membership-points: 6400</span>
          </div>
          <div className="profile-header d-flex">
            <span>{date}</span>&nbsp;&nbsp;
            <span>05:07 PM</span>
          </div>
        </Container>
      </Navbar>
    </Container>
  );
=======
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
>>>>>>> 85f19087d1afb0dd50bcee0c0c0898bffaa4fedf
}

export default Header;
