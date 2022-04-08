import { useEffect, useState } from "react";
import { db } from "../services/Firebase";
import { useAuth } from "./useAuth";

type Question ={
    id: string,
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isHighlighted: boolean;
    isAnswer:boolean;
    likeCount: number;
    likeId: string | undefined;


}

type firebaseQuestion = Record<string,{
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isHighlighted: boolean;
    isAnswer:boolean;
    likes: Record<string, {
        authorId: string;
    }>
}>
export function useRoom(roomId:string){

    const {user} = useAuth()
    const [questions, setQuestions] =useState<Question[]>([])
    const [title, setTitle] = useState();
     //pegando a perguntas do firebase
     useEffect(()=>{
        const roomRef = db.ref(`rooms/${roomId}`);

        roomRef.on('value', room =>{
          
            const dbRoom =  room.val()
            const FBQuestion:  firebaseQuestion = dbRoom.questions ?? {}

            const parsedQ =  Object.entries( FBQuestion).map(([key, value]) =>{
                return{
                    id:key,
                    content:value.content,
                    author:value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswer: value.isAnswer,
                    likeCount: Object.values(value.likes ?? {}).length,
                   likeId:Object.entries(value.likes ?? {}).find(([key, like])=> like.authorId === user?.id)?.[0]
                }
            })
         
            setTitle(dbRoom.title)
            setQuestions(parsedQ)

        
        })

        return ()=>{
            roomRef.off('value')

        } 
    },[roomId, user?.id])

    
    return {questions, title}
}