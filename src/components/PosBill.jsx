import React, { useState, useEffect } from "react";
import "./PosBill.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import { Table,Card } from "react-bootstrap";
import { qrcode } from "../utils/Constant";
import Header from "./Header";
import Footer from "./Footer";


function PosBill({ socket, username, room}) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [product, setProduct] = useState([]);
  const [value, setValue] = useState("");
 const [show,setShow]=useState(false);


  const  fetchData = async() => {
    return await fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setProduct(json);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sendData = (type) => {
    console.log("working");
    // fetchData();
    console.log("products: " + product);
    console.log("currentMessage :: " + currentMessage);

    let showQr = false;
    let image = "images/logo-new.png";
    let productArray = [];
    if (type == 'product') {
      const filterdArray = product.filter((item) => {
        return item.title === value;
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
          filteredObj = { ...filteredObj, qty: item.qty + 1 };
        }
      
      });
     

      let filterdArrayFroomMessageList = messageList.filter((item) => {
        return item.id !== filteredObj.id;
      });
      filterdArrayFroomMessageList.push(filteredObj);

      setMessageList(filterdArrayFroomMessageList);
      console.log("send_data new", filterdArrayFroomMessageList);


      productArray = filterdArrayFroomMessageList;
      showQr = false;
      image = "images/logo-new.png";

    }else{
      productArray=messageList;
      showQr = true;
      image = {qrcode};
      console.log("qrimage",image);
    }
   
   
    let obj={
      
      "filterdArrayFroomMessageList":(productArray) ,
      "show":showQr,
      img:image
      
    }
    console.log("yashvi image",obj.img);
    socket.emit("send_data", {obj, room });
    console.log("messagelist on send data", messageList);
    console.log("tabledata working");
   
  };


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
  const handleSubmit=()=>{
    setValue('');
 document.querySelector('input').defaultValue = '';

  }
 
  
  // useEffect(() => {
  //   socket.on("receive_message", (data) => {
  //     console.log("vvvvvvv",data.filterdArrayFroomMessageList)
  //     setMessageList(data.obj.filterdArrayFroomMessageList);
     
  //   });
  //       //   socket.on('receive_image', image => {
  //       //     // create image with
            
  //       // setShow(image.img);
  //       // console.log("mmm",image.img)
  //       //     // Insert it into the DOM
  //       // });
  // }, [socket]);

  return (
    <Container fluid>
      <Row>
        <Col className="bill-left-side " xs={12} md={8}>
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
                      <td style={{fontWeight:600}}><span className="items-id">{index+1}</span>
                      </td>
                      <td>{productObj.title}</td>
                      <td style={{textAlign:"left"}}>&#8377;{parseInt(productObj.price)}</td>
                      <td style={{textAlign:"left"}}>{productObj.qty}</td>
                      <td style={{textAlign:"left"}}>&#8377;{parseInt(productObj.price) * productObj.qty}</td>
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

        <Col className="bill-right-side " xs={6} md={4}>
        
            
          <div className="add-products">
            <div className="dropdown">
              {product
                .filter((productObj) => {
                  const searchTerm = value.toLowerCase();
                  const Title = productObj.title.toLowerCase();

                  return (
                    searchTerm &&
                    Title.startsWith(searchTerm) &&
                    Title !== searchTerm
                  );
                })
                .map((productObj, index) => (
                  <div
                    onClick={() => onSearch(productObj.title)}
                    className="dropdown-row"
                  >
                    {productObj.id}
                    {productObj.title}
                    {productObj.price}
                  </div>
                ))}
            </div>

            <input
              type="text"
              placeholder="Search Products"
              required
              className="product-input"
              onChange={(event) => {
                setCurrentMessage(event.target.value);
                setValue(event.target.value);
              }}
              value={value}
              //onChange={(e)=>setQuery(e.target.value)}
            />
            <button
              onClick={() => {

                sendData('product');
                onSearch(value);
                handleSubmit();
               

              }}
            >
              Add Products
            </button>
          </div>
          
   
          <h6>Powered By</h6>
          <div className="vasy-img">
            <img src="images/logo-new.png" alt="logo" />
          </div>
         
          {/* <div className="qr-card-img">
          <Card style={{ width: "18rem" }}>
          <Card.Body>
           <Card.Title>Scan Here To Pay</Card.Title>
          
               <Card.Img variant="top"  src="images/qr-code.png"  alt="qrcode" />
               
            </Card.Body>
            
          </Card>
          </div>  */}
         
          <div className="qr-btn">
            <Button variant="secondary"
            onClick={()=>{
              setShow(true);
              sendData("qrcode");
            }}
            >Generate QrCode</Button>
          </div>      
        </Col>
      </Row>
    </Container>
  );
}

export default PosBill;
