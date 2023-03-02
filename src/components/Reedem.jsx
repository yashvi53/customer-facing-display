import React from 'react'

import { Card} from 'react-bootstrap'
import redeemcard from "../images/credit-card.png"
import logo from "../images/logo-new.png"

const Reedem = () => {
  return (
    <div>
     
  
    <Card className='text-center' style={{ width: '18rem',height:"20rem",backgroundColor:"#002847",color:"white" }}>
    
      <Card.Body>
      <Card.Img variant="top" src={redeemcard} style={{width:"5rem"}} />
        <Card.Title>Credit Reedem Succesfully</Card.Title>
        <Card.Text style={{margin:"12px 12px"}}>
        Credit No: <span> 123456789 </span>
        You have Reedem  <span>50$</span> of credit
        Your new Credit Balance is <span> 50$ </span>
        Thankyou for choosing to show with us!
        </Card.Text>
        
        <Card.Img variant="top" src={logo} style={{width:"8rem"}} />
      </Card.Body>
    </Card>

      
    </div>
  )
}

export default Reedem
