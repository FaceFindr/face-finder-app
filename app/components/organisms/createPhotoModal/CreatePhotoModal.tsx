'use client'
import { useState } from "react";
import Button, { ButtonSize, ButtonVariant } from "../../atoms/button/Button";
import FileUpload from "../../molecules/fileUpload/fileUpload";
import createPhotoModalStyle from './createPhotoModalStyle.module.css'
import Text from "../../atoms/text/Text";
import { IoIosClose } from "react-icons/io";
import Modal from "../../molecules/modal/Modal";

export type CreatePhotoModalProps = {
    onClose:()=>void,
    onSubmit:(files:File[])=>void
}
export default function CreatePhotoModal({onClose, onSubmit}: CreatePhotoModalProps){
    const [uploadedFiles, setUploadedFiles] = useState([]);


    const removeFile = (name:string) => {
        setUploadedFiles(uploadedFiles.filter((file: File) =>  file.name !== name))
    }

    return (
        <Modal 
            title="Add Photos" 
            onClose={onClose}
            content=
            {
                <div className={createPhotoModalStyle.photoModalContainer}>
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

                    <div className={createPhotoModalStyle.footerButtons}>
                        <Button 
                            text='Cancel' 
                            size={ButtonSize.MEDIUM} 
                            onClick={onClose}
                        />
                        <Button 
                            text='Save' 
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