import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import Exploremenu from '../../components/Exploremenu/Exploremenu'

import FoodMenu from  '../../components/FoodMenu/FoodMenu'

export default function Home() {
  const [category,setCategory]=useState("All");
  return (
    <div>
      <Header/>
      <Exploremenu category={category} setCategory={setCategory}/>
      <FoodMenu category={category}/>
    </div>
  )
}
