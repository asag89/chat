
const express = require("express")
const app = express()
const http = require("http")
const cors = require("cors")
const {Server} = require("socket.io")

const PORT = 3001
app.use(cors())

const server = http.createServer(app)
const io = new Server(server, {
    cors:{
        origin:"http://localhost:3000",
        methods:["GET", "POST"]
    }
})

io.on("connection", (socket)=> {
    console.log(`Connected: ${socket.id}`)

    socket.on("join_room", (data)=> {
        socket.join(data)
        console.log(`Username: ${socket.id} Rooms: ${data}`)
    })
    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data)
        console.log(data)
    })
    socket.on("disconnect", () =>{
        console.log("Disconnected" , socket.id)
    })
})

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})