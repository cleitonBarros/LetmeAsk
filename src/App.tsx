
import{BrowserRouter, Routes, Route } from 'react-router-dom'

import {Home} from './pages/Home';
import {NewRoom} from './pages/NewRoom';
import { Rooms } from './pages/Rooms';
import { AdminRoom } from './pages/AdminRoom';


import {AuthContextProvider} from './context/AuthContext'


function App() {


  return (
  
  <BrowserRouter>
     <AuthContextProvider>
       <Routes>
        <Route path="/"  element={<Home/>}/>
        <Route path="/room/new" element={<NewRoom/>}/>
        <Route path="/rooms/:id" element={<Rooms/>}/>
        <Route path="/admin/rooms/:id " element={<AdminRoom/>}/>

       </Routes>
     </AuthContextProvider> 
  </BrowserRouter>


  );
}

export default App;
