import Button, { ButtonSize } from "../components/atoms/button/Button";
import Divider from "../components/atoms/divider/Divider";
import Text, { TextTypes } from "../components/atoms/text/Text";
import AlbumCard from "../components/molecules/albumCard/AlbumCard";
import albumsPageStyle from './albumsPageStyle.module.css';
import { MdOutlineCloudUpload } from "react-icons/md";

export default function AlbumsPage(){
    const mock = [1, 2, 3, 4,5 ,6 ,7 ,8 ,9, 10]
    return (
        <div>
            <div className={albumsPageStyle.pageHeader}>
                <Text text="My Albums" type={TextTypes.HEADER}/>
                <Button text="Upload" 
                    size={ButtonSize.MEDIUM} 
                    icon={<MdOutlineCloudUpload className={albumsPageStyle.buttonIcon} />}
                />
            </div>
            <Divider />
            <div className={albumsPageStyle.albumsContainer}>
                {mock.map(album =>{
                    return <AlbumCard/>
                })}
            </div>
           
        </div>
    );
}