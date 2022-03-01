
import { useEffect, useState } from "react"
import { GoTriangleRight } from "react-icons/go"
import ScrollToBottom from "react-scroll-to-bottom"

const Chat = ({ socket, user, room }) => {

    const [message, setMessage] = useState("")
    const [messageList, setMessageList] = useState([])

    const time = new Date()

    const sendMessage = async (e) => {
        e.preventDefault()
        if (message !== "") {
            const data = {
                room: room,
                user: user,
                message: message,
                time: {
                    hours: time.getHours().toString(),
                    minutes: time.getMinutes().toString()
                }
            }
            await socket.emit("send_message", data)
            setMessageList((list) => [...list, data])
            setMessage("")
        }
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data])
        })
    }, [socket])

    return (
        <div className="chat-container">
            <div className="chat">
                <ScrollToBottom className="chat-scroll">
                    <div className="chat-item-container">
                        <h3 className="chat-title">Live Chat</h3>
                        {messageList.map((message, i) => (
                            <div key={i} className="chat-item" id={user === message.user ? "my" : "other"}>
                                <div className="chat-message">{message.message}</div><hr />
                                <div>
                                    <span className="chat-time">{message.time.hours}: {message.time.minutes.length < 2 ? `0${message.time.minutes}` : message.time.minutes}</span>
                                    <span className="chat-author">{message.user}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <form onSubmit={sendMessage} className="chat-form">
                        <input type="text" className="chat-input" value={message} onChange={(e) => setMessage(e.target.value)} />
                        <button type="submit" className="chat-btn"><GoTriangleRight /></button>
                    </form>
                </ScrollToBottom>
            </div>
        </div>
    )
}
export default Chat