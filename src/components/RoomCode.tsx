import toast from 'react-hot-toast'
import copyImg from '../assets/images/copy.svg'

import'../styles/roomCode.scss'

type RoomCodeProps = {
    code: string
}


export function RoomCode(props: RoomCodeProps){
    const copyNotify = () => toast.success('Copiado' ,{
        id: 'clipboard',
      })

    function copyRoomCodeToClipboard(){
        navigator.clipboard.writeText(props.code)
        copyNotify();

    }
    return(
        <button className="room-code" onClick={copyRoomCodeToClipboard}>
            <div>
                <img src={copyImg} alt="copy room code" />
            </div>
            <span>#{props.code}</span>
        </button>
    )
}