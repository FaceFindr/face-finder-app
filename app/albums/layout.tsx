import NavBar from '../components/molecules/navBar/NavBar';
import layoutStyle from './layoutStyle.module.css'

export default function AlbumsLayout({children}:{children:React.ReactNode}){
    return (
        <div>
            <div>
                <NavBar/>
            </div>
            <div className={layoutStyle.pageContainer}>
                {children}
            </div> 
        </div>
    );
}