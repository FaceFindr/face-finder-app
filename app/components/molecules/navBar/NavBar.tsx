"use client"
import Text, { TextTypes } from '../../atoms/text/Text'
import navBarStyle from './navBarStyle.module.css'

export type NavBarProps = {
    isHomePage?: boolean
}
export default function NavBar({isHomePage}:NavBarProps){
    return(
        <div className={navBarStyle.navContainer}>
            <div onClick={()=>window.location.assign("/")} className={navBarStyle.logo}><Text text='FaceFindr.' type={TextTypes.HEADER}/></div>
            {
                isHomePage &&
                <div className={navBarStyle.authLinks}>
                    <a href="/auth/logIn" className={navBarStyle.authLink} ><Text text='Login' /></a>
                    <a href="/auth/signUp" className={navBarStyle.authLink}><Text text='Sign Up'/></a>  
                </div>
            }
        </div>
    )
}