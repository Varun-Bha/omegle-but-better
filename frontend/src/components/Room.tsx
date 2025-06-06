import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { io, type Socket } from "socket.io-client";

const URL = "http://localhost:3000";

export const Room = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const name = searchParams.get('name');
    const [lobby, setLobby] = useState(true);
    const [socket, setSocket] = useState<null | Socket>(null);


    useEffect(() =>{
        const socket = io(URL, {
            autoConnect: true,
        });
        socket.on('send-offer', ({ roomId }) => {
            alert("send offer please");
            socket.emit("offer", {
                sdp: "sdp", 
                roomId
            })
        });


        socket.on('send-offer', ({ roomId, offer }) => {
            alert("send answer please");
            setLobby(false);
            socket.emit("answer", {
                roomId,
                sdp: ""
            })
        });

        socket.on("answer", ({ roomId, answer }) => {
            setLobby(false);

            alert("connection done");
        })

        socket.on("lobby",() => {
            setLobby(true);
        })

        setSocket
    },[name]) 

    if (lobby) {
        return <div>    
            Waiting to connect you to someone
        </div>
    }


    return <div >
        Hi {name}
        </div>
}
    