'use client'
import Button, { ButtonSize, ButtonVariant } from "@/app/components/atoms/button/Button";
import Input from "@/app/components/atoms/input/Input";
import signUpStyle from "./signUpStyle.module.css"
import baseAuthStyle from "../baseAuthStyle.module.css"
import Text, { TextTypes } from "@/app/components/atoms/text/Text";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import Link from "next/link";

export default function SignUp(){
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className={baseAuthStyle.pageContainer}>

            <form className={baseAuthStyle.formContainer} method="post">
                <div className={signUpStyle.headersContainer}>
                    <Text text="Create an account"  type={TextTypes.HEADER}/>
                    <Text text="Let's get started!"  />
                </div>

                <div className={baseAuthStyle.inputs}>
                    <Input placeholder="Name" name="text" required/>
                    <Input placeholder="Email" name="email" required/>
                    <Input 
                        placeholder="Password" 
                        name="password" 
                        type={showPassword?"text": "password"} 
                        required
                        icon={
                            showPassword?
                            <AiFillEye 
                                className={signUpStyle.passIcon}
                                onClick={()=>setShowPassword(!showPassword)}
                            />
                            :
                            <AiFillEyeInvisible 
                                className={signUpStyle.passIcon}
                                onClick={()=>setShowPassword(!showPassword)}
                            />
                        }
                    />
                    
                </div>
                
                <div>
                    <div className={signUpStyle.buttonsContainer}>
                        <Button text="Sign up" type="submit" size={ButtonSize.FULL}/>
                        <Button text="Continue with email" size={ButtonSize.FULL} variant={ButtonVariant.OUTLINED}/>   
                    </div>
                    <div style={{marginTop:"10px"}}>
                        <Text text="Already have an account?" type={TextTypes.CAPTION} />
                        <Link href="logIn"><Text text=" Log in" type={TextTypes.CAPTION}/></Link> 
                    </div>
                </div>

            </form>
            
        </div>

    );
}