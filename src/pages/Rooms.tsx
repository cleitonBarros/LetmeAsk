import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/button'
import { RoomCode } from '../components/RoomCode'
import {useParams} from 'react-router-dom'
import { FormEvent, useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'

import "../styles/room.scss"
import { db } from '../services/Firebase'

export function Rooms(){

    type Question ={
        id: string,
        author: {
            nome: string;
            avatar: string;
        }
        content: string;
        isHighlighted: boolean;
        isAnswer:boolean;

    }

    type firebaseQuestion = Record<string,{
        author: {
            nome: string;
            avatar: string;
        }
        content: string;
        isHighlighted: boolean;
        isAnswer:boolean;
    }>

    type RoomParams ={
        id: string 
    }
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const {user} = useAuth();
    const [newQuestion,setNewQuestion]= useState('')
    const [questions, setQuestions] =useState<Question[]>([])
    const [title, setTitle] = useState();


    //pegando a perguntas do firebase
    useEffect(()=>{
        const roomRef = db.ref(`rooms/${roomId}`);

        roomRef.on('value', room =>{
            const dbRoom =  room.val()
            const FBQuestion:  firebaseQuestion = dbRoom.dbRoom.question ?? {}

            const parsedQ =  Object.entries( FBQuestion).map(([key, value]) =>{
                return{
                    id:key,
                    content:value.content,
                    author:value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswer: value.isAnswer,

                }
            })
            setTitle(dbRoom.title)
            setQuestions(parsedQ)

        
        })
    },[roomId])

    async function handleSendQuestion(event: FormEvent){
         event. preventDefault()

        if(newQuestion.trim() === ''){
            return;
        }

        if(!user){
            throw new  Error('you must be logged')
        }

        const question ={
            content: newQuestion,
            author:{
                name: user.name,
                avatar: user.avatar,
            },
            isHighlighted: false,
            isAnswer: false
        }

        await db.ref(`rooms/${roomId}/questions`).push(question)

        setNewQuestion('')
    }


    return(
       <div id="page-room">
           <header>
               <div className="content">
                   <img src={logoImg} alt="letmeask" />
                   <RoomCode code={params.id!}/>
               </div>
           </header>
           <main >
               <div className="room-title">
                   <h1>sala {title}</h1>

                   {questions.length> 0 &&  <span>{questions.length}perguntas</span>}
                  
               </div>
               <form onSubmit={handleSendQuestion}>
                   <textarea placeholder="O que voce quer perguntare"
                   onChange={event => setNewQuestion(event.target.value)}  value={newQuestion}
                   />
                   <div className="form-footer">
                    
                    {user ? ( 
                        <div className="user-info">
                            <img src={user.avatar} alt={user.name} />
                            <span>{user.name}</span>

                        </div>
                    ) : (
                        <span>Para enviar um pergunta,<button>faça seu login </button></span>
                    ) }
                       <Button type="submit" disabled={!user}>EnviarPergunta</Button>
                   </div>
               </form>

                {JSON.stringify(questions)}

           </main>
       </div>
    )
}