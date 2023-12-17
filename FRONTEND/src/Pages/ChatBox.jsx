import React, { useState } from 'react'
import ChatsideBar from '../Components/ChatsideBar'
import ChatShowArea from '../Components/ChatShowArea'
import Header from '../Components/Header'



const ChatBox = () => {
  // const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <>
    <Header/>
    <div className='sm:mb-20 sm:mt-10 sm:mx-20 flex m-5 gap-2 sm:gap-6'>
      <ChatsideBar />
      <ChatShowArea/>
    </div>
    </>
  )
}

export default ChatBox