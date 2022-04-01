import { createContext, ReactNode, useEffect, useState } from "react";
import { auth,firebase} from "../services/Firebase";


//typerscript
type User={
  id:string;
  name:string; 
  avatar:string;
}
type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: ()=> Promise<void>;
}

type authContextProvideProps ={
  children: ReactNode;
  
}
//typerscript
export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: authContextProvideProps) {
  const [user, setUser] = useState<User>()

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(user =>{
      if(user){
        const {displayName, photoURL, uid} = user

        if(!displayName || !photoURL){
          throw new Error('Missing information from google Account')
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })

      }
    })

    return()=>{
      unsubscribe();
    }
  },[])

  //concectar com google 
  async function signInWithGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider)

      if(result.user){
        const {displayName, photoURL, uid} = result.user

        if(!displayName || !photoURL){
          throw new Error('Missing information from google Account')
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })

      }
  }

    return(
        <AuthContext.Provider value={{user, signInWithGoogle}}>
            {props.children}
        </AuthContext.Provider>

    );
}