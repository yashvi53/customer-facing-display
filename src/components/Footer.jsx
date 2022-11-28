import React from 'react'
import "./PosBill.css"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


function Footer({itemstotal}) {
    


  return (
    <div className="bill-footer">
              <Container className="amount-bill">
                <Row>
                  <Col>
                    <p>Subtotal: <span>&#8377;{itemstotal}</span></p>
                  </Col>
                  <Col>
                    <p>Tax: <span>&#8377;190</span></p>
                  </Col>
                  <Col>
                    <p>Discount: <span>&#8377;100</span></p>
                  </Col>
                </Row>
              </Container>
              <Container>
                <Row>
                  <Col>
                    <p >Bill Discount:  <span>&#8377; 15</span> </p>
                  </Col>
                  <Col>
                    <p className="round-off">Round off: <span>00</span></p>
                  </Col>
                </Row>
              </Container>
              <hr className="footer-dotted-line"/>
              <Container>
                <Row>
                    <Col sm={8}>
                    <div className="quantity-div">
                        <p>Qty: <span>15</span></p>
                    </div>
                    </Col>
                  
                    <Col>
                    <div className="total-input">
                        <p>Total: <span>&#8377; 1510</span> </p>
                    </div>
                    </Col>
                </Row>
              </Container>
            </div>
  )
}

export default Footer
