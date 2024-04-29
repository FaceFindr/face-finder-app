'use client'
import Divider from "@/app/components/atoms/divider/Divider";
import StandardHeader from "@/app/components/molecules/standardHearder/StandardHeader";
import AlbumList from "@/app/components/organisms/album/AlbumOrganism";
import { getAuthHeaders } from "@/app/utils/requestHeader";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Layout = dynamic(() => import('react-masonry-list'), {
    ssr: false,
  });
  
export default function PersonPage(){
    const pathName = usePathname()
    const [photos, setPhotos] = useState([])

    useEffect(()=>{
        const headers = getAuthHeaders();
        fetch(`http://127.0.0.1:8000/photo/person/${pathName.split("/")[4]}`, { headers })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            setPhotos(data);
        }).catch((error)=>{
            console.log(error)
        })
    }, [])

    return (
        <div>
            <StandardHeader 
                title={pathName.split("/")[4]}
                arrowBack={true}
                hasRigthButtons={false}           
            />
            <Divider />

            {/* Photos */}
            <Layout
                gap={5}
                items={
                    photos.map((photo:any, index)=>{
                        return (
                            <div key={index}>
                                <img style={{objectFit:"contain", maxWidth:"100%"}} src={photo.image_key}/>
                            </div>  
                        )
                    })
                }
            />
        </div>
    )
}