import { useEffect, useState } from "react";
import { db } from "../services/Firebase";

type Question ={
    id: string,
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isHighlighted: boolean;
    isAnswer:boolean;

}
type firebaseQuestion = Record<string,{
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isHighlighted: boolean;
    isAnswer:boolean;
}>
export function useRoom(roomId:string){


    const [questions, setQuestions] =useState<Question[]>([])
    const [title, setTitle] = useState();
     //pegando a perguntas do firebase
     useEffect(()=>{
        const roomRef = db.ref(`rooms/${roomId}`);

        roomRef.on('value', room =>{
            console.log(room.val())
            const dbRoom =  room.val()
            const FBQuestion:  firebaseQuestion = dbRoom.questions ?? {}

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

    return {questions, title}
}