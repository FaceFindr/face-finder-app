import Text from '../../atoms/text/Text';
import { FaRegCalendar } from "react-icons/fa";
import { FaTag } from "react-icons/fa6";
import albumCardStyle from './albumCardStyle.module.css';

export default function AlbumCard(){
    return (
        <div className={albumCardStyle.cardContainer}>
            <div className={albumCardStyle.image}>
                image
            </div>
            <div className={albumCardStyle.description}>
                <div>
                    <Text text='Album name'/>
                </div>
                <div className={albumCardStyle.descriptionCaption}>
                    <div className={albumCardStyle.iconLabel} >
                        <FaRegCalendar />
                        <Text text='Date'/>
                    </div>
                    <div className={albumCardStyle.iconLabel}>
                        <FaTag />
                        <Text text='Label'/>
                    </div>
                    <div className={albumCardStyle.iconLabel}>
                        <Text text='Visibility'/>
                    </div>
                   
                    
                </div>
            </div>
        </div>
    );
}