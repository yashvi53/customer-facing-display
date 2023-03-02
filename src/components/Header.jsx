import React from 'react';
import './PosBill.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import {FiPhoneCall} from 'react-icons/fi'

function Header({ username, room }) {
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

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
}

export default Header;
