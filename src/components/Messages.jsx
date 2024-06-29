import {supabase} from "../supabaseClient"
import {useEffect, useState, useRef} from "react"
import {Message} from "./Message"
import {Header} from "./Header"
import {SendMessage} from "./SendMessage"

export const Messages = () => {
    
    const [messages, setMessages] = useState([]);
    const scroll = useRef()
    const callSupabase = async () => {
        const {data} = await supabase.from('messages').select('*')
        
        setMessages(data);
    }

    useEffect(() => {
        callSupabase()
    }, []);
    
    useEffect(() => {
        const channel = supabase
            .channel("*")
            .on("postgres_changes", {event:"INSERT", schema:"public", table:"messages"}, 
            (payload )=>{
                const newMessage = payload.new;
                setMessages(messages => [...messages, newMessage])
            })
            .subscribe()

        return ()=>{

            supabase.removeChannel(channel)
        }

    }, [])

    return (
        <section className="messages">
            <Header/>
            <div className="content">
                {messages && messages.map((msg, index)=>
                    ( console.log(msg),
                    <Message key={index} 
                            message={msg.content}
                            date={msg.created_at}
                            email={msg.email}
                            />
                    )
                )}
            </div>
            <SendMessage scroll={scroll}/>
            <span ref={scroll}></span>
        </section>
    )
}
