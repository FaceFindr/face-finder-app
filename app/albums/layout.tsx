import NavBar from '../components/molecules/navBar/NavBar';

export default function AlbumsLayout({children}:{children:React.ReactNode}){
    return (
        <div>
            <div>
                <NavBar/>
            </div>
            <div style={{padding:"100px 80px 100px 80px"}}>
                {children}
            </div> 
        </div>
    );
}