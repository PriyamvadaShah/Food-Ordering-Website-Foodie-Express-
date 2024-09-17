import React from 'react'
import './Exploremenu.css'
import {menu_list} from '../../assets/assets'
export default function Exploremenu({category,setCategory}) {
  return (
    <div className='explore'>
      <div className='explore-heading'>EXPLORE MENU</div>
      
     <p className='explore-content' >Fresh, hot, and ready to eat! Explore our menu and order your favorite dishes.Choose from a diverse menu featuring a delectable array of dishes..</p>
     <div className='explore-menulist'>
     {menu_list.map((item,index)=>{
      return (
        <div onClick={()=>{
          setCategory(prev=>prev===item.menu_name?"All":item.menu_name);
        }}
        key={index}>
          <img className={category===item.menu_name?"active":""} src={item.menu_image} alt='/'/>
          <p className='explore-itemname'>{item.menu_name}</p>
          </div>
      )
     })}
     </div>
     <hr/>
    </div>
  )
}
