'use client'
import Button, { ButtonSize } from "@/app/components/atoms/button/Button";
import Input from "@/app/components/atoms/input/Input";
import loginStyle from "./loginStyle.module.css";
import baseAuthStyle from "../baseAuthStyle.module.css"
import Text, { TextTypes } from "@/app/components/atoms/text/Text";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LogIn(){
    const [showPassword, setShowPassword] = useState(false)


    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const email = formData.get('email');
        const password = formData.get('password');
     
    
        const response = await fetch('http://127.0.0.1:8000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, name })
        });
    
        if (response.ok) {
            console.log('User logged in successfully');            
            window.location.replace("/albums")
        } else {
            const data = await response.json();
            if (data.error === "This user does not exist") {
                alert("This user does not exist");
            } else {
                console.error('Error logging in');
            }
        }
    }
    return (
        <div className={baseAuthStyle.pageContainer} >

            <form className={baseAuthStyle.formContainer} method="post" onSubmit={handleSubmit}>
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