import { useEffect, useRef, useState } from 'react';
import { baseUrl } from '../../constant';
import { MdDelete } from "react-icons/md";
import moment from "moment";
interface User {
  id: string;
  name: string;
  images: string;
}

interface Message {
  id: string;
  message: string;
  senderId: string;
  receiverId: string;
  date:number
}

interface MessagesAllData {
  currentUser: Partial<User> | undefined;
  refreshMessages: boolean;
  receiverId: string;
  usersData: User[];
  setRefreshMessages: any;
}

interface MessagesProps {
  messagesAllData: MessagesAllData;
}

export default function Messages({ messagesAllData }: MessagesProps) {
  const [messageData, setMessageValueData] = useState<Message[]>([]);
  const { currentUser, refreshMessages, receiverId, usersData, setRefreshMessages } = messagesAllData;
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      (messagesContainerRef.current as HTMLDivElement).scrollTop = (messagesContainerRef.current as HTMLDivElement).scrollHeight;
    }
  }, [messageData]);
  
  useEffect(() => {
    const fetchMessageData = async () => {
      try {
        if (currentUser && receiverId) {
          const response = await fetch(`${baseUrl}/messages?userId=${currentUser?.id}&receiverId=${receiverId}`);
          const data = await response.json();
          setMessageValueData(data?.messages);
        }
      } catch (error) {
        console.error('Error fetching message data:', error);
      }
    };
    fetchMessageData();
  }, [currentUser, refreshMessages, receiverId]);

  const deleteMessages = async (messageId: string) => {
    try {
      const response = await fetch(`${baseUrl}/messages/message?messageId=${messageId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setRefreshMessages(!refreshMessages);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='messages' ref={messagesContainerRef}>
      {messageData?.map(({ id, message, senderId, receiverId,date }: Message) => {
        const isSender = currentUser?.id === senderId;
        const sender = usersData?.find(user => user.id === senderId);
        const receiver = usersData?.find(user => user.id === receiverId);
        const messageImage = sender || receiver;

        return (
          <div key={id} className={`message`} style={{ alignSelf: !isSender ? "flex-end" : "flex-start" }}>
            <img className='userImg' src={messageImage?.images} alt={`${messageImage?.name}'s profile`} />
            <div className='textContent'>
              <button className='editMessage' onClick={() => deleteMessages(id)}>
                <p className='date'>{moment(date).format('HH:mm:ss')}</p>
                <MdDelete color='red' />
              </button>
              <p className='userMessage'>{message}</p>
            </div>
          </div>
        )
      })}
    </div>
  );
}
