import React, { useContext, useEffect, useState } from 'react'
import './Placeorder.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Placeorder() {

const {getTotalCartAmount,token,food_list,cartItems,url}=useContext(StoreContext);

const navigate=useNavigate();
const [data,setData]=useState({
  firstName:"",
  lastName:"",
  email:"",
  street:"",
  city:"",
  state:"",
  pincode:"",
  country:"",
  mobile:"",
})

const onChangehandler=(evt)=>{
const name=evt.target.name;
const value=evt.target.value;
setData(data=>({...data,[name]:value}));
}

const placeorder=async(evt)=>{
evt.preventDefault();
let orderItems=[];
food_list.map((item)=>{
  if(cartItems[item._id]>0){
  let iteminfo=item;
  iteminfo["quantity"]=cartItems[item._id];
  orderItems.push(iteminfo);
}})

let orderData={
  address:data,
  items:orderItems,
  amount:getTotalCartAmount()+2,
}


let response=await axios.post(url+"/api/order/place",orderData,{headers:{Authorization: `Bearer ${token}`}});


  if(response.data.success){
    const {session_url}=response.data;
    window.location.replace(session_url);
  }
  else{
    alert("Error");
  }

}
useEffect(()=>{
  console.log(data);
},[data])

  return (
  <form onSubmit={placeorder} className='place-order'>
    <div className='place-order-main'>
    <div className='place-order-left'>
    <h3> Delivery Information</h3>  
  
    <div className='place-same'>
      <input required name="firstName" onChange={onChangehandler} value={data.firstName} type="text" placeholder='First Name'/>
      <input  required name="lastName" onChange={onChangehandler} value={data.lastName} type="text" placeholder='Last Name'/>
    </div>
    <input  required name="email" onChange={onChangehandler} value={data.email} className='place-long' type="email" placeholder='Email Address'/>
    <br/>
    <input  required name="street" onChange={onChangehandler} value={data.street} className='place-long' type="text" placeholder='Street'/>
    <div className='place-same'>
      <input  required name="city" onChange={onChangehandler} value={data.city}type="text" placeholder='City'/>
      <input required  name="state" onChange={onChangehandler} value={data.state} placeholder='State'/>
    </div>
    <div className='place-same'>
      <input required  name="pincode" onChange={onChangehandler} value={data.pincode} type="text" placeholder='Pin Code'/>
      <input required  name="country" onChange={onChangehandler} value={data.country} type="text" placeholder='Country'/>
    </div>
    <input  required name="mobile" onChange={onChangehandler} value={data.mobile} className='place-long' type="mobile" placeholder='Mobile No.'/>

    </div>
    <div className='place-order-right'>
      <h2 >Cart Totals</h2>
    <div className='cart-bottom'>
   
   <div className='subtotal'>
     <p>Subtotal</p>
     <p>${getTotalCartAmount()}</p>
   </div>
   <hr/>

   <div className='subtotal'>
     <p>Delivery Fee</p>
     <p>${getTotalCartAmount()===0?0:5}</p>
   </div>
   <hr/>
<div className='subtotal'>
     <p>Total</p>
     <p>${getTotalCartAmount()===0?0:getTotalCartAmount()+5}</p>
   </div>
   {/* onClick={()=>navigate('/order')}*/}
   <button type="submit" className='checkout'>PROCEED TO PAYMENT</button>
   </div>
   </div>
    </div> 
     </form>
  )
}
