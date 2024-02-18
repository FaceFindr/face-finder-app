import { ReactMultiEmail } from "react-multi-email";
import Text from "../../atoms/text/Text";

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
                        <div data-tag key={index}>
                        <div data-tag-item>{email}</div>
                        <span data-tag-handle onClick={() => removeEmail(index)}>
                            ×
                        </span>
                        </div>
                    );
                }}
            />
        </div>
       
    );
}