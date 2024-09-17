import React, { useContext, useEffect, useState } from 'react'
import './Myorders.css'
import { StoreContext } from '../../context/StoreContext';
import axios from "axios"

import { assets } from '../../assets/assets';


export default function Myorders() {
  const {url,token}=useContext(StoreContext);
  const [data,setData]=useState([]);

const fetchorders=async()=>{
  const res=await axios.post(url+"/api/order/userorders",{},{headers:{Authorization:`Bearer ${token}`}});
  console.log(res);
  setData(res.data.ord);
}

useEffect(()=>{
  if(token){
    fetchorders();
  }
},[token]);

  return (
    <div className='orders'>
     <h4>MY ORDERS</h4>
     <div className='display'>
      { data?(
        data.map((order,key)=>{
          return (<>
           <div className=''>
          
              <div key={key} className='my-order'>
                <div className='order-flex'>
                <img src={assets.parcel_icon} alt=""/>
                <p>
              {   order.items.map((item,ind)=>{
                if(ind===order.items.length-1){
                  return( item.name+" x "+item.quantity);
                }
                else{
                  return( item.name+" x "+item.quantity+" , ");
                }
                  })}
                </p></div>
                <p>${order.amount}.00</p>
                <p>Items:{order.items.length}</p>
                <p><span>&#x25cf;</span><b>{order.status}</b></p>
                <button onClick={()=>{fetchorders()}}>Track Order</button>
              </div>
            
           </div> 
           <hr/>
           </>
          )
        })
     ):<p>No orders found..</p>}
     </div>
      
    </div>
  )
}
