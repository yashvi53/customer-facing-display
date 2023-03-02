import React from 'react'
import { Card} from 'react-bootstrap'
import cash from "../images/money.png";
import cards from "../images/credit-card (1).png"
import logo from "../images/logo-new.png"
const PaymentMethod = ({type}) => {
    console.log(type,"typeeee");
  return (
    <div>
      
    <Card className='text-center' style={{ width: '18rem',height:"20rem",backgroundColor:"#002847",color:"white" }}>
     
      {type==="cashbtncfd" ? (
        
      <Card.Body style={{marginTop:"45px"}}>
         <Card.Img variant="top" src={cash} style={{width:"5rem"}} />
        <Card.Text>
      Thankyou for shopping With us.
        </Card.Text>
        <Card.Img variant="top" src={logo} style={{width:"8rem"}} />
      </Card.Body>
      ):(
      <Card.Body>
           <Card.Img variant="top" src={cards} style={{width:"5rem"}} />
      <Card.Text>
      Thankyou for shopping With us.
      Just To coniform That Your Payment method was CARD.
      </Card.Text>
    
      <Card.Img variant="top" src={logo} style={{width:"8rem",marginTop:"20px"}} />
    </Card.Body>
      )}
      
    </Card>
    </div>
  )
}

export default PaymentMethod
