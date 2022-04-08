import logoImg from '../assets/images/logo.svg'
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';
import { Button } from '../components/button'
import { RoomCode } from '../components/RoomCode'
import {useNavigate, useParams} from 'react-router-dom'


import "../styles/room.scss"

import  toast, { Toaster } from 'react-hot-toast'
import { Question } from '../components/Question'
import { useRoom } from '../hooks/useRoom'
import { db } from '../services/Firebase'

export function AdminRoom(){

   
    type RoomParams ={
        id: string 
    }

    const params = useParams<RoomParams>();
    const roomId = params.id;

    //
    const history = useNavigate();
  
    // enviar o roomId pro hooks useRoom e recebe title e a quetão
    const {title, questions} = useRoom(roomId!)
    
  
    //toast
   /* const voidNotify = () => toast.error('Campo vazio! Preencha-o' ,{
        id: 'clipboard',
      });
    const logNotify = () => toast.error('Realize o login para continar' ,{
        id: 'clipboard',
      });
    const questionNotify = () => toast.success('Enviado' ,{
        id: 'clipboard',
      });*/
      

      //fecha a sala e manda para home
      async function handleCloseRoom(){
        await db.ref(`room/${roomId}/`).update({
          endedAt: new Date(),
        })

        history('/')

    }
      //exclui a pergunta
      async function handleDeleteQuestion(questionId: string){
       if( window.confirm("Tem certeza que deseja excluir a pergunta?")){
         await db.ref(`rooms/${roomId}/questions/${questionId}`).remove();
       }

     }

     async function handleCheckQuestionAsAnswered(questionId: string){
       await db.ref(`rooms/${roomId}/questions/${questionId}`).update({
         isAnswer: true,
       })

     }
     
     async function handleHighLightQuestion(questionId: string){
      await db.ref(`rooms/${roomId}/questions/${questionId}`).update({
        isHighlighted: true,
      })

     }
    return(
       <div id="page-room">
           <header>
               <div className="content">
                   <img src={logoImg} alt="letmeask" />
                   <div>
                   <RoomCode code={params.id!}/>
                    <Button onClick= {handleCloseRoom} isOutlined>Encerrar sala</Button>
                   </div>
               </div>
           </header>
           <main >
               <div className="room-title">
                   <h1>sala {title}</h1>

                   {questions.length> 0 &&  <span>{questions.length }perguntas</span>}
                  
               </div>
                <div className="question-list">
                {questions.map(question =>{
           
                    return(
                        <Question
                        key = {question.id}
                        content={question.content} 
                        author={ question.author}
                        isAnswer ={question.isAnswer}
                        isHighlighted ={ question.isHighlighted}
                        
                        >
                    {!question.isAnswer && (
                       <>
                        <button type="button"  onClick={() => handleCheckQuestionAsAnswered(question.id)} >
                             <img src={checkImg} alt="Marcar pergunta como respondida" />
                        </button>

                        <button   type="button" onClick={() => handleHighLightQuestion(question.id)} >
                              <img src={answerImg} alt="Dar destaque à pergunta" />
                        </button>
                        </> 
                        )}

                        <button type="button" onClick={() => handleDeleteQuestion(question.id)} >
                        <img src={deleteImg} alt="Remover pergunta" />
                        </button>


                        </Question> 
          
                    )
                })}
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
           </main>
       </div>
    )
}