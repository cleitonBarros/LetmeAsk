import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

import illustrationsImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'

import {Button} from '../components/button'


import '../styles/auth.scss'



export function Home(){

    const history = useNavigate();
    const { user, signInWithGoogle   } = useAuth();

    

   async function handleCreateRoom(){
        if(!user){
            await signInWithGoogle()
        }
        history('/room/new')
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
                    <button onClick={handleCreateRoom}className="create-room">
                        <img src={googleIconImg} alt="Icone do google" />
                        Crie sua sala com o google
                    </button>
                    <div className="separator"> ou entre em uma sala</div>
                    <form action="">
                        <input type="text" placeholder="Digite o codigo da sala"/>
                        <Button type="submit">Entrar na sala</Button>
                    </form>
                </div>
            </main>
          
        </div>
    )
}