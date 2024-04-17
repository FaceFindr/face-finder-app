import Text, { TextTypes } from "../../atoms/text/Text";
import peopleListStyle from './peopleListStyle.module.css'
import { PersonCard } from "../../molecules/personCard/PersonCard";

export default function PeopleList(){
    const allPeople = [1, 2, 3, 4,5, 6, 7, 8, 9, 10]
    return (
        <div>
            <div>
                <Text 
                    text={"All people"} 
                    type={TextTypes.HEADER}
                    color="#08263b"
                />
            </div>
            <div className={peopleListStyle.peopleListDiv}>
                {
                    allPeople.map(person => {
                        return (
                           <PersonCard /> 
                        )
                    })
                }
            </div>
        </div>
    )
}