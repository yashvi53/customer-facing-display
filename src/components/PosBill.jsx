import React, { useState, useEffect } from "react";
import "./PosBill.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import { Table} from "react-bootstrap";
import { qrcode } from "../utils/Constant";
import { paylater } from "../utils/Paylater";
import {card} from "../utils/Card";
import {cash} from "../utils/Cash";
import { reedem } from "../utils/Reedem";
import Header from "./Header";
import Footer from "./Footer";
import Peer from "peerjs";

var lastPeerId = null;
var peer = null; // Own peer object
var peerId = null;
var conn = null;
var recvId = document.getElementById("receiver-id");
function PosBill({ socket, username, room, connection }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [product, setProduct] = useState([]);
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  const [showpl,setShowPl]=useState(false);
  const [showcard,setShowCard]=useState(false);
  const [showcash,setShowCash]=useState(false);
  const [showreedem,setShowReedem]=useState(false);
  const [peerIdValue, setPeerIdValue] = useState("");
  console.log(room, "RoomID");

  //here data will be fetch from api
  const fetchData = async () => {
    return await fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setProduct(json);
        localStorage.setItem("products", JSON.stringify(json));
      });
  };


 const sendData = (type) => {
  console.log("working");
  // fetchData();
  console.log("products: " + product);
  console.log("currentMessage :: " + currentMessage);
  console.log(type,"type")
  let showQr = false;
  let showLater=false;
  let showCardBox=false;
  let showCashBox=false;
  let showReedemPoints=false;
  let image = "images/logo-new.png";
  let productArray = [];
  if (type === "product") {
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
    showLater=false;
    showCardBox=false;
    showCashBox=false;
    showReedemPoints=false;
    image = "images/logo-new.png";
  } else if(type==="Qrcode") {
    productArray = messageList;
    showQr = true;
    showLater=false;
    showCardBox=false;
    showCashBox=false;
    showReedemPoints=false;
    image = { qrcode };
    console.log("qrimage", image);
  } else if(type==="Paylater"){
    productArray=messageList;
    showQr=false;
    showLater=true;
    showCardBox=false
    showCashBox=false;
    showReedemPoints=false;
    image={paylater};
    console.log("later image",image);
  }
  else if(type==="Card"){
    productArray=messageList;
    showQr=false;
    showLater=false;
    showCardBox=true;
    showCashBox=false;
    showReedemPoints=false;
    image={card};
    console.log("later image",image);
  }
  else if(type==="Cash"){
    productArray=messageList;
    showQr=false;
    showLater=false;
    showCardBox=false;
    showCashBox=true;
    showReedemPoints=false;
    image={cash};
    console.log("later image",image);
  }
  else if(type==="Reedem"){
    productArray=messageList;
    showQr=false;
    showLater=false;
    showCardBox=false;
    showCashBox=false;
    showReedemPoints=true;
    image={reedem};
    console.log("later image",image);
  }

//here all the properties pass through object
  let obj = {
    
    filterdArrayFroomMessageList: productArray,
    show: showQr,
    showpl:showLater,
    showcard:showCardBox,
    showcash:showCashBox,
    showreedem:showReedemPoints,
    img: image,
    type:type
  };
  console.log("yashvi image", obj.img);
  console.log("type",obj.type)
//here object will be send
 conn.send(obj);

  console.log("messagelist on send data", messageList);
  console.log("tabledata working");
};
  /**
   * Triggered once a connection has been achieved.
   * Defines callbacks to handle incoming data and connection events.
   */
  function ready() {
    conn.on("data", function (data) {
      console.log("soni Data recieved");
      var cueString = '<span class="cueMsg">Cue: </span>';
      // switch (data) {
      //   default:
        
      //     break;
      // }
    });
    conn.on("close", function () {
      // status.innerHTML = "Connection reset<br>Awaiting connection...";
      console.log("connection is closed");
      conn = null;
    });
  }

  function initialize() {
    // Create own peer object with connection to shared PeerJS server
    peer = new Peer(null, {
      debug: 2,
    });
    console.log(peer)

    peer.on("open", function (id) {
      // Workaround for peer.reconnect deleting previous id
      if (peer.id === null) {
        console.log("Received null id from peer open");
        peer.id = lastPeerId;
      } else {
        lastPeerId = peer.id;
      }
      setPeerIdValue(peer.id);
      console.log(recvId, peer.id);
      // recvId.value =peer.id
      console.log(recvId.value);
      console.log("ID: " + peer.id, "connection suc");
      // recvId.innerHTML = "ID: " + peer.id;
      // status.innerHTML = "Awaiting connection...";
    });
    peer.on("connection", function (c) {
      // Allow only a single connection
      if (conn && conn.open) {
        c.on("open", function () {
          c.send("Already connected to another client");
          setTimeout(function () {
            c.close();
          }, 500);
        });
        return;
      }

      conn = c;
      console.log("Connected to: " + conn.peer, "connection succesfull");
      alert("Connected to: " + conn.peer, "connection succesfull")
      // status.innerHTML = "Connected";
      ready();
    });
    peer.on("disconnected", function () {
      // status.innerHTML = "Connection lost. Please reconnect";
      console.log("Connection lost. Please reconnect");

      // Workaround for peer.reconnect deleting previous id
      peer.id = lastPeerId;
      peer._lastServerId = lastPeerId;
      peer.reconnect();
    });
    peer.on("close", function () {
      conn = null;
      // status.innerHTML = "Connection destroyed. Please refresh";
      console.log("Connection destroyed");
    });
    peer.on("error", function (err) {
      console.log(err);
      alert("" + err);
    });
  }

  useEffect(() => {
    fetchData();
    initialize();
  }, []);
const handleClearScreen=()=>{
  console.log("clearscreen button")
  sendData("clearScreen");
  setMessageList([])
}
 
//here total will be count
  let itemstotal = 0;
  messageList.forEach((item) => {
    itemstotal += parseInt(item.price * item.qty);
  });
  console.log(parseFloat(itemstotal.toFixed(2)));
//here total quantity will be count
  let totalqty = 0;
  messageList.forEach((item) => {
    totalqty += item.qty;
  });
  console.log(totalqty);
//here subtotal will be count
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
  const handleSubmit = () => {
    setValue("");
    document.querySelector("input").defaultValue = "";
  };
  const handleCopy=()=>{
    navigator.clipboard.writeText(peerIdValue);
  }


  return (
    <Container fluid className="p-0">
        <Header username={username} room={peerIdValue} />
      <Row>
        {/* here left side product details will be shoow */}
        <Col className="bill-left-side " xs={12} md={8}>
          <div className="bill-profile-side">
       
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
                {messageList.map((productObj, index) => {
                  return (
                    <tr>
                      <td style={{ fontWeight: 600 }}>
                        <span className="items-id">{index + 1}</span>
                      </td>
                      <td>{productObj.title}</td>
                      <td style={{ textAlign: "left" }}>
                        &#8377;{parseInt(productObj.price)}
                      </td>
                      <td style={{ textAlign: "left" }}>{productObj.qty}</td>
                      <td style={{ textAlign: "left" }}>
                        &#8377;{parseInt(productObj.price) * productObj.qty}
                      </td>
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
          <div className="connection-div">
          <input type="text" id="receiver-id" value={peerIdValue} />
          <button type="submit" onClick={initialize}>
            Referesh
          </button>
          {/* this is copy button */}
          <button onClick={handleCopy}>copy</button>
          {/* <CopyToClipboard text={peerIdValue} onCopy={()=>set}>

         
        </CopyToClipboard> */}
          </div>
          {/* here add prodcuts logis will be */}
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
            />
            <button
              onClick={() => {
                sendData("product");
                onSearch(value);
                handleSubmit();
             
              }}
            >
              Add Products
            </button>
          </div>

          {/* <h6>Powered By</h6> */}
          {/* <div className="vasy-img">
            <img src="images/logo-new.png" alt="logo" />
          </div> */}
          <div className="button-grid">
          <div className="cash-btn">
            <Button
              variant="secondary"
              onClick={() => {
              setShowCash(true);
              sendData("Cash")
                
              }}
            >
             Cash
            </Button>
          </div>
          <div className="card-btn">
            <Button
              variant="secondary"
              onClick={() => {
                setShowCard(true);
                sendData("Card")
              }}
            >
             Card
            </Button>
          </div>
          <div className="Reedem-btn">
            <Button
              variant="secondary"
              onClick={() => {
             setShowReedem(true);
             sendData("Reedem")
              }}
            >
           Reedem
            </Button>
          </div>
          <div className="Paylater-btn">
            <Button
              variant="secondary"
              onClick={() => {
               setShowPl(true)
               sendData("Paylater")
                
              }}
            >
         Paylater
            </Button>
          </div>
          <div className="qr-btn">
            <Button
              variant="secondary"
              onClick={() => {
                setShow(true);
                sendData("Qrcode");
              }}
            >
              Generate QrCode
            </Button>
          </div>
       
          <div className="clear-btn">
            <Button
              variant="secondary"
              onClick={() => {
                handleClearScreen();
              }}
            >
             Clear Screen
            </Button>
          </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default PosBill;
