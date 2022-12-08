const express=require("express");
const app=express();
const http=require("http");
const {Server} = require("socket.io");
const cors=require("cors");

app.use(cors());

const server=http.createServer(app);

const io=new Server((server),{
    cors:{
        origin:"*",
        methods:["GET","POST"],
    },
});

io.on("connection",(socket)=>{
    console.log(`User Connected: ${socket.id}`);

    socket.on("disconnect",(socket)=>{
        console.log("User Disconnected",socket.id);

    })

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
      });

    //   socket.on("send_message",(data)=>{
    //     console.log("send_message",data);
    //       socket.to(data.room).emit("receive_message",data);
    //   })
      socket.on("send_data",(data)=>{
        console.log(data);
        // socket.broadcast.emit("receive_message",data);
        // socket.join("send_data",data);
          socket.to(data.room).emit("receive_message",data)        
      })
      console.log("work data");
})


server.listen(3002,()=>{
console.log("server is running");
})