'use client'
import { useState } from "react";
import Button, { ButtonSize, ButtonVariant } from "../../atoms/button/Button";
import FileUpload from "../../molecules/fileUpload/fileUpload";
import createPhotoModalStyle from './createPhotoModalStyle.module.css'
import Text from "../../atoms/text/Text";
import { IoIosClose } from "react-icons/io";
import Modal from "../../molecules/modal/Modal";

export type CreatePhotoModalProps = {
    title: string
    description?: string
    confirmButtonText: string
    onClose:()=>void,
    onSubmit:(files:File[])=>void
}
export default function CreatePhotoModal({title, description, confirmButtonText, onClose, onSubmit}: CreatePhotoModalProps){
    const [uploadedFiles, setUploadedFiles] = useState([]);


    const removeFile = (name:string) => {
        setUploadedFiles(uploadedFiles.filter((file: File) =>  file.name !== name))
    }

    return (
        <Modal 
            title={title}
            onClose={onClose}
            description={description}
            content=
            {
                <div className={createPhotoModalStyle.photoModalContainer}>
                    <div className={createPhotoModalStyle.list}>
                        {
                            !uploadedFiles.length ? 
                                <div className={createPhotoModalStyle.dropZone}>
                                    <FileUpload onUpload={(files)=>setUploadedFiles(files)}/>
                                </div>
                            : 
                                <div className={createPhotoModalStyle.fileList} >
                                    {uploadedFiles.map((file: File) =>{
                                        return(
                                            <div className={createPhotoModalStyle.listedFile} key={file.name}>
                                                <Text text={file.name}/>
                                                <IoIosClose 
                                                    style={{width:'20px', height:'20px', cursor:'pointer'}} 
                                                    onClick={() => removeFile(file.name)}
                                                />
                                            </div>
                                        )  
                                    })}
                                </div>
                        }
                    </div>
                    <div className={createPhotoModalStyle.footerButtons}>
                        <Button 
                            text='Cancel' 
                            size={ButtonSize.MEDIUM} 
                            onClick={onClose}
                        />
                        <Button 
                            text={confirmButtonText} 
                            variant={ButtonVariant.SAVE} 
                            size={ButtonSize.MEDIUM}
                            type="submit"
                            onClick={()=>onSubmit(uploadedFiles)}
                        />
                    </div>
                </div>
            }
        
        />
        
    );
}