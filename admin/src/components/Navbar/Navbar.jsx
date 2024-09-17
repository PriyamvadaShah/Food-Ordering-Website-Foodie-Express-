import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'

export default function Navbar() {
  return (
    <div className='navbar'>
      <div className='nav-up'>
      <div className='m-logo'>Foodie Express</div>
      <p className='nav-admin'>Admin Panel</p>
      <img className='profile' src={assets.profile_image} alt='/'/>
      </div>
    
    </div>
  )
}
