import Button, { ButtonSize, ButtonVariant } from "../../atoms/button/Button"
import Text, { TextTypes } from "../../atoms/text/Text"
import standardHeaderSyle from './standardHeaderStyle.module.css'
import { ReactNode } from "react"

type StandartHeaderProps = {
    title:string
    mainButtonText:string
    mainButtonIcon?: ReactNode
    secondaryButtonIcon: ReactNode
    onClickMainButton: () => void;
    onClickSecondaryButton: () => void;
}
export default function StandartHeader({
    title, 
    mainButtonText,
    mainButtonIcon,
    secondaryButtonIcon,
    onClickMainButton,
    onClickSecondaryButton
}:StandartHeaderProps){

    return (
        <div className={standardHeaderSyle.headerContainer}>
                <div className={standardHeaderSyle.titleContainer}>
                    <Text
                        text={title} 
                        type={TextTypes.HEADER}
                        color="main-blue"
                    />
                </div>
                <div className={standardHeaderSyle.headerButtons}>
                    <Button 
                        size={ButtonSize.SMALL}  
                        variant={ButtonVariant.OUTLINED}
                        icon={mainButtonIcon}
                        onClick={onClickSecondaryButton}
                    />
                    <Button 
                        text={mainButtonText}
                        size={ButtonSize.BIG}
                        icon={secondaryButtonIcon}
                        onClick={onClickMainButton}
                    />
                </div>
        </div>
    )
}