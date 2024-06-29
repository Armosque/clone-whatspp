
import { FaLongArrowAltLeft } from "react-icons/fa";
import { supabase } from "../supabaseClient";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import {getAvatarUser} from '../helpers/getAvatarUser'
export const Header = () => {
    
    const [user, setUser]= useState(null)
    const [open, setOpen]= useState(false)
    const handleLogout = async () => {
        // eslint-disable-next-line no-unused-vars
        const {error} = await supabase.auth.signOut();
        window.location.reload();
    }
    const getSession = async () => {

        const {data} = await supabase.auth.getSession()
        setUser(data.session.user.email);
    }
    useEffect(() => {
        getSession()
    }, []);
    const handleDots = () => {
        setOpen(current => !current)
    }
    return (
        <div className="header">
            <div className="left">
                <p className="logout" onClick={handleLogout}><FaLongArrowAltLeft color="white"  size= "20px" /></p>
                <img src={`/perfil/w${getAvatarUser(user)}.jpg`|| `/perfil/w${getAvatarUser(user)}.png`}  alt="perfil" className="logo" />
                <p className="name">@{user?.split("@")[0]}
                    <span>online</span>
                </p>
            </div>
            <p className="dots" onClick={handleDots}><BsThreeDotsVertical color="white"  size= "20px" /></p>
            <div className={`float-out ${open ? "open" : ""}`}
                onClick={handleLogout}>
                LogOut
            </div>
            
        </div>
    )
}
