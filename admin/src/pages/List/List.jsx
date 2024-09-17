import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import './List.css'
import axios from "axios"


export default function List({url}) {


  const[list,setList]=useState([]);

  const fetchList=async()=>{
    try
   { const response=await axios.get(`${url}/api/food/list`);
    if(response.data.success){
      setList(response.data.data);
    }
    else{
      toast.error("Error");
    }}
    catch(err){
      console.log(err);
    }
  }
const removeFood=async(foodId)=>{
  const response=await axios.delete(`${url}/api/food/${foodId}`);
   await fetchList();
   if(response.data.success){
    toast.success(response.data.msg);
   }
   else {toast.error(response.data.msg);
}}

  useEffect(()=>{
    fetchList()
  },[]);

  return (
    <div className="list-items">
     <p className='list-heading'>All Food Items</p> 
     <div className='list-table'>
      <div className='list-table-format title'>
        <p>Image</p>
        <p>Name</p>
        <p>Category</p>
        <p>Price</p>
        <p>Action</p>
      </div>
      {list.map((item,index)=>{
        return (
        <div key={index} className='list-table-format'>
          <img src={`${url}/images/`+item.image} alt=""/>
          <p>{item.name}</p>
          <p>{item.category}</p>
          <p>${item.price}</p>
        
          <p onClick={()=>{removeFood(item._id)}}>X Remove</p>
          </div>
        )
      })}
     </div>
    </div>
  )
}
