import layoutStyle from './layoutStyle.module.css'
import logoB from '@/public/image/logoB.png'
import logo from '@/public/image/logo.png'


export default function AuthLayout({children}:{children:React.ReactNode}){
    return (
        <div className={layoutStyle.authContainer}>
            <div className={layoutStyle.imgContainer}></div>

            <div className={layoutStyle.contentContainer}>
                <div className={layoutStyle.formHeader}>
                    <img src={logoB.src} alt=""  className={layoutStyle.logoB}/>
                </div>
            
                {children}  
            </div>

        </div>
    );
}