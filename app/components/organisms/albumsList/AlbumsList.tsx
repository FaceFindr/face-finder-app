'use client'
import { ALBUM_VISIBILITY } from "@/src/constants/album";
import Text, { TextTypes } from "../../atoms/text/Text";
import Button, { ButtonSize, ButtonVariant } from "../../atoms/button/Button";
import { MdOutlineCloudUpload } from "react-icons/md";
import Divider from "../../atoms/divider/Divider";
import AlbumCard from "../../molecules/albumCard/AlbumCard";
import { IoFilter } from "react-icons/io5";
import albumsListStyle from "./albumsListStyle.module.css"
import { useState } from "react";
import Modal from "../../molecules/modal/Modal";
import CreateAlbumForm from "../createAlbumForm/CreateAlbumForm";

export default function AlbumsList(){
    const [uploadModalOpen, setUploadModalOpen] = useState(false)

    const mock = [
        {
            id:"1",
            date: "10/10/10",
            label:"Birthday",
            visibility:ALBUM_VISIBILITY.PRIVATE
        },
        {
            id:"2",
            date: "10/10/10",
            label:"Birthday",
            visibility:ALBUM_VISIBILITY.PRIVATE
        },
        {
            id:"3",
            date: "10/10/10",
            label:"Birthday",
            visibility:ALBUM_VISIBILITY.PRIVATE
        },
        {
            id:"4",
            date: "10/10/10",
            label:"Birthday",
            visibility:ALBUM_VISIBILITY.PRIVATE
        },
        {
            id:"5",
            date: "10/10/10",
            label:"Birthday",
            visibility:ALBUM_VISIBILITY.PRIVATE
        },
        {
            id:"6",
            date: "10/10/10",
            label:"Birthday",
            visibility:ALBUM_VISIBILITY.PRIVATE
        },
        {
            id:"7",
            date: "10/10/10",
            label:"Birthday",
            visibility:ALBUM_VISIBILITY.PRIVATE
        },
        {
            id:"8",
            date: "10/10/10",
            label:"Birthday",
            visibility:ALBUM_VISIBILITY.PRIVATE
        }
    ]

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
                    <Button text="Upload" 
                        size={ButtonSize.BIG} 
                        icon={<MdOutlineCloudUpload className={albumsListStyle.buttonIcon} />}
                        onClick={()=>setUploadModalOpen(true)}
                    />
                </div>

            </div>
            <Divider />
            <div className={albumsListStyle.albumsContainer}>
                {mock.map(album =>{
                    return <AlbumCard 
                            key={album.id}
                            date={album.date} 
                            label={album.label}
                            visibility={album.visibility}
                        />
                })}
            </div>
            {uploadModalOpen &&
                <Modal 
                    title="New Album" 
                    content={<CreateAlbumForm/>} 
                    onClose={()=>setUploadModalOpen(false)}
                />
            }
            
           
        </div>
    );
}