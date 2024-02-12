import Button, { ButtonSize, ButtonVariant } from "../components/atoms/button/Button";
import Divider from "../components/atoms/divider/Divider";
import Text, { TextTypes } from "../components/atoms/text/Text";
import { IoFilter } from "react-icons/io5";
import AlbumCard from "../components/molecules/albumCard/AlbumCard";
import albumsPageStyle from './albumsPageStyle.module.css';
import { MdOutlineCloudUpload } from "react-icons/md";
import { ALBUM_VISIBILITY } from "@/src/constants/album";


export default function AlbumsPage(){
    const mock = [
        {
            id:"1",
            date: "10/10/10",
            label:"Birthday",
            visibility:ALBUM_VISIBILITY.PRIVATE
        },
        {
            id:"2",
            date: "10/10/10",
            label:"Birthday",
            visibility:ALBUM_VISIBILITY.PRIVATE
        },
        {
            id:"3",
            date: "10/10/10",
            label:"Birthday",
            visibility:ALBUM_VISIBILITY.PRIVATE
        },
        {
            id:"4",
            date: "10/10/10",
            label:"Birthday",
            visibility:ALBUM_VISIBILITY.PRIVATE
        },
        {
            id:"5",
            date: "10/10/10",
            label:"Birthday",
            visibility:ALBUM_VISIBILITY.PRIVATE
        },
        {
            id:"6",
            date: "10/10/10",
            label:"Birthday",
            visibility:ALBUM_VISIBILITY.PRIVATE
        },
        {
            id:"7",
            date: "10/10/10",
            label:"Birthday",
            visibility:ALBUM_VISIBILITY.PRIVATE
        },
        {
            id:"8",
            date: "10/10/10",
            label:"Birthday",
            visibility:ALBUM_VISIBILITY.PRIVATE
        }
    ]

    return (
        <div>
            <div className={albumsPageStyle.pageHeader}>
                <Text text="My Albums" type={TextTypes.HEADER}/>

                <div className={albumsPageStyle.pageHeaderButtons} >
                    <Button text="" 
                        size={ButtonSize.SMALL}  
                        variant={ButtonVariant.OUTLINED}
                        icon={
                            <IoFilter className={albumsPageStyle.iconFilter} />
                        }
                    />
                    <Button text="Upload" 
                        size={ButtonSize.MEDIUM} 
                        icon={<MdOutlineCloudUpload className={albumsPageStyle.buttonIcon} />}
                    />
                </div>

            </div>
            <Divider />
            <div className={albumsPageStyle.albumsContainer}>
                {mock.map(album =>{
                    return <AlbumCard 
                            key={album.id}
                            date={album.date} 
                            label={album.label}
                            visibility={album.visibility}
                        />
                })}
            </div>
           
        </div>
    );
}