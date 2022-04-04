import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/button'
import { RoomCode } from '../components/RoomCode'
import {useParams} from 'react-router-dom'
import "../styles/room.scss"


export function Rooms(){
    type RoomParams ={
        id: string;
    }

    const params = useParams<RoomParams>();


    return(
       <div id="page-room">
           <header>
               <div className="content">
                   <img src={logoImg} alt="letmeask" />
                   <RoomCode code={params.id}/>
               </div>
           </header>
           <main >
               <div className="room-title">
                   <h1>sala react</h1>
                   <span>4 perguntas</span>
               </div>
               <form action="">
                   <textarea placeholder="O que voce quer perguntare"/>
                   <div className="form-footer">
                       <span>Para enviar um pergunta,<button>faça seu login </button></span>
                       <Button type="submit">EnviarPergunta</Button>
                   </div>
               </form>
           </main>
       </div>
    )
}