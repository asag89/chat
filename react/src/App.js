
import { useState } from "react"
import Chat from "./Chat"
import io from "socket.io-client"

const socket = io.connect("http://localhost:3001")

function App() {

  const [user, setUser] = useState("")
  const [room, setRoom] = useState("")
  const [showChat, setShowChat] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (user !== "" && room !== "") {
      socket.emit("join_room", room)
      setShowChat(true)
    }
  }

  return (
    <div className="container">
      <div className="logo"><span>W</span></div>
      <h1>Wassup</h1>
      {!showChat ? (
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-container">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" className="input-login" onChange={(e) => setUser(e.target.value)} value={user} placeholder="Username..." />
          </div>
          <div className="input-container">
            <label htmlFor="room">Room</label>
            <input type="text" id="room" className="input-login" onChange={(e) => setRoom(e.target.value)} value={room} placeholder="Room..." />
          </div>
          <button className="btn-join" type="submit">Join Chat</button>
        </form>
      ) : (
        <Chat socket={socket} user={user} room={room} />
      )}
    </div>
  );
}
export default App;
