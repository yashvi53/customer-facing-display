import React from 'react'
import { Table } from "react-bootstrap";
import "./PosBill.css"
import Footer from './Footer';
import socket from 'socket.io-client';


function BillTable() {

const tableContent = [
  
    {srno:1,items:"Wooden TooThBrush",Price:450,Qty:2,Total:900,mrp:500},
    {srno:2,items:"Colgate",Price:50,Qty:2,Total:100,mrp:500},
    {srno:3,items:"Amul Cool MilkShake",Price:150,Qty:1,Total:150,mrp:500},
    {srno:4,items:"Cadbury Silk",Price:200,Qty:3,Total:600,mrp:500},
    {srno:5,items:"Chocolate Cone",Price:80,Qty:2,Total:160,mrp:500},
    {srno:6,items:"Jim Jam",Price:40,Qty:2,Total:80,mrp:500},
    {srno:7,items:"Masala Kurkure",Price:20,Qty:6,Total:120,mrp:500},
    {srno:8,items:"Cadbury Celebrations",Price:250,Qty:2,Total:500,mrp:500},
    {srno:9,items:"Fizz",Price:30,Qty:4,Total:120,mrp:500},
   
    {srno:12,items:"Fizz",Price:30,Qty:4,Total:120,mrp:500},
    {srno:13,items:"Fizz",Price:30,Qty:4,Total:120,mrp:500}
]

const renderTableContent=(table,index)=>{
    return(
      <tr key={index}>
        <td>{table.srno}<div className='items-no'></div></td>
        <td>{table.items
        
        } <p style={{marginBottom:0}}><del><small>&#8377;{table.mrp}</small></del>&nbsp;&nbsp;<span>&#8377;{table.Price}</span></p></td>
        <td>{table.Price}</td>
        <td>{table.Qty}</td>
        <td>{table.Total}</td>
      </tr>
    )
  }

  let itemstotal=0;
  tableContent.forEach(item => {
    itemstotal+=item.Total;
  })
console.log(itemstotal);

let totalqty=0;
tableContent.forEach(item=>{
     totalqty+=item.Qty;
})
console.log(totalqty);


let finaltotal=0;
tableContent.forEach(item=>{
  finaltotal=itemstotal+190-100;
})
console.log(finaltotal);

  return (
    <div className='main-table-div'>
    <div className="bill-table"  >    
    <Table >
      <thead>
        <tr>
          <th>#</th>
          <th>Items</th>
          <th>Price</th>
          <th>Qty</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody className='bill-table-body'>
      {tableContent.map(renderTableContent)}
      </tbody>
    </Table>
  </div>
  <Footer  itemstotal={itemstotal} totalqty={totalqty} finaltotal={finaltotal} />
  </div>
  )
}

export default BillTable