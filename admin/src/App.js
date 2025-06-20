import { Route,Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Order from './pages/Order/Order';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const url = process.env.REACT_APP_BASE_URL || 'http://localhost:8000';
  return (
   <div>
    <ToastContainer/>
    <Navbar/>
    <hr/>
    <div className='app-content'>
      <Sidebar/>
      <Routes>
        <Route path='/add' element={<Add url={url}/>}></Route>
        <Route path='/list' element={<List url={url}/>}></Route>
        <Route path='/order' element={<Order url={url} />}></Route>
      </Routes>
    </div>
   </div>
  );
}

export default App;
