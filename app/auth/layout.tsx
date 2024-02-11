import layoutStyle from './layoutStyle.module.css'
import logo from '@/public/image/logo.png'

export default function AuthLayout({children}:{children:React.ReactNode}){
    return (
        <div className={layoutStyle.authContainer}>
            <div className={layoutStyle.imgContainer}></div>

            <div className={layoutStyle.contentContainer}>
                <div className={layoutStyle.formHeader}>
                    <img src={logo.src} alt=""  className={layoutStyle.logo}/>
                </div>
            
                {children}  
            </div>

        </div>
    );
}