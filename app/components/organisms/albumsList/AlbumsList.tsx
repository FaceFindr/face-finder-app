'use client'
import { ALBUM_VISIBILITY, Album } from "@/src/constants/album";
import Text, { TextTypes } from "../../atoms/text/Text";
import Button, { ButtonSize } from "../../atoms/button/Button";
import Divider from "../../atoms/divider/Divider";
import AlbumCard from "../../molecules/albumCard/AlbumCard";
import albumsListStyle from "./albumsListStyle.module.css"
import { useEffect, useState } from "react";
import Modal from "../../molecules/modal/Modal";
import CreateAlbumForm from "../createAlbumForm/CreateAlbumForm";
import FilterButton from "../../molecules/filterButton/FilterButton";
import StandartHeader from "../../molecules/standardHearder/StandardHeader";
import { IoFilter } from "react-icons/io5";
import Cookies from 'js-cookie';




const emptyNewAlbum: Album ={
    title: "",
    description:"",
    label:"",
    isPublic: false,
}
export default function AlbumsList(){
    const [uploadModalOpen, setUploadModalOpen] = useState(false)
    const [albums, setAlbums] = useState<Album[]>([])

    useEffect(()=>{
        const jwtToken = Cookies.get('jwtToken');
        let headers = {};

        if (jwtToken) {
            headers['Authorization'] = `Bearer ${jwtToken}`;
        }
      
        fetch(`http://127.0.0.1:8000/albums/user`, {headers:headers})
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            setAlbums(data);
        }).catch((error)=>{
            console.log(error)
        })
    }, [])

    const handleNewAlbumSubmission = (event: any) =>{
        event.preventDefault()

        const album = emptyNewAlbum;
        album.title = event.target.title.value
        album.description = event.target.description.value
        album.label = event.target.label.value
        album.isPublic = event.target.isPublic.checked
        
        const jwtToken = Cookies.get('jwtToken');
        let headers = {
            'Content-Type': 'application/json'
        };
        
        if (jwtToken) {
            headers['Authorization'] = `Bearer ${jwtToken}`;
        }

        fetch('http://127.0.0.1:8000/albums', {
            method:"POST", 
            headers: {...headers},
            body: JSON.stringify(album)
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
           window.location.assign(`albums/${data.id}`)
        }).catch((error)=>{
            console.log(error)
        })
    }

    return (
        <div>
            {/* Hearder */}
            <StandartHeader 
                title="My Albums"
                mainButtonText="New Album" 
                secondaryButtonIcon={<IoFilter/>}
                onClickMainButton={()=>setUploadModalOpen(true)} 
                onClickSecondaryButton={()=>{}}
            />

            <Divider />
            
            {/* Albums */}
            <div className={albumsListStyle.albumsContainer}>
                {albums.map(album =>{
                    return (
                        <AlbumCard 
                            key={album.id}
                            id={album.id!}
                            showLabel
                            title={album.title}
                            label={album.label}
                        />
                    )
                })}
            </div>

            {/* Modal */}
            {uploadModalOpen &&
                <Modal 
                    title="New Album" 
                    content=
                    {
                        <CreateAlbumForm
                            onCancel={()=>setUploadModalOpen(false)}
                            onSubmit={handleNewAlbumSubmission}
                        />
                    } 
                    onClose={()=>setUploadModalOpen(false)}
                />
            }
        </div>
    );
}

