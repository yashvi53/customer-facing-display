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
              <Route exact path="/" element={<PosBill  />} />
              <Route exact path="/cfd" element={<ClientSideBill />}/>
            </Routes>
          </BrowserRouter>
        
  );
}

export default App;
