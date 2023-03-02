import React from 'react'
import { Card } from 'react-bootstrap'
import qrcode from '../images/qr-code.png'

const QrCode = () => {
  return (
    <div>
      <Card className='text-center' style={{ width: '18rem',height:"20rem",backgroundColor:"#002847",color:"white" }}>
       
     <Card.Body >
        <Card.Img variant="top" src={qrcode} style={{width:"15rem",backgroundColor:"white",padding:"10px"}} />
       <Card.Text style={{marginTop:"12px",fontSize:"20px"}}>
    Scan To Pay
       </Card.Text>
     
     </Card.Body>

   </Card>
    </div>
  )
}

export default QrCode
