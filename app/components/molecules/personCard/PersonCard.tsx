import Text, { TextTypes } from '../../atoms/text/Text'
import personCardStyle from './personCardStyle.module.css'

interface PersonCardProps {
    person: string;
    thumbnail: string;
}

export function PersonCard({ person, thumbnail }: PersonCardProps){
    return (
        <div className={personCardStyle.card}>
            <div className={personCardStyle.personThumb} style={{ backgroundImage: `url(${thumbnail})`, backgroundRepeat: 'no-repeat', display : 'flex', backgroundSize: 'cover' }}>
            </div>
            <div className={personCardStyle.personName}>
                <Text 
                    text={person} 
                    color="#08263b" 
                    fontSize='18px'
                />
            </div>
        </div>
    )
}