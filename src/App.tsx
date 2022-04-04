
import{BrowserRouter, Routes, Route } from 'react-router-dom'

import {Home} from './pages/Home';
import {NewRoom} from './pages/NewRoom';
import { Rooms } from './pages/Rooms';


import {AuthContextProvider} from './context/AuthContext'


function App() {


  return (
  
  <BrowserRouter>
     <AuthContextProvider>
       <Routes>
        <Route path="/"  element={<Home/>}/>
        <Route path="/room/new" element={<NewRoom/>}/>
        <Route path="/rooms/:id" element={<Rooms/>}/>

       </Routes>
     </AuthContextProvider> 
  </BrowserRouter>


  );
}

export default App;
