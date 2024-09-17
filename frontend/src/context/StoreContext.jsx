import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios"

export const StoreContext=createContext(null);

const StoreContextProvider=(props)=>{
 const [food_list,setFoodList]=useState([]);

    const [cartItems,setcartItems]=useState({});
    const[token,setToken]=useState('');

    const addToCart=async(itemId)=>{
        if(!cartItems[itemId]){
            setcartItems((prev)=>({...prev,[itemId]:1}))
        }
        else setcartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))

        if(token){
            await axios.post(url+"/api/cart/add",{itemId}, {headers: {
                'Authorization': `Bearer ${token}`
              }})
        }
    }

    const removeFromCart=async(itemId)=>{  
     setcartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));

     if(token){
        await axios.post(url+"/api/cart/remove",{itemId}, {headers: {
            'Authorization': `Bearer ${token}`
          }})
    }
    }
    const getTotalCartAmount=()=>{
     let totalAmount=0;
      for(const item in cartItems){
        if(cartItems[item]>0){
        let itemInfo=food_list.find((product)=>product._id===item);
        totalAmount+=itemInfo.price* cartItems[item];
      }}
      return totalAmount;
    }
    const url="http://localhost:8000";
    const contextValue={
      food_list,
      addToCart,
      removeFromCart,
      cartItems,
      setcartItems,
      getTotalCartAmount,
      url,
      token,setToken
    }

    const fetchFoodList=async()=>{
        const response=await axios.get(url+'/api/food/list');
        setFoodList(response.data.data);
    }
    const loadCartData=async(token)=>{
        const response=await axios.post(url+'/api/cart/get',{},{headers: {
            'Authorization': `Bearer ${token}`
          }});
          setcartItems(response.data.cartData);

    }
useEffect(()=>{
    async function loadData(){
        await fetchFoodList();
        if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"));
            await loadCartData(localStorage.getItem("token"));
           }
          
    }
 loadData();

 
},[]);
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider;