import { useState } from 'react'

import './LoginPopup.css'
import { assets } from '../../assets/assets';
import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import axios from 'axios'

const LoginPopup = ({setShowLogin}) => {
  const {url,setToken} = useContext(StoreContext);

    const [currState,setCurrState] = useState("Login");
    const [data,setData] = useState({
      name:"",
      email:"",
      password:""
    })
    
    const onChangeHandler = (event) =>{
      const name = event.target.name
      const value = event.target.value
      setData(data=>({...data,[name]:value}))
      console.log("entering")
    }
    
    
    const onLogin = async (event) => {
      event.preventDefault();
      console.log("started");
      let newUrl = url;
      if (currState === "Login") {
        newUrl += "/api/user/login";
        console.log(newUrl);
      } else {
        newUrl += "/api/user/register";
        console.log(newUrl);
      }
      try {
        const response = await axios.post(newUrl, data);
        console.log("Request body:", data);
        console.log("Response:", response);
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          console.log("Token set:", response.data.token);
          setShowLogin(false);
        } else {
          console.error("Error:", response.data.message);
          alert(response.data.message);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      }
    };
    
  return (
    <div className='login-popup'>
      <form  onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
        <h2>{currState}</h2>
        <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
            {currState==="Login"?<></>:<input onChange={onChangeHandler} value={data.name} name="name" type="text" placeholder='your name' required/>}
            
            <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder='your email' required/>
            <input name="password" onChange={onChangeHandler} value={data.password} type="password" placeholder='password' required />
        </div>
        <button type="submit">{currState==="Sign Up"?"Create account":"Login"}</button>
        <div className="login-popup-condition">
            <input type='checkbox' required/>
            <p>By continuing, i agree to terms of use & privacy policy.</p>
        </div>
        {currState==="Login"?<p>Create a new account?
             <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>:
        <p>Already have an account? 
            <span onClick={()=>setCurrState("Login")}>Login here</span></p>
        } 
      </form>
    </div>
  )
}

export default LoginPopup
