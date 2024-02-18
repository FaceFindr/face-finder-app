import { useState } from "react";
import FileUpload from "../../molecules/fileUpload/fileUpload";
import createAlbumStyle from "./createAlbumStyle.module.css"
import Input from "../../atoms/input/Input";
import Text from "../../atoms/text/Text";
import { ReactMultiEmail } from "react-multi-email";
import MultiEmailInput from "../../molecules/multiEmail/MultiEmailInput";


export default function CreateAlbumForm(){
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [supervisors, setSupervisors] = useState<string[]>([]);

    return(
        <>
            {
                uploadedFiles.length ?
                <div className={createAlbumStyle.createForm}>
                    <Input name="albumName" placeholder="Album name"/>

                    <MultiEmailInput
                        title="Supervisors"
                        emails={supervisors}
                        onChange={setSupervisors}
                    />
                    
    

                    <Text text="Participants: "/>
                </div>
                : <FileUpload onUpload={setUploadedFiles}/>
            }
         </>
    );
}