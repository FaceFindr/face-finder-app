import Cookies from 'js-cookie';
import NavBar from '../components/molecules/navBar/NavBar';

export default function AlbumsLayout({children}:{children:React.ReactNode}){
    const jwtToken = Cookies.get('jwtToken');
    console.log(jwtToken)
    return (
        <div>
            <div>
                <NavBar isLogged={jwtToken ? true: false}/>
            </div>
            <div style={{padding:"150px 70px 100px 70px"}}>
                {children}
            </div> 
        </div>
    );
}