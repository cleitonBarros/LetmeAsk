
import { Link, useNavigate   } from "react-router-dom";
import { FormEvent, useState } from "react";
import { db } from "../services/Firebase"

import illustrationsImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'

import {Button} from '../components/button'
import { useAuth } from "../hooks/useAuth";


import '../styles/auth.scss'



export function NewRoom(){
   const { user} = useAuth()
   const history = useNavigate();
   const [newRoom,setNewRoom] = useState('');
 
   
   async function handleCreateRoom(event:FormEvent){
       event.preventDefault();
      
       if(newRoom.trim() === ""){
           return;
       }

       const roomRef = db.ref('rooms')
       const fireBaseRoom = await roomRef.push({
           title: newRoom,
           authorId: user?.id,
       })
       history(`/rooms/${fireBaseRoom.key}`)

   }
    
    return(
        <div id="page-auth">
            <aside>
                <img src={illustrationsImg} alt="ilustração simbolizando perguntas e repostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as duvidas da sua audiencia em tempo real</p>
            </aside>


            <main >
                <div className="main-content">
            <img src={logoImg} alt="Letmeask" />
           
               <h2>Criar um nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input type="text" placeholder="Nome da sala" onChange={event=>setNewRoom(event.target.value)}/>
                        <Button type="submit" >Criar sala</Button>
                    </form>
                    <p>Quer entrar em um sala existente?<Link to="/">Clique aqui</Link></p>
                </div>
               
            </main>
          
        </div>
    )
}