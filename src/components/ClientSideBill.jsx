import React, { useState, useEffect } from "react";
import "./PosBill.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Table } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Header from "./Header";
import Footer from "./Footer";
import { qrcode } from "../utils/Constant";



function ClientSideBill({ socket, username, room  }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [product, setProduct] = useState([]);
  const [value, setValue] = useState("");
 const [imgsrc, setImgSrc] = useState("images/logo-new.png")
 const [showQrCode, setShowQrCode] = useState(false)
 

  const fetchData = () => {
    return fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setProduct(json);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sendData = () => {
    console.log("working");
    // fetchData();
    console.log("products: " + product);
    console.log("currentMessage :: " + currentMessage);

    const filterdArray = product.filter((item) => {
      return item.id == value;
    });

    console.log("filterarray" + filterdArray);
    let filteredObj = null;

    if (filterdArray.length > 0) {
      filteredObj = filterdArray[0];
      filteredObj = { ...filteredObj, qty: 1 };
      console.log("filterobj", filteredObj);
    }

    messageList.forEach((item) => {
      if (item.id === filteredObj.id) {
        filteredObj = {
          ...filteredObj,
          qty: item.qty + 1,
          totalprice: item.qty * item.price,
        };
      } else {
        filteredObj = { ...filteredObj, qty: 1, totalprice: item.price };
      }
    });

    let filterdArrayFroomMessageList = messageList.filter((item) => {
      return item.id != filteredObj.id;
    });

    filterdArrayFroomMessageList.push(filteredObj);

    setMessageList(filterdArrayFroomMessageList);
    console.log("send_data new", filterdArrayFroomMessageList);
    socket.emit("send_data", { filterdArrayFroomMessageList, room });
    // socket.emit('qrcode', qrcode.toString('base64'));
    console.log("messagelist on send data", messageList);
    console.log("tabledata working");
  };
  

  // function getSelectedProduct() {
  //   console.log("Recovering data")
  //   var product = JSON.parse(localStorage.getItem("selectedProduct"));
  //   console.log(product)
  // }

  let itemstotal = 0;
  messageList.forEach((item) => {
    itemstotal += parseInt(item.price * item.qty);
  });
  console.log(parseFloat(itemstotal.toFixed(2)));

  let totalqty = 0;
  messageList.forEach((item) => {
    totalqty += item.qty;
  });
  console.log(totalqty);

  let finaltotal = 0;
  messageList.forEach((item) => {
    finaltotal = itemstotal + 190 - 100;
  });
  console.log(finaltotal);

  const onSearch = (searchTerm) => {
    setValue(searchTerm);
    // our api to fetch the search result
    console.log("search ", searchTerm);
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("yashvi",data);
      setMessageList(data.obj.filterdArrayFroomMessageList);
      setImgSrc(data.obj.img.qrcode);
       setShowQrCode(data.obj.show);
      console.log("IMAGEEEEE : ",imgsrc);
    });
  }, [socket]);


  return (
    <Container fluid>
      <Row>
        <Col className="bill-left-side" xs={12} md={8}>
          <div className="bill-profile-side">
            <Header username={username} room={room} />

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
                {messageList.map((productObj,index) => {
                  return (
                    <tr>
                      <td><span className="items-id">{index+1}</span></td>
                      <td>{productObj.title}</td>
                      <td>&#8377;{parseInt(productObj.price)}</td>
                      <td>{productObj.qty}</td>
                      <td>&#8377;{parseInt(productObj.price) * productObj.qty}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
          <Footer
              itemstotal={itemstotal}
              totalqty={totalqty}
              finaltotal={finaltotal}
            />
        </Col>
      
        <Col className="bill-right-side" xs={6} md={4}>

        <h6>Powered By</h6>

          <div className="vasy-img" hidden={((showQrCode) ? true : false)}>
            <img src="images/logo-new.png" alt="logo" />
          </div> 
       <div className="qr-card-img" hidden={((!showQrCode) ? true : false)} >
          <Card style={{ width: "20rem" }} >
          <Card.Body>
           <Card.Title  >Scan Here To Pay</Card.Title>
            
            <Card.Img variant="top" style={{width: "18rem"}}  src={imgsrc}  alt="qrcode" />
            
            </Card.Body>
            
          </Card>
          </div> 
          

          
          
        </Col>
      </Row>
    </Container>
  );
}

export default ClientSideBill;
