import { useState } from 'react'
import './messenger.scss'
import { io } from "socket.io-client";
import { baseUrl } from '../../constant';
import { IoMdSend } from "react-icons/io";
import { TbLogout } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import Loading from '../../component/loading/loading';
import Users from '../../component/users';
import { SocketHookPriestMessage } from '../../utils/socketHook';
import Messages from '../../component/messages';

interface usersData {
  id: string;
  name: string;
  images: string;
}

export default function Messenger() {
  const navigate = useNavigate();
  const [usersData, setusersData] = useState<usersData[]>([]);
  const [currentUser, setCurrentUser] = useState<Partial<usersData> | undefined>({});
  const [receiverId, setActiveUserId] = useState<string>('')
  const [message, setMessageValue] = useState("")
  const [refreshMessages, setRefreshMessages] = useState(true)

  SocketHookPriestMessage(() => setRefreshMessages(prevRefresh => !prevRefresh))  

  const logOut = async () => {
    localStorage.clear()
    navigate("/login")
  };

  function sendMessage(e: any) {
    e.preventDefault();
    if (message.trim() === '') {
        alert('Please write a message');
        return;
    }
    if (receiverId.trim() === '') {
        alert('Please choose a user to send the message');
        return;
    }
    
    fetch(`${baseUrl}/messages/message`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ message, senderId: currentUser?.id, receiverId })
    })
    .then((response) => {
        if (response.ok) {
          const socket = io(`${baseUrl}`)
          socket.emit("send-message",{userId:receiverId,success:true});
          setMessageValue("");
          setRefreshMessages(!refreshMessages);
        } else {
          throw new Error('Failed to send data');
        }
    })
    .catch(error => {
        console.error('Error sending message:', error);
        alert('Failed to send message. Please try again.');
    });
  }





  if(currentUser === undefined)logOut();
  if(!currentUser) return (<Loading/>)
  return (
    <div className='messenger'>
      <h1 className='UserMessaegTitle'>User Messages</h1>
      <Users 
        usersConfig={{usersData,setusersData}}
        currentUserConfig={{currentUser,setCurrentUser}}
        receiverConfig={{receiverId,setActiveUserId}}
      />

      <Messages  
        messagesAllData={{currentUser,refreshMessages,receiverId,usersData,setRefreshMessages}}
      />

      <form className='inputMessaeg' onSubmit={sendMessage}>
        <input placeholder='Write Message' className={"message"} value={message} onChange={(e) => setMessageValue(e.target.value)}/>
        <button type='submit' className={"sendMessage"} ><IoMdSend /></button>
      </form>

      <button className='logout' onClick={logOut}>
        <TbLogout />
        <span>Logout</span>
      </button>
    </div>
  )
}