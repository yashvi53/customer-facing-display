import React from 'react'
import "./PosBill.css"
import Container from "react-bootstrap/Container";
import { Button } from 'react-bootstrap';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


function Footer({itemstotal,totalqty,finaltotal}) {
    
 
  return (
    <div className="bill-footer">
              <Container fluid className="amount-bill">
                <Row>
                  <Col>
                    <p>Subtotal: <span>&#8377;{itemstotal}</span></p>
                   
                  </Col>
                  <Col>
                    <p>Tax: <span>&#8377;190</span></p>
                  </Col>
                  <Col>
                    <p>Flat-Discount: <span>&#8377;100</span></p>
                  </Col>
                 
                  <Col >
                    <p className="round-off justify-content-center">Round off: <span>00</span></p>
                  </Col>
                </Row>
              </Container>
              <Container fluid>
                <Row>
                  <hr className="footer-dotted-line"/>
                </Row>
              </Container>
            
              <Container fluid>
                <Row className="justify-content-md-center">
                    <Col >
                    <div className="quantity-div"  >
                        <p className='qty-count'>Qty: <span >{totalqty}</span></p>
                    </div>
                    </Col>
                    <Col >
                    <p >Add Charges: <span>&#8377; 00</span> </p>
                  </Col>
                    <Col >
                    <p >Bill Discount:  <span>&#8377; 15</span> </p>
                  </Col>
                    <Col >
                    <div className="total-input" >
                        <p>Total: <span>&#8377;{finaltotal}</span></p>  
                        {/*  */}
                    </div>
                    </Col>

                </Row>
              </Container>
            </div>
  )
}

export default Footer
