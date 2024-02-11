import textStyle from './textStyle.module.css'

export type TextProps = {
    text:string;
    type?: TextTypes
}

export enum TextTypes{
    HEADER,
    TEXT, 
    CAPTION
}

export default function Text({text, type}:TextProps){
    const getTypeClass=()=>{
        switch (type) {
            case TextTypes.HEADER:
                return textStyle.header;
            case TextTypes.CAPTION:
                return textStyle.caption;
            default:
                return textStyle.text;
        }
    }

    const textClasses =()=>{
        const typeClass = getTypeClass();

        return `${typeClass}`
    }

    return (
        <span className={textClasses()}>
            {text}
        </span>
    );
}