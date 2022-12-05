import React, { useState, useEffect } from "react";
import "./PosBill.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Table } from "react-bootstrap";
import axios from "axios";
import { Typeahead } from 'react-bootstrap-typeahead';
import Header from "./Header";
import Footer from "./Footer";

function PosBill({ socket, username, room }) {
  const [currentMessage,setCurrentMessage]=useState();
  const [messageList, setMessageList] = useState([]);
  const [messageRecived, setMessageRecived] = useState([]);
  const [product,setProduct]=useState([]);
  const [singleSelections, setSingleSelections] = useState([]);
  

  const sendData = () => {
    const tableData = [
      {
        srno: 1,
        items: "Wooden TooThBrush",
        Price: 450,
        Qty: 2,
        Total: 900,
        mrp: 500,
      },
      { srno: 2, items: "Colgate", Price: 50, Qty: 2, Total: 100, mrp: 500 },
      {
        srno: 3,
        items: "Amul Cool MilkShake",
        Price: 150,
        Qty: 1,
        Total: 150,
        mrp: 500,
      },
      {
        srno: 4,
        items: "Cadbury Silk",
        Price: 200,
        Qty: 3,
        Total: 600,
        mrp: 500,
      },
      {
        srno: 5,
        items: "Chocolate Cone",
        Price: 80,
        Qty: 2,
        Total: 160,
        mrp: 500,
      },
      { srno: 6, items: "Jim Jam", Price: 40, Qty: 2, Total: 80, mrp: 500 },
      {
        srno: 7,
        items: "Masala Kurkure",
        Price: 20,
        Qty: 6,
        Total: 120,
        mrp: 500,
      },
      {
        srno: 8,
        items: "Cadbury Celebrations",
        Price: 250,
        Qty: 2,
        Total: 500,
        mrp: 500,
      },
      { srno: 9, items: "Fizz", Price: 30, Qty: 4, Total: 120, mrp: 500 },
      { srno: 10, items: "Fizz", Price: 30, Qty: 4, Total: 120, mrp: 500 },
      { srno: 11, items: "Fizz", Price: 30, Qty: 4, Total: 120, mrp: 500 },
      { srno: 12, items: "Fizz", Price: 30, Qty: 4, Total: 120, mrp: 500 }
    ];

    console.log("currentMessage :: " + currentMessage);
    const filterdArray = tableData.filter( (product) => {
      return product.srno == currentMessage;
    });

    let filteredObj = null;
    if (filterdArray.length > 0) {
     // alert()
      filteredObj = filterdArray[0];
    }

    
console.log("send_data ",filteredObj);
    socket.emit("send_data", {filteredObj,room });

    setMessageRecived((list)=>[...list,filteredObj]);
    console.log("tabledata working");


  };

  let itemstotal=0;
  messageRecived.forEach(item => {
    itemstotal+=item.Total;
  })
console.log(itemstotal);

let totalqty=0;
messageRecived.forEach(item=>{
     totalqty+=item.Qty;
})
console.log(totalqty);


let finaltotal=0;
messageRecived.forEach(item=>{
  finaltotal=itemstotal+190-100;
})
console.log(finaltotal);

const fetchData=async ()=>{
 
  return await fetch("https://fakestoreapi.com/products?limit=7")
          .then(res=>res.json())
          .then(json=>setProduct(json))       
}



  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      // setMessageRecived(data.filteredObj);
      setMessageRecived((list)=>[...list,data.filteredObj]);
    });
    fetchData();
  }, [socket]);

  
  return (
    <Container>
      <Row>
        <Col className="bill-left-side">
          <div className="bill-profile-side">
            <Header />
            
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Items</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                </tr>
              </thead>
           
              <tbody className="bill-table-body">
            
                 {messageRecived.map((item) => {
                  return <tr>
                  <td>{item.srno}</td>
                  <td>{item.items}</td>
                  <td>{item.Price}</td>
                  <td>{item.Qty}</td>
                  <td>{item.Total}</td>    
                </tr>;
                })}

                
              
              {product && product.length > 0 && product.map((productObj, index) => (
          
             <tr>
                <td key={productObj.id}>{productObj.id}</td>
              <td>{productObj.title}</td>
              <td>{productObj.price}</td>
              </tr>
             
           
          ))}
          
   
              </tbody>
              
            </Table>
           
            <Footer  itemstotal={itemstotal} totalqty={totalqty} finaltotal={finaltotal}/>
          </div>
        </Col>
        <Col className="bill-right-side">
        <div className="add-products">
        <Typeahead
         id="basic-example"
         onChange={setSingleSelections}
         placeholder="Add a products..."
         selected={singleSelections}
        />
            {/* <input
              type="text"
              placeholder="Search Products"
         
                 required
                //  onChange={(event) => {
              //    setCurrentMessage(event.target.value);
                
              //   }}  
              //onChange={(e)=>setQuery(e.target.value)}
            /> */}
            <button
            onClick={() => {
              sendData();
              // filterById();
            }}>Add Products</button>
          </div>
          <h6>Powered By</h6>
          <div className="logo-img">
            <img src="images/logo-new.png" alt="logo" />
          </div>
         
        
        </Col>
      </Row>
      
    </Container>
  );
}

export default PosBill;
