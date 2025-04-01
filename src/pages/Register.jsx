import React, { useState } from 'react';
import axios from "axios"
// import { useParams } from 'react-router-dom';

function Register() {
//   const { id } = useParams();
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:7001/register', { username, password });
      alert('Registration successful');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <p>User Name:</p>
          <input type="text" onChange={e => setUsername(e.target.value)}/>
          <p>Password:</p>
          <input type="password" onChange={e => setPassword(e.target.value)}/>
          <button>Save</button>
        </form>
    </>
  )
}

export default Register;