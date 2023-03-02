import React from 'react'
import { Card } from 'react-bootstrap'
import logo from "../images/logo-new.png"
import coupon from "../images/gift-card.png"
const Coupon = () => {
  return (
    <div>
         <Card className='text-center' style={{ width: '18rem',height:"20rem",backgroundColor:"#002847",color:"white" }}>
       
       <Card.Body >
         <Card.Img variant='top' src={coupon}style={{width:"5rem"}}  />
         <Card.Text style={{marginTop:"12px",fontSize:"20px",fontWeight:"bold"}}>
          Coupon Applied yayy!!!!
         </Card.Text>
         <Card.Img variant="top" src={logo} style={{width:"8rem"}} />
       </Card.Body>
  
     </Card>
      
    </div>
  )
}

export default Coupon
