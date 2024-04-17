import NavBar from '../components/molecules/navBar/NavBar';

export default function AlbumsLayout({children}:{children:React.ReactNode}){
    return (
        <div>
            <div>
                <NavBar/>
            </div>
            <div style={{padding:"150px 70px 100px 70px"}}>
                {children}
            </div> 
        </div>
    );
}