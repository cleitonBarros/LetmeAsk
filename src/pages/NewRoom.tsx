
import { Link   } from "react-router-dom";


import illustrationsImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'

import {Button} from '../components/button'
import { useAuth } from "../hooks/useAuth";


import '../styles/auth.scss'

export function NewRoom(){
   const { user} = useAuth()
    
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
           <h1>{user?.name}</h1>
               <h2>Criar um nova sala</h2>
                    <form action="">
                        <input type="text" placeholder="Nome da sala"/>
                        <Button type="submit">Criar sala</Button>
                    </form>
                    <p>Quer entrar em um sala existente?<Link to="/">Clique aqui</Link></p>
                </div>
            </main>
          
        </div>
    )
}