import { ReactMultiEmail } from "react-multi-email";
import Text from "../../atoms/text/Text";
import multiEmailStyle from './multiEmailStyle.module.css'
import { FaRegTrashAlt } from "react-icons/fa";
type MultiEmailInputProps = {
    title: string
    emails: string[]
    onChange: (email:string[])=>void;
}
export default function MultiEmailInput({title, emails, onChange}:MultiEmailInputProps){
    return(
        <div>
            <Text text={title}/>
            <ReactMultiEmail 
                emails={emails}
                onChange={(_emails: string[]) => onChange(_emails)}
                getLabel={(email, index, removeEmail) => {
                    return (
                        <div >
                            <div data-tag key={index} >
                                <div data-tag-item className={multiEmailStyle.test}>
                                    {email}
                                    <span data-tag-handle className={multiEmailStyle.removeIcon} onClick={() => removeEmail(index)}>
                                        <FaRegTrashAlt />
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                    );
                }}
            />
        </div>
       
    );
}