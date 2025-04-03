import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios"

function Login({setUsername, setUserId}) {
  const navigate = useNavigate()
    
  const [usernameText, setUsernameText] = useState("")
  const [passwordText, setPasswordText] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post('https://auth-server-production-90c7.up.railway.app/login', { username:usernameText, password:passwordText });
      // console.log(res)
      if(res.status == 200){
        const jwt = res.data.token

        localStorage.setItem("token", jwt)
        setUserId(res.data.userId)
        setUsername(usernameText)
        localStorage.setItem("userId", res.data.userId)
        localStorage.setItem("username", usernameText)

        alert("Logged in")

        setPasswordText("")
        setUsernameText("")

        navigate("/start")
      }

    } catch (err) {
      if(err.status == 401){
        alert("Wrong creditentals")
        setPasswordText("")
        setUsernameText("")
      }
      else
        console.log(err);
    }
  };

  return (
    <>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <p>User Name:</p>
          <input type="text" value={usernameText} onChange={e => setUsernameText(e.target.value)}/>
          <p>Password:</p>
          <input type="password" value={passwordText} onChange={e => setPasswordText(e.target.value)}/>
          <button>Save</button>
        </form>
    </>
  )
}

export default Login;