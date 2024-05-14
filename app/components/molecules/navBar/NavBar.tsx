"use client"
import Text, { TextTypes } from '../../atoms/text/Text'
import navBarStyle from './navBarStyle.module.css'
import { getAuthHeaders } from '../../../utils/requestHeader'
import cookies from 'js-cookie'
export type NavBarProps = {
    isLogged?: boolean
    noLinks?: boolean
}
export default function NavBar({isLogged, noLinks}:NavBarProps){
    const handleLogout = ()=>{
        cookies.remove('jwtToken');
        location.replace('auth/logIn')
        
    }
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

                                        {/* TODO: IMPLEMENT LOGOUT */}
                                        <div onClick={handleLogout}>
                                            <Text text='Logout'/>
                                        </div>
                                    </>
                                }
                            </div>
                    }
                    
                
            </div>

        </div>
    )
}