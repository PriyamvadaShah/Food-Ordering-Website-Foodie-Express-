import React from 'react'
import './Header.css'

export default function Header() {
  return (
    <div>
      <div className='header'>
        <div className='header-content'>
            <h2 className='head1'>Order your favourite food now..</h2>
            <p className='para'> 
            Delicious Meals, Delivered to Your Doorstep
            </p>
            <div className='btnin'>
            <button className='btn'>View Menu</button>
            </div>
        </div>
      </div>
    </div>
  )
}
