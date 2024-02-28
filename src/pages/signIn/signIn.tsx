import { useState, ChangeEvent } from 'react';
import "./signin.scss";
import { baseUrl } from '../../constant';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const [file, setFile] = useState<File | null>(null); // File state
  const [images, setImages] = useState<string | null>(null); // Image URL state
  const [name, setName] = useState<string>(''); // Name state
  const navigate = useNavigate();

  const setFormData = async (event: ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = event.target.files;

    if (files && files.length > 0) {
      const newFile = URL.createObjectURL(files[0]);
      setImages(newFile);
      setFile(files[0]);
    }
  };

  function sendData() {
    if (name.trim() === '') {
      alert('Please enter a name');
      return;
    }

    if (!file) {
      alert('Please select a image');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('photo', file);

    fetch(`${baseUrl}/users/signin`, {
      method: 'POST',
      body: formData,
    }).then((response) => response.json())
    .then((user) => {
      if(user.success) {
        setName('');
        setFile(null);
        setImages(null);
        localStorage.setItem("token",user.token)
        navigate("/messenger");
      } else {
        alert('Please write another name user already exist');
      }
    })
    .catch(() => {
      alert('Error sending data');
    });
  }

  return (
    <div className='signIn'>
      <h2 className='title'>Sign in</h2>
      <div className='inputMessaeg'>
        {images && <img className="image" src={images} alt="The image is missing" />}
        {!images &&<label className='label'>
          <input  className="file" type="file" onChange={(event) => setFormData(event)} />
        </label>}
        <input className="inputName" placeholder='writeName' value={name} onChange={(event) => setName(event.target.value)} />
        <div className='buttonMain'>
          <button className='signInButton' onClick={sendData}>Confirm</button>
          <button className='signInButton login' onClick={() => navigate("/login")}>Go to Log in</button>
        </div>
      </div>
    </div>
  );
}
