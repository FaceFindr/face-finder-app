'use client'
import Input from "@/app/components/atoms/input/Input";
import settingsStyle from './settingsStyle.module.css'
import Text, { TextTypes } from "@/app/components/atoms/text/Text";
import { MdEdit } from "react-icons/md";
import Button from "@/app/components/atoms/button/Button";
import { IoMdArrowBack } from "react-icons/io";
import Modal from "@/app/components/molecules/modal/Modal";
import { use, useEffect, useState } from "react";
import MultiEmailInput from "@/app/components/molecules/multiEmail/MultiEmailInput";
import { getAuthHeaders } from "@/app/utils/requestHeader";
import { usePathname } from "next/navigation";

export default function AlbumSettingsPage() {
    const pathName = usePathname()
    const [modalOpen, setModalOpen] = useState(false)
    const [colaborators, setColaborators] = useState([])
    useEffect(()=>{
        const headers = getAuthHeaders();
          
        fetch(`http:///127.0.0.1:8000/albums/${pathName.split("/")[2]}/permissions`, { headers })

        .then((res) => {
            return res.json();
        })
        .then((data) => {
            setColaborators(data);
        }).catch((error)=>{
            console.log(error)
        })

    },[]
    )
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
                    <Text text={"Album settings"} type={TextTypes.HEADER} color="main-blue"/>
                    <Input name="name" placeholder="Album Name"/>
                    <Input name="Description" placeholder="Description"/>
                    <Input name="name" placeholder="Album Name"/>
                    
                    <div className={settingsStyle.block1Buttons}>
                        <div className={settingsStyle.checkboxContainer}>
                            <input type="checkbox" name="isPublic" style={{width: "18px",height: "18px",cursor:"pointer"}} />
                            <Text text="This is a public album"/>
                        </div> 
                        <Button text="Add Collaborators" onClick={()=>setModalOpen(true)}/>
                    </div>
                </div>
            </div>
            <div>
            <Text text={"Collaborators"} type={TextTypes.HEADER} color="main-blue"/>
            </div>
            {
                modalOpen &&
                <Modal title={"Add Collaborators"} 
                    content={
                        <div style={{width:"100%"}}>
                            <div className={settingsStyle.emailsDiv}>
                                <MultiEmailInput title={""} emails={[]} onChange={()=>{}}/>
                            </div>  
                            <div>
                                <Text text="Role" type={TextTypes.SUBHEADER}  color="main-blue"/>
                                <div className={settingsStyle.checkboxContainer}>
                                    <input type="checkbox" name="viewer" style={{width: "18px",height: "18px",cursor:"pointer"}} />
                                    <Text text="Viewer"/>
                                </div> 
                                <div className={settingsStyle.checkboxContainer}>
                                    <input type="checkbox" name="phptographer" style={{width: "18px",height: "18px",cursor:"pointer"}} />
                                    <Text text="Photographer"/>
                                </div> 
                                <div className={settingsStyle.checkboxContainer}>
                                    <input type="checkbox" name="admin" style={{width: "18px",height: "18px",cursor:"pointer"}} />
                                    <Text text="Admin"/>
                                </div> 
                            </div>                          
                        </div>

                    }
                    onClose={()=>{setModalOpen(false)}}/>
            }
            
       </div>
    )
}