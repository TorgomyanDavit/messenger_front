import { useState } from 'react';
import "./login.scss";
import { baseUrl } from '../../constant';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [name, setName] = useState<string>(''); 
  const navigate = useNavigate();

  function sendData() {
    if (name.trim() === '') {
      alert('Please enter a name');
      return;
    }
  
    fetch(`${baseUrl}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Specify content type as JSON
      },
      body: JSON.stringify({ name: name }), // Stringify the data
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to send data');
      }
    })
    .then((user) => {
      if (user.success) {
        localStorage.setItem("token", user.token);
        navigate("/messenger");
      } else {
        alert('User does not exist. Please sign up.');
      }
    })
    .catch(() => {
      alert('Error sending data');
    });
  }
  

  return (
    <div className='login'>
      <h2 className='title'>Login</h2>
      <div className='inputMessaeg'>
        <p>Write your name to login</p>
        <input className="inputName" placeholder='Write name' value={name} onChange={(event) => setName(event.target.value)} />
        <div className='buttonMain'>
          <button className='loginButton' onClick={sendData}>Confirm</button>
          <button className='loginButton signin' onClick={() => navigate("/signin")}>Go to Sign in</button>
        </div>
      </div>
    </div>
  );
}
