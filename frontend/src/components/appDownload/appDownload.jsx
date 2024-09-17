import './appDownload.css'
import React from 'react'
import {assets} from '../../assets/'
export default function appDownload() {
  return (
    <div>
      <p>For Better Experience Download<br/>
      Foodie Express App</p>
      <div className='platform-app'>
        <img src={assets.play_store} alt='/'/>
        <img src={assets.app_store} alt='/'/>
      </div>
    </div>
  )
}
