'use client'
import Divider from "@/app/components/atoms/divider/Divider";
import StandardHeader from "@/app/components/molecules/standardHearder/StandardHeader";
import AlbumList from "@/app/components/organisms/album/AlbumOrganism";
import { getAuthHeaders } from "@/app/utils/requestHeader";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import personStyle from './personPageSyle.module.css'
import { useEffect, useRef, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import Text, { TextTypes } from "@/app/components/atoms/text/Text";
import { MdEdit } from "react-icons/md";
import Input from "@/app/components/atoms/input/Input";
import { FcCancel } from "react-icons/fc";
import { FaCheck } from "react-icons/fa";

const Layout = dynamic(() => import('react-masonry-list'), {
    ssr: false,
  });
  
export default function PersonPage(){
    const pathName = usePathname()
    const [photos, setPhotos] = useState([])
    const [person, setPerson] = useState()
    const [personLabel, setPersonLabel] = useState()
    const [isEditingLabel, setIsEditingLabel] = useState(false)
    const headers = getAuthHeaders()

    useEffect(()=>{
        const initialPersonLabel =  pathName.split("/")[4]
        fetch(`http://127.0.0.1:8000/photo/person/${initialPersonLabel}`, { headers })
        .then((res) => res.json())
        .then((data) => setPhotos(data))
        .catch((error)=> console.log(error))

        
        fetch(`http://127.0.0.1:8000/person/info/${initialPersonLabel}`, { headers })
        .then((res) => res.json())
        .then((data) => 
            setPerson(data)

        )
        .catch((error)=> console.log(error))
    }, [])

    const handleLabelUpdate = () => {
        const data = {
            newLabel: personLabel, 
            oldLabel: person!.label
        }
        fetch(`http://127.0.0.1:8000/person/edit/`, {
            method:"POST", 
            body: JSON.stringify({newLabel: personLabel, oldLabel: person.label}),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((res) => {
            setIsEditingLabel(false)
            setPerson({...person, label: personLabel, is_named: true})
            return res.json();
        }).catch((error)=>{ 
            console.log(error)
        })
    }

    return (
        <div>
            <div className={personStyle.header}>
                <div style={{display:"flex"}}>
                    <IoMdArrowBack
                        cursor={"pointer"}
                        fontSize={"50px"}
                        color="#08263b"
                        onClick={()=>history.back()}
                    />
                    
                    <div className={personStyle.personLabelDiv}>
                        {
                            !isEditingLabel ?
                                <Text
                                    text={!person?.is_named ? "Unamed" : person?.label} 
                                    type={TextTypes.HEADER}
                                    color="main-blue"
                                /> 
                            : <Input 
                                name={"label"}
                                placeholder={(!person?.isNamed ? "Unamed" : person?.label) ?? ""} 
                                onChange={({target}) => setPersonLabel(target.value)}
                            />
                        }
                        <div className={personStyle.actionButtons}>
                            {isEditingLabel &&  <FaCheck onClick={handleLabelUpdate}/>}
                            {!isEditingLabel && <MdEdit onClick={()=>setIsEditingLabel(true)}/>}
                            {isEditingLabel &&  <FcCancel onClick={()=>setIsEditingLabel(false)} className={personStyle.cancelButton}/>}
                        </div>
                    </div>

                </div>

                <div className={personStyle.thumb}>
                    <img className={personStyle.thumb} src={person?.thumbnail_key ?? ""}/>
                </div>
            </div>

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