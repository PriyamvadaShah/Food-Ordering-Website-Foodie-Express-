import React, { useContext } from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
import { useState } from 'react';
import {Link, useNavigate }from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';


export default function Navbar({setshowLogin}) {
  const {setcartItems,getTotalCartAmount,token,setToken}=useContext(StoreContext);

const navigate=useNavigate();
  const logout=()=>{
    setToken("");
    navigate('/');
    setcartItems({});
  }
const displayorders=async()=>{
  navigate('/myorders');
}
  const [isActive,setIsActive]=useState("home");
  return (
    <>
    <div>
<div  className="nav">

<Link to='/' className="main-logo">Foodie Express</Link>

<div className="btw">



<Link to="" onClick={()=>setIsActive("home")} className={`common ${isActive==="home"?'active':''}`}>Home</Link>
<Link to="" onClick={()=>setIsActive("menu")} className={`common ${isActive==="menu"?'active':''}`}>Menu</Link>
<Link to="" onClick={()=>setIsActive("contactus")} className={`common ${isActive==="contactus"?'active':''}`}>Contact Us</Link>
</div>

<div className="last">
<img className='search' src={assets.search_icon} alt="/"/>

<div className="cartlogo "><Link to='/cart'>
  <img src={assets.basket_icon} alt='/'/></Link>

<div className={getTotalCartAmount()===0?"":"dot"}></div>
</div>
{
  !token?<button className="sign" onClick={()=>{setshowLogin(true)}}>Sign In</button>:
  <div className='navbar-profile'>
    <img src={assets.profile_icon}alt=""/>
    <ul className='nav-dropdown'>
      <li onClick={()=>{displayorders()}}> <img src={assets.bag_icon}alt=""/><p>Orders</p></li>
      <li onClick={()=>{logout()}}> <img src={assets.logout_icon}alt=""/><p>Logout</p></li>
    </ul>
    <hr/>

    </div>
}
</div>

</div>
    </div> </>
  )
}

