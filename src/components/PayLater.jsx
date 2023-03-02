import React from 'react'
import { Card} from 'react-bootstrap'
import cart from "../images/trolley.png"
import logo from "../images/logo-new.png"
const PayLater = () => {
  return (
    <div>
      
    <Card className='text-center ' style={{ width: '18rem',height:"20rem",backgroundColor:"#002847",color:"white" }}>
      
      <Card.Body style={{marginTop:"20px"}}>
      <Card.Img variant="top" src={cart}style={{width:"5rem"}} />
        <Card.Text>
       Terms: Within <span>days</span> an invoice will be sent to you shortly
        </Card.Text>
        <Card.Text>
       Due Date: <span>27/02/2023</span>
        </Card.Text>
        <Card.Img variant="top" src={logo} style={{width:"8rem"}} />
      </Card.Body>
    </Card>
    </div>
  )
}

export default PayLater
