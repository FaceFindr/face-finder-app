'use client'
import Cookies from 'js-cookie';
import NavBar from "./components/molecules/navBar/NavBar";
import PublicAlbumsList from "./components/organisms/publicAlbumsList/PublicAlbumsList";
import { useEffect } from 'react';
import { getAuthHeaders } from './utils/requestHeader';


export default function HomePage(){
    const jwtToken = Cookies.get('jwtToken')

    useEffect(()=>{
      const headers = getAuthHeaders();
        
      fetch(`http://127.0.0.1:8000/user`, { headers })
      .then((res) => {
          return res.json();
      })
      .then((data) => {
          console.log(data)
      }).catch((error)=>{
          console.log(error)
      })
    },[])

    return (
      <div>
        
        <div>
          <NavBar isLogged={jwtToken !== ""}/>
        </div>

        <div style={{padding:"150px 70px 100px 70px"}}>
          <PublicAlbumsList />
        </div> 

      </div>
     
    );
}