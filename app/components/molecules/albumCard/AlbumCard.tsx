import Text, { TextTypes } from '../../atoms/text/Text';
import { FaRegCalendar } from "react-icons/fa";
import { FaTag } from "react-icons/fa6";
import albumCardStyle from './albumCardStyle.module.css';
import { ALBUM_VISIBILITY } from '@/src/constants/album';

export type AlbumCardProps = {
    id:string
    title: string
    showLabel: boolean
    ownerName?:string
    label?:string
}
export default function AlbumCard({id, showLabel, title, ownerName, label}: AlbumCardProps){
    return (
        <div className={albumCardStyle.cardContainer} onClick={() => window.location.assign(`albums/${id}`)}>
            <div className={albumCardStyle.albumThumb}>
            </div>

            <div className={albumCardStyle.albumDescription}>
                <Text 
                    text={title} 
                    color="main-blue" 
                    fontSize='20px'
                />
                <Text 
                    text={!showLabel ? `By ${ownerName}` : label ?? "" } 
                    color="main-blue" 
                    type={TextTypes.CAPTION} 
                />
            </div>
        </div>
    );
}