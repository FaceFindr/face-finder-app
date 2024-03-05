"use client"
import { useEffect, useState } from "react";
import Text, { TextTypes } from "../../atoms/text/Text";
import Button, { ButtonSize, ButtonVariant } from "../../atoms/button/Button";
import Divider from "../../atoms/divider/Divider";
import AlbumCard from "../../molecules/albumCard/AlbumCard";
import { ALBUM_VISIBILITY, Album } from "@/src/constants/album";
import { IoFilter } from "react-icons/io5";
import publicAlbumsListStyle from "./publicAlbumsListStyle.module.css"

export default function PublicAlbumsList(){
    const [albums, setAlbums] = useState<Album[]>([])

    useEffect(()=>{
        fetch('http://127.0.0.1:8000/albums')
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            setAlbums(data);
        }).catch((error)=>{
            console.log(error)
        })
    }, [])

    return (
        <div>
            <div className={publicAlbumsListStyle.pageHeader}>
                <Text text="Public Gallery" type={TextTypes.HEADER}/>
                <div className={publicAlbumsListStyle.pageHeaderButtons} >
                    <Button text="" 
                        size={ButtonSize.SMALL}  
                        variant={ButtonVariant.OUTLINED}
                        icon={
                            <IoFilter className={publicAlbumsListStyle.iconFilter} />
                        }
                    />
                </div>

            </div>
            <Divider />
            <div className={publicAlbumsListStyle.albumsContainer}>
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
        </div>
    );
}