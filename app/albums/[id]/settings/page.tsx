'use client'
import Input from "@/app/components/atoms/input/Input";
import settingsStyle from './settingsStyle.module.css'
import Text, { TextTypes } from "@/app/components/atoms/text/Text";
import { MdEdit } from "react-icons/md";
import Button, { ButtonSize, ButtonVariant } from "@/app/components/atoms/button/Button";
import { IoMdArrowBack } from "react-icons/io";
import Modal from "@/app/components/molecules/modal/Modal";
import { use, useEffect, useState } from "react";
import MultiEmailInput from "@/app/components/molecules/multiEmail/MultiEmailInput";
import { getAuthHeaders } from "@/app/utils/requestHeader";
import { usePathname } from "next/navigation";

export default function AlbumSettingsPage() {
    const pathName = usePathname()
    const [album, setAlbum] = useState()
    const [modalOpen, setModalOpen] = useState(false)
    const [colaborators, setColaborators] = useState([])
    const [emails, setEmails] = useState([])
    const [role, setRole] = useState('participant')
    const headers = getAuthHeaders();
    
    useEffect(()=>{          
        getCollaborators()

        fetch(`http://127.0.0.1:8000/albums/${pathName.split("/")[2]}`, { headers })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data)
            setAlbum(data);
        }).catch((error)=>{
            console.log(error)
        })
    },[])

    const handleAddCollaborator = () => {
        const data = {
            emails: emails,
            role: role
        }
        fetch(`http:///127.0.0.1:8000/albums/${pathName.split("/")[2]}/permissions`, {
            method:"POST", 
            body: JSON.stringify(data),
            headers
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data)
            getCollaborators()
            setModalOpen(false)
        }).catch((error)=>{
            console.log(error)
        })
    }

    const getCollaborators = ()=>{
        fetch(`http:///127.0.0.1:8000/albums/${pathName.split("/")[2]}/permissions`, { headers })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            setColaborators(data);
        }).catch((error)=>{
            console.log(error)
        })
    }
    return(
       <div className={settingsStyle.pageContainer}>
            <IoMdArrowBack
                cursor={"pointer"}
                fontSize={"50px"}
                color="#08263b"
                onClick={()=>history.back()}
            />
            <div className={settingsStyle.block1}>
                <div className={settingsStyle.thumb}>
                        <MdEdit className={settingsStyle.editIcon}/>
                </div>
                
                <div className={settingsStyle.inputsContainer}>
                    <Text text={"Album settings"} type={TextTypes.HEADER} color="main-blue" />
                    <Input name="title" placeholder={album?.title} disabled/>
                    <Input name="description" placeholder={album?.description} disabled/>
                    <Input name="label" placeholder={album?.label} disabled/>
                    
                    <div className={settingsStyle.block1Buttons}>
                        <div className={settingsStyle.checkboxContainer}>
                            <input type="checkbox" checked={album?.isPublic} disabled name="isPublic" style={{width: "18px",height: "18px",cursor:"pointer"}} />
                            <Text text="This is a public album"/>
                        </div> 
                        <Button text="Add Collaborators" onClick={()=>setModalOpen(true)}/>
                    </div>
                </div>
            </div>
            <div>
            <Text text={"Collaborators"} type={TextTypes.HEADER} color="main-blue"/>
            <div className={settingsStyle.colaboratorsDiv}>
                {
                    colaborators?.map(colaborator => {
                        return <div>
                             <Text text={`${colaborator.user_name}`} type={TextTypes.TEXT} color="main-blue"/>
                             <Text text={` - `} type={TextTypes.CAPTION} color="gray"/>
                             <Text text={`${colaborator.role.toUpperCase()}`} type={TextTypes.CAPTION} color="gray"  />
                        </div>
                       
                    })
                }
            </div>
            </div>
            {
                modalOpen &&
                <Modal title={"Add Collaborators"} 
                    content={
                        <div style={{width:"100%"}}>
                            <div className={settingsStyle.emailsDiv}>
                                <MultiEmailInput emails={emails} onChange={(event)=>{setEmails(event)}}/>
                            </div>  
                            <div className={settingsStyle.selectRoleDiv}>
                                <Text text="Role" type={TextTypes.SUBHEADER}  color="main-blue"/>
                                <select required className={settingsStyle.selectField} onInput={(event)=>setRole(event.target.value)}>
                                    <option value="participant">PARTICIPANT</option>
                                    <option value="photographer">PHOTOGRAPHER</option>
                                    <option value="admin">ADMIN</option>
                                </select>
                            </div>
                            <div className={settingsStyle.footerButtons}>
                                <Button 
                                    text='Cancel' 
                                    size={ButtonSize.MEDIUM} 
                                    onClick={()=>{
                                        setModalOpen(false)
                                        setEmails([])
                                        setRole(undefined)
                                    }}
                                />
                                <Button 
                                    text={"Add"} 
                                    variant={ButtonVariant.SAVE} 
                                    size={ButtonSize.MEDIUM}
                                    type="submit"
                                    onClick={handleAddCollaborator}
                                />
                            </div>                          
                        </div>

                    }
                    onClose={()=>{setModalOpen(false)}}/>
            }
            
       </div>
    )
}