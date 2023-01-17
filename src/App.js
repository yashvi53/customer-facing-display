import React,{useState} from 'react';
import PosBill from './components/PosBill'
import io from "socket.io-client";
import "./App.css"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import ClientSideBill from './components/ClientSideBill';
// const getSocket = () => {
//   openDB();
//   openDB.onsuccess = function () {
//       let db = openDB.result;
//       let tx = db.transaction("sockets", "readonly");
//       let store = tx.objectStore("sockets");
//       let socket = store.get(1);
//       socket.onsuccess = function () {
//           if (!socket.result) {
//               // Show an error message or redirect to an offline page
//               console.log("erooreereee");
//           } else {
//               return socket.result.socket;
//           }
//       }
//   };
// };
const socket = io.connect("http://localhost:3002") 
// const openDB = () => {
//   const openDB = indexedDB.open("socketDB", 1);
//   openDB.onupgradeneeded = function () {
//       let db = openDB.result;
//       let store = db.createObjectStore("sockets", { keyPath: "id" });
//   }
// }

// https://cfd-vasyerp.netlify.app:3002
//http://216.48.180.161:3002


function App() {
  const [username,setUsername] = useState("");
  const [room,setRoom]=useState("");
  const [showChat,setShowChat]=useState(false);
  // const [show, setShow] = useState(false)

 

  const joinRoom = () => {
   
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    
    }
  };
  

  
  return (
    <div className="App">
      {!showChat ? (
       <div className="joinChatContainer">
        <h3>Join A Chat</h3>
      <input type="text" placeholder="yashvi..."  onChange={(event) => {
              setUsername(event.target.value);
            }}
       />
      <input type="text" placeholder="room Id..." onChange={(event)=>{
        setRoom(event.target.value)}} />
      <button onClick={joinRoom}>Join Room</button>
      </div>
     ) : (
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={< PosBill socket={socket}    username={username} room={room} />}/>
        <Route exact path="/cfd" element={<ClientSideBill socket={socket}  username={username} room={room} />}/>
      </Routes>
      </BrowserRouter>
      
      )}
    </div>
  );
}

export default App;
