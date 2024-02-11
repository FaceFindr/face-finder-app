'use client'
import Button, { ButtonSize } from "@/app/components/atoms/button/Button";
import Input from "@/app/components/atoms/input/Input";
import loginStyle from "./loginStyle.module.css";
import baseAuthStyle from "../baseAuthStyle.module.css"
import Text, { TextTypes } from "@/app/components/atoms/text/Text";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import Link from "next/link";

export default function LogIn(){
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className={baseAuthStyle.pageContainer}>

            <form className={baseAuthStyle.formContainer} method="post">
                <Text text="Log in"  type={TextTypes.HEADER}/>

                <div className={baseAuthStyle.inputs}>
                    <Input placeholder="Email" name="email" required/>

                    <div>
                        <Input 
                            placeholder="Password" 
                            name="password" 
                            type={showPassword?"text": "password"} 
                            required
                            icon={
                                showPassword?
                                <AiFillEye 
                                    className={loginStyle.passIcon}
                                    onClick={()=>setShowPassword(!showPassword)}
                                />
                                :
                                <AiFillEyeInvisible 
                                    className={loginStyle.passIcon}
                                    onClick={()=>setShowPassword(!showPassword)}
                                />
                            }
                        />
                        <a href="" ><Text text="Forgot your password?" type={TextTypes.CAPTION}/></a> 
                    </div>
                </div>

                <Button text="Login" type="submit" size={ButtonSize.FULL}/>

                <div className={loginStyle.createAccountDiv}>
                    <Text text="Don't have an account?" type={TextTypes.CAPTION} />
                    <Link href="signUp"><Text text="Create an account" type={TextTypes.CAPTION}/></Link> 
                </div>

            </form>
            
        </div>

    );
}