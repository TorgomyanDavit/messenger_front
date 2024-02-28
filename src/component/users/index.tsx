import { useEffect, useState } from 'react'
import { baseUrl } from '../../constant';
import { GetToken } from '../../utils/getToken';
import ConfirmOPopUp from '../confirmPopUp';
import { MdDelete } from "react-icons/md";


interface usersData {
  id: string;
  name: string;
  images: string;
}

interface UsersProps {
  usersConfig: {
    usersData: usersData[];
    setusersData: React.Dispatch<React.SetStateAction<usersData[]>>;
  };
  currentUserConfig: {
    currentUser: Partial<usersData> | undefined;
    setCurrentUser: React.Dispatch<React.SetStateAction<Partial<usersData> | undefined>>;
  };
  receiverConfig: {
    receiverId: string; 
    setActiveUserId: (id: string) => void;
  };
}


// Define the User component
export default function Users({usersConfig,currentUserConfig,receiverConfig}:UsersProps) {
  const {usersData, setusersData} = usersConfig
  const {currentUser,setCurrentUser} = currentUserConfig
  const {receiverId,setActiveUserId} = receiverConfig

  const [refresh, setRefresh] = useState(true)
  const [confirmKey, setConfirmKey] = useState("")

  useEffect(() => {
    if(usersData?.length) {
      const user = usersData?.find((val:usersData) => val.id === GetToken())
      setCurrentUser(user)
    } 
  }, [usersData]);

  useEffect(() => {
    const fetchusersData = async () => {
      try {
        const response = await fetch(`${baseUrl}/users`);
        const jsonResp = await response.json();
        setusersData(jsonResp?.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchusersData();
  }, [refresh]);

  const deleteUser = async (userId:string) => {
    try {
      const response = await fetch(`${baseUrl}/users/delete?userId=${userId}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
      });
      if (response.ok) { 
        setConfirmKey("")
        setRefresh(!refresh)
      } 
    } catch(error) {console.error(error)}
  };

  return (
      <div className='usersContainer'>
        <div className='user'>
            <img className='userImg currentUser' src={currentUser?.images}/>
            <p className='userName'>{currentUser?.name}</p>
        </div>
              
        <div className='users'> 
            {usersData?.filter((val:usersData) => val.id !== currentUser?.id).map(({id,name,images}:usersData,) => {
                return (
                <div key={id} className={`user`} onClick={() => setActiveUserId(id)}>
                    <button className='deletUser' onClick={() => setConfirmKey(id)}> 
                        <MdDelete color='red'/>
                    </button>
                        {confirmKey && <ConfirmOPopUp confirmAction={deleteUser} Cancel={setConfirmKey} id={confirmKey}/>}
                        <img className={`userImg  ${receiverId === id ? 'activeUser' : ''} `} src={images}/>
                    <p className='userName'>{name}</p>
                </div>
                )
            })}
        </div>
    </div>
  );
}
