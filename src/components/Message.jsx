/* eslint-disable react/prop-types */
import {formatDate} from "../helpers/formatDate"
import {supabase} from "../supabaseClient"
import {useEffect, useState} from "react"

// eslint-disable-next-line react/prop-types
export const Message = ({date, message, email}) => {

    const [user, setUser] = useState('')

    const getSession = async () => {

        const {data} = await supabase.auth.getSession()
        setUser(data.session.user.email);
    }
    useEffect(() => {
        getSession()
    }, []);
    

    return (
        <div className={`card ${user === email ? "me" : ""}`}>
            <p>{message}</p>
            <span>{formatDate(date)}</span>
            
            <span className="user-email">{email?.split("@")[0]}</span>
        </div>
    )
}
