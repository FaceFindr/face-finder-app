"use client"
import { ReactNode, useState } from 'react';
import inputStyle from './inputStyle.module.css'
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export type InputProps={
    name:string;
    value?:string;
    placeholder?:string;
    type?:string;
    width?:string;
    icon?:ReactNode;
    required?:boolean;
}

export default function Input(
    {
    name, 
    value,
    placeholder, 
    type="text", 
    width, 
    icon, 
    required}:InputProps){

    const inputClasses = ()=>{
        return `${inputStyle.baseInput}`
    }
    const inputContainerClasses =()=>{
        return `${inputStyle.inputContainer} ${!width && inputStyle.fullWidth}`
    }

    return (
        <div className={inputContainerClasses()} style={{width:width}}>
            <input
                name={name}
                value={value}
                className={inputClasses()}
                placeholder={placeholder}
                type={type}
                required={required}
            />
            {icon}
        </div>
        
    );

}