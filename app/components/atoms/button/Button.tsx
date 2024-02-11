import buttonStyle from './buttonStyle.module.css'
import { ReactNode } from "react";


type ButtonProps={
    text: string;
    size?: ButtonSize;
    variant?: ButtonVariant;
    icon?: ReactNode;
    type?: ("submit" | "reset" | "button")
}

export enum ButtonSize {
    SMALL, 
    MEDIUM, 
    BIG, 
    FULL, 
}

export enum ButtonVariant {
    CONTAINED, 
    OUTLINED
}

export default function Button({
    text, 
    size = ButtonSize.MEDIUM, 
    variant= ButtonVariant.CONTAINED, 
    icon, 
    type
    }:ButtonProps){


    const btnSize =()=>{
        switch (size) {
            case ButtonSize.SMALL:
                return buttonStyle.btnSmall;
            case ButtonSize.MEDIUM:
                return buttonStyle.btnMedium;
            case ButtonSize.FULL:
                return buttonStyle.btnFull;
            default:
                return buttonStyle.btnBig;
        }
    }

    const btnVariant =()=>{
        switch (variant) {
            case ButtonVariant.CONTAINED:
                return buttonStyle.btnContained;
            default:
                return buttonStyle.btnOutlined;
        }
    }

    const buttonClasses =()=>{
        const sizeClass = btnSize();
        const variantClass = btnVariant();
    
        return `${buttonStyle.btnBase} ${sizeClass} ${variantClass}`
    }

    return (
        <button 
            className={buttonClasses()}
            type= {type}
        >
            {text}
            {icon}
        </button>
    );
}