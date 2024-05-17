'use client'

import Text, { TextTypes } from "@/app/components/atoms/text/Text";
import { IoFilter, IoSettingsOutline } from "react-icons/io5";
import { MdOutlineCloudUpload } from "react-icons/md";
import albumListStyle from './albumListStyle.module.css'
import Divider from "@/app/components/atoms/divider/Divider";
import { useEffect, useState } from "react";
import { Album } from "@/src/constants/album";
import CreatePhotoModal from "../createPhotoModal/CreatePhotoModal";
import { PersonCard } from "../../molecules/personCard/PersonCard";
import { getAuthHeaders } from "@/app/utils/requestHeader";
import dynamic from 'next/dynamic';
import StandardHeader from "../../molecules/standardHearder/StandardHeader";
import Button, { ButtonSize, ButtonVariant } from "../../atoms/button/Button";
import Modal from "../../molecules/modal/Modal";
import { usePathname } from "next/navigation";


const Layout = dynamic(() => import('react-masonry-list'), {
  ssr: false,
});

export type AlbumListProps = {
    albumId: string
}

export default function AlbumOrganism({albumId}: AlbumListProps){
    const [album, setAlbum] = useState<Album>()
    const [photos, setPhotos] = useState([])
    const [uploadModalOpen, setUploadModalOpen] = useState(false)
    const [searchModalOpen, setSearchModalOpen] = useState(false)
    const [persons, setPersons] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [hasUploadPermission, setHasUploadPermission] = useState(false);
    const pathName = usePathname()
    
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
        checkUploadPermissions();
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

    const handleSearch = (files:File[]) => {
        const headers = getAuthHeaders();
        const formData = new FormData();

        formData.append("file", files[0]);

        fetch(`http://127.0.0.1:8000/photo/search/${albumId}`, {
            method:"POST", 
            body:formData,
            headers
        })
        .then((res) => res.json())
        .then(res => {
            setSearchResult(res)
            setSearchModalOpen(false)
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    const checkUploadPermissions = async () => {
        const headers = getAuthHeaders();
        const response = await fetch(`http://127.0.0.1:8000/albums/upload/${albumId}`, { headers });
        const data = await response.json();
        if (data.message === "User has necessary permissions") {
            setHasUploadPermission(true);
        } else {
            setHasUploadPermission(false);
        }
    }
    

    return (
        <div>
            {/* Header */}
            <StandardHeader 
                title={album?.title!} 
                mainButtonText={hasUploadPermission ? "Upload" : ""}
                mainButtonIcon={hasUploadPermission ? <IoSettingsOutline/> : null}
                arrowBack={searchResult.length>0}
                onClickArrowButton={()=>setSearchResult([])}
                hasRigthButtons={searchResult.length==0}
                secondaryButtonIcon={<MdOutlineCloudUpload />}
                additionalButton={
                    <Button 
                        text={"Seach"}
                        size={ButtonSize.BIG}
                        variant={ButtonVariant.OUTLINED}
                        onClick={()=>setSearchModalOpen(true)}
                    />
                }
                onClickMainButton={hasUploadPermission ? ()=>setUploadModalOpen(true) : undefined} 
                onClickSecondaryButton={()=> location.assign(`${pathName}/settings`) }
            />

            <Divider />
            {
                !(searchResult.length > 0) ?
                <div>
                    {/* People */}
                    <div className={albumListStyle.peopleSection}>
                        {
                            persons.length > 7 &&
                            <div className={albumListStyle.showAllCaption}>
                                <Text 
                                    text={"Show all people"}
                                    type={TextTypes.CAPTION}
                                    link={`${album?.id}/people`}
                                />
                            </div>
                        }
                       
                        <div className={albumListStyle.personCards}>
                            {persons.map((person:any, index) => {
                                return (
                                    <PersonCard 
                                        key={index} 
                                        person={person.is_named ? person.label : "Unamed"} 
                                        onClick={()=>location.assign(`/albums/${albumId}/person/${person.label}`)}
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
                </div>
                :
                <div>
                    <Layout
                        gap={5}
                        items={
                            searchResult.map((photo:any, index)=>{
                                return (
                                    <div key={index}>
                                        <img  className={albumListStyle.photo} src={photo.image_key}/>
                                    </div>  
                                )
                            })
                        }
                    />
                </div>
            }


            {uploadModalOpen &&
               <CreatePhotoModal 
                    title="Add Photos"
                    search={false}
                    confirmButtonText="Save"
                    onClose={()=> setUploadModalOpen(false)}  
                    onSubmit={handlePhotoAddition}
                />
            }
            {searchModalOpen &&
               <CreatePhotoModal
                    title="Search Face"
                    search={true}
                    description="Insert a photo with that one face you are looking for"
                    confirmButtonText="Search"
                    onClose={()=> setSearchModalOpen(false)} 
                    onSubmit={handleSearch}/>
            }
        </div>
    );
}