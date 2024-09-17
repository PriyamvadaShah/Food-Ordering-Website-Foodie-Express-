import './Order.css'
import React from 'react'
import axios from "axios";
import {toast} from "react-toastify";
import { useEffect,useState } from 'react';
import {assets}from '../../assets/assets';

const url='http://localhost:8000';
function Order() {
  const [orders,setOrders]=useState([]);
  const fetchorders=async()=>{
    const response=await axios.get(url+'/api/order/allorders');

    if(response.data.success){
      setOrders(response.data.data);

    }
    else{
      toast.error("Error");
    }
  }

  const statusHandler=async(evt,orderId)=>{
    const response=await axios.post(url+"/api/order/status",{orderId,status:evt.target.value});
    if(response.data.success){
      fetchorders();
    }
    
  }

  useEffect(()=>{
   fetchorders(); 
  },[]);
  return (
    <div className='orders-display'>
      <h3>Orders Page</h3>
      <div className='order-items'>
        {
          orders.map((order,ind)=>(
            <>
            <div key={ind} className=''>
              <div className='main'>
              <img src={assets.parcel_icon} alt=""/>
              <p className='ordermap'>
                {
                  order.items.map((item,index)=>{
                    if(index===order.items.length-1){
                      return item.name+ " x "+item.quantity;
                    }
                    else {return item.name+ " x "+item.quantity+" , ";}
                  })
                }
               
              </p>
              </div>
              <p className='first-name'>{order.address.firstName+" "+order.address.lastName}</p>
              <p className='orderadd'>
                <div>{order.address.street+", "}</div>
                <div>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.pincode}</div>
              </p>
              <p className='orderphone'>{order.address.phone}</p>
              <p>Items:{order.items.length}</p>
              <p> ${order.amount}</p>
              <select onChange={(evt)=>statusHandler(evt,order._id)} value={order.status}>
                <option value="Food Processing">Food Processing  </option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered </option>
              </select>
              </div>
               <hr/>
              </>
          ))
        }
      </div>
      
    </div>
  )
}

export default Order
