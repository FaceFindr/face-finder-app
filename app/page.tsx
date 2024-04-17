import NavBar from "./components/molecules/navBar/NavBar";
import PublicAlbumsList from "./components/organisms/publicAlbumsList/PublicAlbumsList";


export default function HomePage(){
    return (
      <div>
        
        <div>
          <NavBar isLogged={false}/>
        </div>

        <div style={{padding:"150px 70px 100px 70px"}}>
          <PublicAlbumsList />
        </div> 

      </div>
     
    );
}