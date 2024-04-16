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
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import {createClient } from '@supabase/supabase-js';
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('Missing Supabase environment variables');
}
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
export default function LogIn(){
    const [showPassword, setShowPassword] = useState(false)
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const {error, data} = await supabase.auth.signInWithPassword({email, password})
        if (error) {
            console.error('Error logging in:', error.message);
        } else {
            console.log('User logged in successfully:', data);
            Cookies.set('jwtToken', data.session?.access_token, {secure : false, sameSite: 'Lax'})
            window.location.replace("/albums")
        }

    };
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
                        <a href="forgot" ><Text text="Forgot your password?" type={TextTypes.CAPTION}/></a> 
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