import './Footer.css'
import React from 'react'
import {assets} from '../../assets/assets'
export default function Footer() {
  return (
    <div className='footer'>
      <div className='footer-content'>
        <div className='footer-left'>
            <div className='small-logo'>
                Foodie Express
            </div>
            <div className='footer-social'>
                <img src={assets.facebook_icon} alt='/'/> 
                 <img src={assets.twitter_icon} alt='/'/>
                <img src={assets.linkedin_icon} alt='/'/>
            </div>
        </div>
        <div className='footer-center1'>
         <h2>COMPANY</h2> 

            <a href=''>Home</a>
            <a href=''>About Us</a>
            <a href=''>Delivery</a>
            <a href=''>Blog</a>
            <a href=''>Press Kit</a>
            <a href=''>Report Fraud</a>
            <a href=''>Investor Relations</a>
            <a href=''>Privacy Policy</a>
          
        </div>
        <div className='footer-center2'>
         <h2>FOR RESTAURANTS</h2>  
        
            <a href=''>Partner With Us</a>
            <a href=''>Apps For You </a>
       
        </div>
        <div className='footer-right'>
          <h2>GET IN TOUCH</h2>  
         
            <a href=''>+1-211-672-3324</a>
            <a href=''>contact@foodie.com</a>
     
        </div>
      </div>
      <hr/>
      <p className='footer-copyright'>  Copyright 2024 © Foodieexpress.com-All Right Reserved.</p>
    </div>
  )
}
