
import { LuSendHorizonal } from "react-icons/lu";
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

// eslint-disable-next-line react/prop-types
export const SendMessage = ({scroll}) => {

    const [newMessage, setNewMessage] = useState("");
    const [user, setUser]= useState("");
 

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newMessage !== "") {
            const insert = await supabase.from("messages").insert({
                content: newMessage,
                email: user
            })
            console.log(insert);
            setNewMessage("");
        }
        console.log(newMessage);
        
        // eslint-disable-next-line react/prop-types
        scroll.current.scrollIntoView({Behavior: 'smooth'})
    }
    const getSession = async () => {

        const {data} = await supabase.auth.getSession()
        setUser(data.session.user.email);
    }
    useEffect(() => {
        getSession()
    }, []);


    return (
        <section className="send-mesage">
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name ="message"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Write your message" />
                <button 
                    type="submit">
                    <LuSendHorizonal color="white" /></button>
            </form>

        </section>
    )
}
