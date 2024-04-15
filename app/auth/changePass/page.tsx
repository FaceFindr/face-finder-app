'use client'
import Button, { ButtonSize, ButtonVariant } from "@/app/components/atoms/button/Button";
import Input from "@/app/components/atoms/input/Input";
import changePassStyle from "./changePassStyle.module.css";
import baseAuthStyle from "../baseAuthStyle.module.css"
import Text, { TextTypes } from "@/app/components/atoms/text/Text";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function forgot(){
    const [showPassword, setShowPassword] = useState(false)


    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const email = formData.get('email');
        const password = formData.get('password');
     
    
        const response = await fetch('http://127.0.0.1:8000/auth/changePass', { //change password
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
    
        if (response.ok) {
            console.log('password changed successfully');            
            window.location.replace("/albums")
        } else {
            const data = await response.json();
            if (data.error === "This user does not exist") {
                alert("This user does not exist");
            } else {
                console.error('Error changing password: ');
            }
        }
    }
    return (
        <div className={baseAuthStyle.pageContainer} >

            <form className={baseAuthStyle.formContainer} method="post" onSubmit={handleSubmit}>
                <Text text="Set New Password"  type={TextTypes.HEADER}/>

                <div>
                        <Input 
                            placeholder="New Password" 
                            name="new_password" 
                            type={showPassword?"text": "new_password"} 
                            required
                            icon={
                                showPassword?
                                <AiFillEye 
                                    className={changePassStyle.passIcon}
                                    onClick={()=>setShowPassword(!showPassword)}
                                />
                                :
                                <AiFillEyeInvisible 
                                    className={changePassStyle.passIcon}
                                    onClick={()=>setShowPassword(!showPassword)}
                                />
                            }
                        />
                </div>

                <div>
                        <Input 
                            placeholder="Repeat New Password" 
                            name="repeat_password" 
                            type={showPassword?"text": "repeat_password"} 
                            required
                            icon={
                                showPassword?
                                <AiFillEye 
                                    className={changePassStyle.passIcon}
                                    onClick={()=>setShowPassword(!showPassword)}
                                />
                                :
                                <AiFillEyeInvisible 
                                    className={changePassStyle.passIcon}
                                    onClick={()=>setShowPassword(!showPassword)}
                                />
                            }
                        />
                </div>

                <Button text="Change Password" type="submit" size={ButtonSize.FULL}/>

            </form>
            
        </div>

    );
}