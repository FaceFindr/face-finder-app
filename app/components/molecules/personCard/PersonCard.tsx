import Text, { TextTypes } from '../../atoms/text/Text'
import personCardStyle from './personCardStyle.module.css'
export function PersonCard(){
    return (
        <div className={personCardStyle.card}>
            <div className={personCardStyle.personThumb}>
            </div>
            <div className={personCardStyle.personName}>
                <Text 
                    text="Nome da person" 
                    color="#08263b" 
                    fontSize='18px'
                />
            </div>
        </div>
    )
}