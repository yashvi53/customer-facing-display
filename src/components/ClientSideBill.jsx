import React, { useState, useEffect } from "react";
import "./PosBill.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Table } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Header from "./Header";
import Peer from "peerjs";

import Footer from "./Footer";




function ClientSideBill({ socket, username, room ,connection }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [product, setProduct] = useState([]);
  const [value, setValue] = useState("");
 const [imgsrc, setImgSrc] = useState("images/logo-new.png")
 const [showQrCode, setShowQrCode] = useState(false)
  let conn = null
  let peer = null
  let lastPeerId = null;
  var recvIdInput = document.getElementById("receiver-id");
  const fetchData = () => {
    return fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setProduct(json);
      

      });
  };
  initialize()
   /**
                 * Create the Peer object for our end of the connection.
                 *
                 * Sets up callbacks that handle any events related to our
                 * peer object.
                 */
   function initialize() {
    // Create own peer object with connection to shared PeerJS server
    peer = new Peer(null, {
        debug: 2
    });

    peer.on('open', function (id) {
        // Workaround for peer.reconnect deleting previous id
        if (peer.id === null) {
            console.log('Received null id from peer open');
            peer.id = lastPeerId;
        } else {
            lastPeerId = peer.id;
        }

        console.log('ID: ' + peer.id);
    });
    peer.on('connection', function (c) {
        // Disallow incoming connections
        c.on('open', function() {
            c.send("Sender does not accept incoming connections");
            setTimeout(function() { c.close(); }, 500);
        });
    });
    peer.on('disconnected', function () {
        // status.innerHTML = "Connection lost. Please reconnect";
        console.log('Connection lost. Please reconnect');

        // Workaround for peer.reconnect deleting previous id
        peer.id = lastPeerId;
        peer._lastServerId = lastPeerId;
        peer.reconnect();
    });
    peer.on('close', function() {
        conn = null;
        // status.innerHTML = "Connection destroyed. Please refresh";
        console.log('Connection destroyed');
    });
    peer.on('error', function (err) {
        console.log(err);
        alert('' + err);
    });
};

/**
 * Create the connection between the two Peers.
 *
 * Sets up callbacks that handle any events related to the
 * connection and data received on it.
 */
function join() {
    // Close old connection
    // initialize()
    if (conn) {
        conn.close();
    }
    console.log(recvIdInput.value)
    console.log(peer)
    console.log(conn)
    // Create connection to destination peer specified in the input field
    conn = peer.connect(recvIdInput.value, {
        reliable: true
    });
    console.log(conn)
    conn.on('open', function () {
        // status.innerHTML = "Connected to: " + conn.peer;
        console.log("Connected to: " + conn.peer);
        alert("connected to"+conn.peer)
        conn.send("yashvi");
        // Check URL params for comamnds that should be sent immediately
        var command = getUrlParam("command");
        if (command)
            conn.send(command);
    });
    // Handle incoming data (messages only since this is the signal sender)
    conn.on('data', function (data) {
     console.log("dataaaaa",data.filterdArrayFroomMessageList);
     setMessageList(data.filterdArrayFroomMessageList)
      setImgSrc(data.img.qrcode);
        setShowQrCode(data.show);
        console.log("data recieved",data)
    });
    conn.on('close', function () {
        // status.innerHTML = "Connection closed";
        console.log("connection closed")
    });
};

/**
 * Get first "GET style" parameter from href.
 * This enables delivering an initial command upon page load.
 *
 * Would have been easier to use location.hash.
 */
function getUrlParam(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results == null)
        return null;
    else
        return results[1];
};


  useEffect(() => {
    fetchData();
   
  }, []);
  

 

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

  // const onSearch = (searchTerm) => {
  //   setValue(searchTerm);
  //   // our api to fetch the search result
  //   console.log("search ", searchTerm);
  // };


function addMessage(){
  console.log("messages added")
}


  return (
    <Container fluid>
      <Row>
        <Col className="bill-left-side" xs={12} md={8}>
          <div className="bill-profile-side">
            <Header username={username}  />

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
        <div className="connection-div">
        <input type="text" id="receiver-id" />
                <button type="submit"  onClick={join}>Connect To Peer</button>
          </div>
              
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
