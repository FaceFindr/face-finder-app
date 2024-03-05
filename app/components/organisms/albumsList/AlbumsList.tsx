'use client'
import { ALBUM_VISIBILITY, Album } from "@/src/constants/album";
import Text, { TextTypes } from "../../atoms/text/Text";
import Button, { ButtonSize, ButtonVariant } from "../../atoms/button/Button";
import Divider from "../../atoms/divider/Divider";
import AlbumCard from "../../molecules/albumCard/AlbumCard";
import { IoFilter } from "react-icons/io5";
import albumsListStyle from "./albumsListStyle.module.css"
import { useEffect, useState } from "react";
import Modal from "../../molecules/modal/Modal";
import CreateAlbumForm from "../createAlbumForm/CreateAlbumForm";

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
        fetch(`http://127.0.0.1:8000/albums/user`)
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
        
        fetch('http://127.0.0.1:8000/albums', {
            method:"POST", 
            headers: {
                'Content-Type': 'application/json'
            },
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
            <div className={albumsListStyle.pageHeader}>
                <Text text="My Albums" type={TextTypes.HEADER}/>
                
                <div className={albumsListStyle.pageHeaderButtons} >
                    <Button text="" 
                        size={ButtonSize.SMALL}  
                        variant={ButtonVariant.OUTLINED}
                        icon={
                            <IoFilter className={albumsListStyle.iconFilter} />
                        }
                    />
                    <Button text="New Album" 
                        size={ButtonSize.BIG} 
                        onClick={()=>setUploadModalOpen(true)}
                    />
                </div>

            </div>
            <Divider />
            <div className={albumsListStyle.albumsContainer}>
                {albums.map(album =>{
                    return <AlbumCard 
                            key={album.id}
                            id={album.id!}
                            date={album.creationDate ?? ""} 
                            label={album.label ?? ""}
                            visibility={album.isPublic ? ALBUM_VISIBILITY.PUBLIC : ALBUM_VISIBILITY.PRIVATE}
                        />
                })}
            </div>
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