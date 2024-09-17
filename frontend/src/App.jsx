import React ,{useState}from 'react'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home';
import Placeorder from './pages/Placeorder/Placeorder';
import Cart from './pages/Cart/Cart'
import Verify from './pages/Verify/Verify'
import {Route,Routes} from 'react-router-dom';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Myorders from './pages/Myorders/Myorders';

export default function App() {
  const [showLogin,setshowLogin]=useState(false);
  return (
    <>{showLogin?<LoginPopup setshowLogin={setshowLogin} />:<></>}
    <div>
     <Navbar setshowLogin={setshowLogin}/>  
     <Routes>
            <Route path='/' element={<Home name="Raina"/>} />    
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/order' element={<Placeorder/>}/> 
            <Route path='/verify' element={<Verify/>}/>   
            <Route path='/myorders' element={<Myorders/>}/>    
        </Routes>
    </div>
    <Footer/>
    </>
  )
}

