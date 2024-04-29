import { Album } from "@/src/constants/album";
import Button, { ButtonSize, ButtonVariant } from "../../atoms/button/Button";
import Input from "../../atoms/input/Input";
import Text from "../../atoms/text/Text";
import albumSettingsStyle from './albumSettingsStyle.module.css'

export type AlbumSettingsProps = {
    albumData: Album
    onCancel:()=>void
    onSubmit:(params:any)=>void
}
export default function AlbumSettings({albumData, onCancel,onSubmit }:AlbumSettingsProps){
    console.log(albumData)
    return(
            <form className={albumSettingsStyle.createForm} onSubmit={onSubmit} method="POST">
                <Input name="title" placeholder="Album Title" value={albumData.title}/>
                <Input name="description" placeholder="Description" value={albumData.description}/>
                <Input name="label" placeholder="Label" value={albumData.label}/>
                <Input name="participants" placeholder="Participants"/>
                <div className={albumSettingsStyle.checkboxContainer}>
                    <input type="checkbox" name="isPublic" className={albumSettingsStyle.checkbox}/>
                    <Text text="This is a public album"/>
                </div> 
                <div className={albumSettingsStyle.formFooter}>
                    <Button
                        text='Cancel' 
                        size={ButtonSize.MEDIUM} 
                        onClick={onCancel}
                    />
                    <Button 
                        text='Save' 
                        variant={ButtonVariant.SAVE} 
                        size={ButtonSize.MEDIUM}
                        type="submit"
                    />
                </div>
        </form>
    )
}