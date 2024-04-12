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

export type AlbumListProps = {
    albumId: string
}

const emptyAlbum: Album ={
    title: "",
    isPublic: false,
}
export default function AlbumList({albumId}: AlbumListProps){
    const [album, setAlbum] = useState<Album>()
    const [photos, setPhotos] = useState([])
    const [uploadModalOpen, setUploadModalOpen] = useState(false)

    useEffect(()=>{
        fetch(`http://127.0.0.1:8000/albums/${albumId}`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            setAlbum(data);
        }).catch((error)=>{
            console.log(error)
        })
       loadPhotos();
    },[])

    const handlePhotoAddition = (files:File[])=>{
        const formData = new FormData();
       
        [...files].forEach((file) => {
            formData.append("files", file);
        });
          
        fetch(`http://127.0.0.1:8000/photo/${albumId}`, {
            method:"POST", 
            body:formData
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
        fetch(`http://127.0.0.1:8000/photo/${albumId}`)
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
            <div className={albumListStyle.headerContainer}>
                <div className={albumListStyle.titleContainer}>
                    <Text text={album?.title!} type={TextTypes.HEADER}/>
                    
                </div>
                
                <div className={albumListStyle.headerButtons}>
                    <Button text="" 
                        size={ButtonSize.SMALL}  
                        variant={ButtonVariant.OUTLINED}
                        icon={
                            <IoSettingsOutline className={albumListStyle.iconFilter}/>
                        }
                        onClick={()=>{}}
                    />
                    <Button text="" 
                        size={ButtonSize.SMALL}  
                        variant={ButtonVariant.OUTLINED}
                        icon={
                            <IoFilter className={albumListStyle.iconFilter}/>
                        }
                        onClick={()=>{}}
                    />
                    <Button text="Upload" 
                        size={ButtonSize.BIG} 
                        icon={<MdOutlineCloudUpload />}
                        onClick={()=>setUploadModalOpen(true)}
                    />
                </div>
            </div>
            <Divider />
            <div className={albumListStyle.photosContainer}>
                {
                    photos.map((photo:any, index)=>{
                        return (
                            <div>
                                <img key={index} className={albumListStyle.photo} src={photo.image_key}/>
                            </div>  
                        )
                    })
                }
            </div>
            {uploadModalOpen &&
               <CreatePhotoModal onClose={()=> setUploadModalOpen(false)}  onSubmit={handlePhotoAddition}/>
            }
        </div>
    );
}