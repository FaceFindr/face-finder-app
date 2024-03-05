import NavBar from "./components/molecules/navBar/NavBar";
import PublicAlbumsList from "./components/organisms/publicAlbumsList/PublicAlbumsList";


export default function HomePage(){
    return (
      <div>
        
        <div>
          <NavBar isHomePage/>
        </div>

        <div style={{padding:"100px 80px 100px 80px"}}>
          <PublicAlbumsList />
        </div> 

      </div>
     
    );
}