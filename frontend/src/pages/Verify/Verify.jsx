import { useSearchParams } from 'react-router-dom'
import './Verify.css'
import React, { useContext ,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from "axios";

export default function Verify() {
  const navigate=useNavigate();
    const [searchParams,setSearchParams]=useSearchParams();
    const success=searchParams.get("success");
    const orderId=searchParams.get("orderId");
    const {url}=useContext(StoreContext);

    const verifypay=async()=>{
      const res=await axios.post(url+"/api/order/verify",{success,orderId});
      if(res.data.success){
        navigate('/myorders');
      } 
      else{
        navigate('/');
      }  
     }
     useEffect(()=>{
      verifypay();
     },[]);
  return (
    <div className='verify'>
      <div className='spinner'>

      </div>
      
    </div>
  )
}
