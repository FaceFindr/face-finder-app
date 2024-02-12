import Text, { TextTypes } from '../../atoms/text/Text'
import navBarStyle from './navBarStyle.module.css'
export default function NavBar(){
    return(
        <div className={navBarStyle.navContainer}>
            <Text text='FaceFindr.' type={TextTypes.HEADER}/>
        </div>
    )
}