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
<<<<<<< HEAD
              <Route exact path="/" element={<ClientSideBill  />} />
              {/* <Route exact path="/cfd" element={< />}/> */}
=======
              <Route exact path="/" element={<PosBill  />} />
              <Route exact path="/cfd" element={<ClientSideBill />}/>
>>>>>>> 85f19087d1afb0dd50bcee0c0c0898bffaa4fedf
            </Routes>
          </BrowserRouter>
        
  );
}

export default App;
