import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/button'
import { RoomCode } from '../components/RoomCode'
import {useParams} from 'react-router-dom'
import { FormEvent, useState } from 'react'
import { useAuth } from '../hooks/useAuth'

import "../styles/room.scss"
import { db } from '../services/Firebase'
import  toast, { Toaster } from 'react-hot-toast'
import { Question } from '../components/Question'
import { useRoom } from '../hooks/useRoom'

export function AdminRoom(){

   
    type RoomParams ={
        id: string 
    }

    const params = useParams<RoomParams>();
    const roomId = params.id;
    const {user} = useAuth();
    const [newQuestion,setNewQuestion]= useState('')
    const {title, questions} = useRoom(roomId!)
    
  
    //toast
    const voidNotify = () => toast.error('Campo vazio! Preencha-o' ,{
        id: 'clipboard',
      });
    const logNotify = () => toast.error('Realize o login para continar' ,{
        id: 'clipboard',
      });
    const questionNotify = () => toast.success('Enviado' ,{
        id: 'clipboard',
      });


    async function handleSendQuestion(event: FormEvent){
         event.preventDefault()

        if(newQuestion.trim() === ''){
            voidNotify();
            return;
        }

        if(!user){
            logNotify();
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
        questionNotify();
        await db.ref(`rooms/${roomId}/questions`).push(question)

        setNewQuestion('')
    }


    return(
       <div id="page-room">
           <header>
               <div className="content">
                   <img src={logoImg} alt="letmeask" />
                   <div>
                   <RoomCode code={params.id!}/>
                    <Button isOutlined>Encerrar sala</Button>
                   </div>
               </div>
           </header>
           <main >
               <div className="room-title">
                   <h1>sala {title}</h1>

                   {questions.length> 0 &&  <span>{questions.length }perguntas</span>}
                  
               </div>
             
               <Toaster
                 position="top-center"
                 reverseOrder={false}
                 
                toastOptions={{   
                    // Define default options
                    className: '',
                    duration: 2000,
                    style: {
                        border: '1px solid #835afd',
                        padding: '8px',
                      background: 'none',
                      color: '#835afd',
                    },

                    success: {
                        duration: 2000,
                        theme: {
                          primary: 'green',
                          secondary: 'black',
                        },
                      },
                    // Default options for specific types
                    error: {
                      duration: 2000,
                      theme: {
                        primary: 'purple',
                        secondary: 'white',
                      },
                    },
                
                  }}
                />
                <div className="question-list">

                {questions.map(question =>{
                    return(
                        <Question
                        key = {question.id}
                        content={question.content} 
                        author={ question.author}                      
                          />
                    )
                })}
                </div>
           </main>
       </div>
    )
}