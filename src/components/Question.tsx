
import { ReactNode } from 'react';
import '../styles/question.scss'

type QuestionProps = {
    content: string;
    author: {
        name:string;
        avatar: string;
    }
    children?: ReactNode
    isAnswer?: boolean;
    isHighlighted?: boolean;
}
export function Question( { content, author, isAnswer= false, isHighlighted = false, children,} : QuestionProps){
    return(
        <div className={`question  ${ isAnswer ? 'answered' : '' } ${ isHighlighted ? 'highlighted' : '' }`}>
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </div>
                <div>{children}</div>
            </footer>
        </div>
    )
}