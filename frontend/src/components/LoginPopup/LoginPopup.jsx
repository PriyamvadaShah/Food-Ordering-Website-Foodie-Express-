import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import './LoginPopup.css'
import axios, { Axios } from "axios"
import React, { useContext, useState } from 'react'

export default function LoginPopup({ setshowLogin }) {
  const navigate=useNavigate();
  const [currstate, setCurrstate] = useState("SignUp");
  
  const {url,setToken}=useContext(StoreContext);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const OnChangehandler = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;
    setData(data => ({ ...data, [name]: value }));
  }
const onLogin=async(evt)=>{
  evt.preventDefault();
  let newUrl=url;
  if(currstate==='Login'){
    newUrl+='/api/user/login';
  }
  else{
    newUrl+='/api/user/register';
  }
  const response=await axios.post(newUrl,data);
  if(response.data.success){
    setToken(response.data.token);
    localStorage.setItem("token",response.data.token);
    setshowLogin(false);
  }
  else{
    alert(response.data.msg);
  }
}
const logout=()=>{
  localStorage.removeItem("token");
  setToken("");
  navigate('/');
}
 

  return (

    <div className='login-popup'>
      <form onSubmit={onLogin} className='login-container'>
        <div className='login-title'>
          <h2 className='login-head'>{currstate}</h2>
          <img className='cross-img' onClick={() => setshowLogin(false)} src={assets.cross_icon} alt='/' />

        </div>
        <div className='login-inputs'>
          {currstate === "SignUp" ?
            <input type="text" name='name' onChange={OnChangehandler} value={data.name} placeholder="Your name" required /> :
            <></>}

          <input type="email" name='email' onChange={OnChangehandler} value={data.email} placeholder="Your email" required />
          <input type="password" name='password' onChange={OnChangehandler} value={data.password} placeholder="Your password" required />

        </div>

        <button className='login-btn' type="submit">{currstate === 'Login' ? "Login" : "Create account"}</button>
        <div className='login-condition'>
          <input type='checkbox' required />
          <p className='condition'>By continuing ,I agree to the terms of use & privacy policy.</p>
        </div>

        {currstate === 'Login' ?
          <div className='condition'>Create a new account?<span className='login-last' onClick={() => { setCurrstate("SignUp") }}>Click here</span></div>

          : <div className='condition'>Already have an account?<span className='login-last' onClick={() => { setCurrstate("Login") }}>Click here</span></div>}
      </form>
    </div>
  )
}
