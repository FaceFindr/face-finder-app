'use client'
import Button, { ButtonSize, ButtonVariant } from "@/app/components/atoms/button/Button";
import Text, { TextTypes } from "@/app/components/atoms/text/Text";
import { IoFilter, IoSettingsOutline } from "react-icons/io5";
import { MdOutlineCloudUpload } from "react-icons/md";
import albumListStyle from './albumListStyle.module.css'
import Divider from "@/app/components/atoms/divider/Divider";
import { useEffect, useState } from "react";
import { Album } from "@/src/constants/album";
import Modal from "../../molecules/modal/Modal";
import FileUpload from "../../molecules/fileUpload/fileUpload";
import CreatePhotoModal from "../createPhotoModal/CreatePhotoModal";
import { PersonCard } from "../../molecules/personCard/PersonCard";
import { getAuthHeaders } from "@/app/utils/requestHeader";
import dynamic from 'next/dynamic';
import StandartHeader from "../../molecules/standardHearder/StandardHeader";

const Layout = dynamic(() => import('react-masonry-list'), {
  ssr: false,
});

export type AlbumListProps = {
    albumId: string
}

const emptyAlbum: Album ={
    title: "",
    isPublic: false,
}
export default function AlbumOrganism({albumId}: AlbumListProps){
    const [album, setAlbum] = useState<Album>()
    const [photos, setPhotos] = useState([])
    const [uploadModalOpen, setUploadModalOpen] = useState(false)
    const [persons, setPersons] = useState([]);

    useEffect(() => {
        const headers = getAuthHeaders();
        fetch(`http://127.0.0.1:8000/albums/${albumId}`, { headers })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            setAlbum(data);
        }).catch((error)=>{
            console.log(error)
        })
    
        fetch(`http://127.0.0.1:8000/person/${albumId}`, { headers })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            setPersons(data);
        }).catch((error)=>{
            console.log(error)
        })
    
        loadPhotos();
    }, []);

    const handlePhotoAddition = (files:File[])=>{
        const formData = new FormData();
       
        [...files].forEach((file) => {
            formData.append("files", file);
        });

        const headers = getAuthHeaders();
        fetch(`http://127.0.0.1:8000/photo/${albumId}`, {
            method:"POST", 
            body:formData,
            headers
        })
        .then((res) => {
            console.log(res.json())
            setUploadModalOpen(false)
            loadPhotos()
            return res.json();
        }).catch((error)=>{
            console.log(error)
        })
    }

    const loadPhotos = ()=>{
        const headers = getAuthHeaders();
        fetch(`http://127.0.0.1:8000/photo/${albumId}`, { headers })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            setPhotos(data);
        }).catch((error)=>{
            console.log(error)
        })
    }

    const test = [1, 2, 3, 4, 5, 6, 8, 9, 10]

    return (
        <div>
            {/* Header */}
            <StandartHeader 
                title={album?.title!} 
                mainButtonText="Upload"
                mainButtonIcon={<IoSettingsOutline/>}
                secondaryButtonIcon={<MdOutlineCloudUpload />}
                onClickMainButton={()=>setUploadModalOpen(true)} 
                onClickSecondaryButton={()=>{location.assign(`${albumId}/settings`)}}
            />

            <Divider />

            {/* People */}
            <div className={albumListStyle.peopleSection}>
                <div className={albumListStyle.showAllCaption}>
                    <Text 
                        text={"Show all people"}
                        type={TextTypes.CAPTION}
                        link={`${album?.id}/people`}
                    />
                </div>
                <div className={albumListStyle.personCards}>
                    {persons.map((person:any, index) => {
                        return (
                            <PersonCard 
                                key={index} 
                                person={person.label} 
                                thumbnail={person.thumbnail_key}
                            />
                        )
                    })}
                </div>
            </div>

            {/* Photos */}
            <Layout
                gap={5}
                items={
                    photos.map((photo:any, index)=>{
                        return (
                            <div key={index}>
                                <img  className={albumListStyle.photo} src={photo.image_key}/>
                            </div>  
                        )
                    })
                }
            />

            {uploadModalOpen &&
               <CreatePhotoModal onClose={()=> setUploadModalOpen(false)}  onSubmit={handlePhotoAddition}/>
            }
        </div>
    );
}