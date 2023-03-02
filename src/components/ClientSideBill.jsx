import React, { useState, useEffect } from "react";
import "./PosBill.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Table } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Header from "./Header";
import Peer from "peerjs";
import Reedem from "./Reedem";
import PaymentMethod from "./PaymentMethod";
import PayLater from "./PayLater";
import QrCode from "./QrCode";
import Coupon from "./Coupon";
import logo from "../images/logo-new.png";
import banner1 from "../images/banner1.png";
import banner2 from "../images/banner2.png"
import banner3 from "../images/banner3.png"
import {BsArrowRight} from "react-icons/bs"
import cfdicon from "../images/cfddsisplay.png"
import Footer from "./Footer";

function ClientSideBill({ socket, username, room, connection }) {
  const [messageList, setMessageList] = useState([]);
  const [product, setProduct] = useState([]);
  const [imgsrc, setImgSrc] = useState("");
  const [showQrCode, setShowQrCode] = useState(false);
  const [hideConnectionScreen, setHideConnectionScreen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [showBillScreen,setShowBillScreen]=useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  let conn = null;
  let peer = null;
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
  initialize();

  const images=[
    banner1,
    banner2,
    banner3
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex(currentIndex => (currentIndex + 1) % images.length);
    }, 2000);
    return () => clearTimeout(timer);
  }, [currentIndex, images.length])
  
  /**
   * Create the Peer object for our end of the connection.
   *
   * Sets up callbacks that handle any events related to our
   * peer object.
   */
  function initialize() {
    // Create own peer object with connection to shared PeerJS server
    peer = new Peer(null, {
      debug: 2,
    });

    peer.on("open", function (id) {
      // Workaround for peer.reconnect deleting previous id
      if (peer.id === null) {
        console.log("Received null id from peer open");
        peer.id = lastPeerId;
      } else {
        lastPeerId = peer.id;
      }

      console.log("ID: " + peer.id);
    });
    peer.on("connection", function (c) {
      // Disallow incoming connections
      c.on("open", function () {
        alert("not accepting");
        c.send("Sender does not accept incoming connections");
        setTimeout(function () {
          c.close();
        }, 500);
      });
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

  /**
   * Create the connection between the two Peers.
   *
   * Sets up callbacks that handle any events related to the
   * connection and data received on it.
   */
  function join() {
    // Close old connection
    // initialize()

    let printnewmsg = document.createElement("img");
    if (conn) {
      conn.close();
    }
    console.log(recvIdInput.value);
    console.log(peer);
    console.log(conn);
    // Create connection to destination peer specified in the input field
    conn = peer.connect(recvIdInput.value, {
      reliable: true,
    });
    console.log(conn);
    conn.on("open", function () {
      // status.innerHTML = "Connected to: " + conn.peer;
      console.log("Connected to: " + conn.peer);
      alert("connected to" + conn.peer);
      setIsConnected(true);
      conn.send("yashvi");
      // Check URL params for comamnds that should be sent immediately
      var command = getUrlParam("command");
      if (command) conn.send(command);
    });
    // Handle incoming data (messages only since this is the signal sender)
    //     conn.on("data", function (data) {
    //       console.log("dataaaaa", data.filterdArrayFroomMessageList);
    //       //  setMessageList(data.filterdArrayFroomMessageList)
    //       //  setImgSrc(data.img.qrcode);
    //       //     setShowQrCode(data.show);
    //       if (data.type === "product") {
    //         setMessageList(data.filterdArrayFroomMessageList);
    //       } else if (data.type === "Qrcode") {
    //         setImgSrc(data.img.qrcode);
    //         setShowQrCode(data.show)
    //       } else if (data.type === "Paylater") {
    //         setImgSrc(data.img.paylater);
    //         setShowQrCode(data.showpl)
    //       }else if(data.type==="Card"){
    //         setImgSrc(data.img.card);
    //         setShowQrCode(data.showcard)
    //       }else if(data.type==="Cash"){
    //         setImgSrc(data.img.cash)
    //         setShowQrCode(data.showcash)
    //       }else if(data.type==="Reedem"){
    //         setImgSrc(data.img.reedem)
    //         setShowQrCode(data.showreedem)
    //       } else if (data.type === "clearScreen"){
    //         setMessageList([])
    //       }
   
    //       console.log("data recieved", data);
    //     });
    conn.on("data", function (data) {
      console.log("Data recieved");
      console.log("data", data);
      const parse_data = JSON.parse(data);
      console.log("parsedata", parse_data);
      console.log("parseID", parse_data.type);
      
      switch (parse_data.type) {
        case "sendButton":
          console.log("productname", data);
          setMessageList((prevProducts) => [parse_data.data,...prevProducts]);
          setShowBillScreen(true);
          console.log(parse_data.data, "dataaaaaaaaa");
          break;

        case "cardbtncfd":
          console.log("image", data);
          console.log(PaymentMethod, "image");
          setShowBillScreen(true);
          setImgSrc(<PaymentMethod type={parse_data.type}/>);
          setTimeout(() => {
            setMessageList([]);
            setImgSrc();
          }, 5000); // clear the screen after 5 seconds
          if (parse_data.type === "sendButton") {
            setMessageList((prevProducts) => [parse_data.data, ...prevProducts]);
            setShowBillScreen(true);
          } else {
            setTimeout(() => {
              setShowBillScreen(false);
            }, 12000); // clear the screen after 5 seconds
         
          }
        

          break;
        case "cashbtncfd":
          console.log("image", data);
          setShowBillScreen(true);
          setImgSrc(<PaymentMethod type={parse_data.type}/>);
          setTimeout(() => {
            setMessageList([]);
            setImgSrc();
          }, 5000); // clear the screen after 5 seconds
          if (parse_data.type === "sendButton") {
            setMessageList((prevProducts) => [parse_data.data, ...prevProducts]);
            setShowBillScreen(true);
          } else {
            setTimeout(() => {
              setShowBillScreen(false);
            }, 12000); // clear the screen after 5 seconds
         
          }
          
        
          break;
        case "qrcodebtncfd":
          console.log("image",data);
          setShowBillScreen(true);
          setImgSrc(<QrCode/>);
          setTimeout(() => {
            setMessageList([]);
            setImgSrc();
          }, 5000); // clear the screen after 5 seconds
          if (parse_data.type === "sendButton") {
            setMessageList((prevProducts) => [parse_data.data, ...prevProducts]);
            setShowBillScreen(true);
          } else {
            setTimeout(() => {
              setShowBillScreen(false);
            }, 12000); // clear the screen after 5 seconds
         
          }
          
         
          break;  
        case "reedembtncfd":
          console.log("image", data);
          setShowBillScreen(true);
          setImgSrc(<Reedem/>);
          console.log("image", Reedem);
          setTimeout(() => {
            setMessageList([]);
            setImgSrc();
          }, 5000); // clear the screen after 5 seconds
          if (parse_data.type === "sendButton") {
            setMessageList((prevProducts) => [parse_data.data, ...prevProducts]);
            setShowBillScreen(true);
          } else {
            setTimeout(() => {
              setShowBillScreen(false);
            }, 12000); // clear the screen after 5 seconds
         
          }
          
          break;

        case "paylaterbtncfd":
          console.log("image", data);
          setShowBillScreen(true);
          setImgSrc(<PayLater/>);
          setTimeout(() => {
            setMessageList([]);
            setImgSrc();
          }, 5000); // clear the screen after 5 seconds
          if (parse_data.type === "sendButton") {
            setMessageList((prevProducts) => [parse_data.data, ...prevProducts]);
            setShowBillScreen(true);
          } else {
            setTimeout(() => {
              setShowBillScreen(false);
            }, 12000); // clear the screen after 5 seconds
         
          }
          
        
          break;
          case "couponbtncfd":
            console.log("image", data);
            setShowBillScreen(true);
            setImgSrc(<Coupon/>);
            setTimeout(() => {
              setMessageList([]);
              setImgSrc();
            }, 5000); // clear the screen after 5 seconds
            if (parse_data.type === "sendButton") {
              setMessageList((prevProducts) => [parse_data.data, ...prevProducts]);
              setShowBillScreen(true);
            } else {
              setTimeout(() => {
                setShowBillScreen(false);
              }, 12000); // clear the screen after 5 seconds
           
            }
            
            break;

        case "clear-screenbtn":
          setMessageList([]);
          setImgSrc();
          break;
        
        case "removeProduct":
            console.log("removeProduct", data);
            const actualProductList = messageList.filter((x) => x.id !== parse_data.product.id );
            setMessageList(actualProductList);
            console.log(parse_data.data, "dataaaaaaaaa");
            break;

        default:
          console.log("default");
          addMessage(data);
          break;
      }
    });
    conn.on("close", function () {
      // status.innerHTML = "Connection closed";
      alert("connection closed");
    });
  }

  /**
   * Get first "GET style" parameter from href.
   * This enables delivering an initial command upon page load.
   *
   * Would have been easier to use location.hash.
   */
  function getUrlParam(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results == null) return null;
    else return results[1];
  }

  useEffect(() => {
    fetchData();
  }, []);

  let itemstotal = 0;
  messageList.forEach((item) => {
    itemstotal += parseInt(item.product.price * item.product.qty);
  });
  console.log(parseFloat(itemstotal.toFixed(2)));

  let totalqty = 0;
  messageList.forEach((item) => {
    totalqty += item.product.qty;
  });
  console.log(totalqty);

  let finaltotal = 0;
  messageList.forEach((item) => {
    finaltotal = itemstotal + 190 - 100;
  });
  console.log(finaltotal);

  function addMessage() {
    console.log("messages added");
  }
  console.log(messageList, "listtttttttttt");

  const showMainScreenFnc = () => {
    setHideConnectionScreen(true);
  };

  return (
    <>
      {hideConnectionScreen && isConnected  ? (
        <>
        {!showBillScreen ? (
        <Container fluid style={{width:"100vw",height:"100vh",backgroundColor:"gray"}}>
          {images.map((image, index) => (
            <img src={images[currentIndex]} alt="" key={index} style={{width:"100%",height:"100%"}} />
           ))}
        </Container>
          
        ):(
          <Container fluid className="p-0">
            <Header username={username} />
            <Row>
              <Col className="bill-left-side" xs={12} md={8}>
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
                      {messageList.map((product, index) => (
                        <tr key={product.id}>
                          <td>
                            <span className="items-id">{index + 1}</span>
                          </td>
                          <td>{product.product.title}</td>
                          <td>&#8377;{parseInt(product.product.price)}</td>
                          <td>{product.product.qty}</td>
                          <td>
                            &#8377;
                            {parseInt(product.product.price) *
                              product.product.qty}
                          </td>
                        </tr>
                      ))}
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
                <div className="vasy-img" hidden={showQrCode}>
                  <img src={logo} alt="logo" />
                </div>
       
          
                <div className="qr-card-img">
                {imgsrc}
                </div>
         
              </Col>
            </Row>
          </Container>
        )}
        </>
      ) : (
       <body className="connection-container">
        <div className="conatiner ">
          <div className="connection-header">
           
          <img src={logo} alt="" />
            <BsArrowRight
            style={{marginLeft:"24px",fontSize:"4rem"}}
            />
           <img src={cfdicon} alt="" style={{marginLeft: "26px",width: "69px"}} />
          
          </div>
          <div className="connection-content">
          <h3 >VasyERP Customer Facing Display</h3>
          <p>Login to VyaparERP and active the customer display</p>
          <p>Once activated,it will display an auto generated code pairing to be entered in box below.</p>
          </div>
       
          <div className="connection-div">
            <input type="text" id="receiver-id" />
            <button
              type="submit"
              onClick={() => {
                join();
                showMainScreenFnc();
              }}
            >
              Connect To Peer
            </button>
          </div>
        </div>
        </body>
      )}
    </>
  );
}

export default ClientSideBill;
