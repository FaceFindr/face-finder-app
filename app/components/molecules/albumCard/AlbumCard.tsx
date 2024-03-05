import Text from '../../atoms/text/Text';
import { FaRegCalendar } from "react-icons/fa";
import { FaTag } from "react-icons/fa6";
import albumCardStyle from './albumCardStyle.module.css';
import { ALBUM_VISIBILITY } from '@/src/constants/album';

export type AlbumThumb = {
    id:string
    date: string
    label:string
    visibility:ALBUM_VISIBILITY
}
export default function AlbumCard({id, date, label, visibility}: AlbumThumb){
    return (
        <div className={albumCardStyle.cardContainer}>
            <div className={albumCardStyle.albumThumb} onClick={()=>window.location.assign(`/albums/${id}`)}>
            </div>
            
            <div className={albumCardStyle.albumDescription}>
                <div className={albumCardStyle.albumDescriptionCell}>
                    <FaRegCalendar/>
                    <Text text={date}/>
                </div>
                <div className={albumCardStyle.albumDescriptionCell}>
                    <FaTag/>
                    <Text text={label}/>
                </div>
                <div className={albumCardStyle.albumDescriptionCell}>
                    <Text text={visibility}/>
                </div>
            </div>
        </div>
    );
}