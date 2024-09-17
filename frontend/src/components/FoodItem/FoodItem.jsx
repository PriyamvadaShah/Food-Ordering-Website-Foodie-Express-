import React, { useState } from 'react'
import {assets} from'../../assets/assets'
import './FoodItem.css'
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';

export default function FoodItem({id,name,price,description,image}) {

  const{cartItems,addToCart,removeFromCart,url}=useContext(StoreContext);

  return (
    <div className='fooditem'>
      <div className='food-img'>
        <img className='itemimg'src={url+'/images/'+image} alt='/'/>
        {
          !cartItems[id]
          ?<img className='add' onClick={()=>{addToCart(id)}}
          src={assets.add_icon_white} alt='/'/>

          :<div className='food-item-counter'>
            <img onClick={()=>{removeFromCart(id)}} className='cnt'src={assets.remove_icon_red}alt='/'/>

            <p className='showcnt'>{cartItems[id]}</p>
            
            <img onClick={()=>{addToCart(id)}} className='cnt'src={assets.add_icon_green}alt='/'/>
            </div>
        }
      </div>
      <div className='food-item-info'>
        <div className='food-rating'>
        <p>{name}</p>
        <div><img src={assets.rating_starts} alt='/'/></div>
        </div>
        <p className='food-desc'>{description}</p>
        <p className='food-price'>${price}</p>
      </div>
    
    </div>
  )
}
