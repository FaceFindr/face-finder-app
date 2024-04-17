"use client"
import Text, { TextTypes } from '../../atoms/text/Text'
import navBarStyle from './navBarStyle.module.css'

export type NavBarProps = {
    isLogged?: boolean
    noLinks?: boolean
}
export default function NavBar({isLogged, noLinks}:NavBarProps){
    return(
        <div style={ !noLinks ? {position:"fixed"} : {}}>
            <div className={navBarStyle.auxBar}></div>
            <div className={`${navBarStyle.navContainer} ${noLinks ? navBarStyle.noLinks : navBarStyle.hasLinks }`}>
                <div onClick={()=>window.location.assign("/")} className={navBarStyle.logo}>
                    <Text 
                        text='Face' 
                        type={TextTypes.HEADER}
                        color='main-red'
                    />
                    <Text 
                        text='Findr.'  
                        type={TextTypes.HEADER}
                        color='main-blue'
                    />
                </div>
                    {
                        !noLinks &&
                            <div className={navBarStyle.authLinks}>
                                {!isLogged ?
                                    <>
                                        <Text text='Login' link='/auth/logIn'/>
                                        <Text text='Sign Up' link='/auth/signUp'/> 
                                    </>
                                    :  
                                    <>
                                        <Text text='Home' link='/'/>
                                        <Text text='My albums' link='/albums'/> 
                                        <Text text='Settings' link='/settings'/> 
                                        <Text text='Logout' link='/auth/signUp'/> 
                                    </>
                                }
                            </div>
                    }
                    
                
            </div>

        </div>
    )
}