import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

export default function Cart() {

  const {cartItems,food_list,removeFromCart,getTotalCartAmount,url}=useContext(StoreContext);
const navigate=useNavigate();
  return (
    <div className='cart'>
      <div className='cart-items'>
        <div className='cart-items-title'>
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
         

        </div>
        <hr/>
        {
          food_list.map((item,index)=>{
            if(cartItems[item._id]>0){
              return (
                <>
                <div className='cart-items-title cart-item'>
                 <p className='item-img' >
                  <img className='item-small'src={url+'/images/'+item.image} alt='/'/>
                  </p>  
                  <p className='item-text' >
                 {item.name}
                  </p>  
                  <p className='item-text' >
                 ${item.price}
                  </p>
                  <button className='item-btn-small' >
                 {cartItems[item._id]}
                  </button>
                  <p className='item-text' >
                 ${(item.price)*cartItems[item._id]}
                  </p>
                  <div className='item-remove'>
                    <img onClick={()=>(removeFromCart(item._id))} src={assets.cross_icon} alt='/'/>
                    </div>
      
                    </div>
                    <hr/>
                   </>
              )
            }
          })
        }
      </div>
      
      <div className='total-heading'>Cart Totals</div>
      <div className='cart-main-bottom'>
      <div className='bottom-start'>
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
      <button className='checkout' onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
      </div>
     
      


    
    <div className='promo'>
    <h3>If you have a promo code,Enter it here..</h3> 
      <div className='promo-inside'>
      <input type="text" placeholder='promo code'/>
<button className='black-btn-promo'>Submit</button>
</div>
    </div>
    </div>
    </div>
    </div>
  )
}
