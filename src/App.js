import React, { useState,useEffect } from 'react';
import PosBill from './components/PosBill';
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClientSideBill from './components/ClientSideBill';
import Peer from 'peerjs';

function App() {
 

  return (
    
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<ClientSideBill  />} />
              {/* <Route exact path="/cfd" element={< />}/> */}
            </Routes>
          </BrowserRouter>
        
  );
}

export default App;
