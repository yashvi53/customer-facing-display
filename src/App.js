import React,{useState} from 'react';
import PosBill from './components/PosBill'
import io from "socket.io-client";
import "./App.css"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import ClientSideBill from './components/ClientSideBill';
const socket=io.connect("http://216.48.180.161:3002");
// https://cfd-vasyerp.netlify.app:3002
function App() {
  const [username,setUsername] = useState("");
  const [room,setRoom]=useState("");
  const [showChat,setShowChat]=useState(false);

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
        <Route exact path="/" element={< PosBill socket={socket}  username={username} room={room} />}/>
        <Route exact path="/cfd" element={<ClientSideBill socket={socket}  username={username} room={room} />}/>
      </Routes>
      </BrowserRouter>
      
      )}
    </div>
  );
}

export default App;
