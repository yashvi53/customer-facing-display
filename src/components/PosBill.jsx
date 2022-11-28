import React from "react";
import "./PosBill.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Header from "./Header";
import BillTable from "./BillTable";
import Footer from "./Footer";


function posBill() {


  return (
    <Container>
      <Row>
        <Col className="bill-left-side">
          <div className="bill-profile-side">
            <Header/>
            <BillTable/>
         
            
          </div>
        </Col>
        <Col className="bill-right-side">
          <h6>Powered By</h6>
          <div className="logo-img">
            <img src="images/logo-new.png" alt="logo" />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default posBill;
