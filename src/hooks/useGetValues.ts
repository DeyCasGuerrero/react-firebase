import React, { useState, ChangeEvent } from "react";
import { LinkTypes } from "../types/LinkTypes";
export function useGetValues (addOrEdit: (values: LinkTypes) => void){

    const initialStateValues:LinkTypes = {
        url:'',
        name: '',
        description:'',
    }

    const [values, setValues]=useState(initialStateValues); 

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setValues({...values, [name]: value })
        
    }

    const handleSumit = (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        console.log(values)
        addOrEdit(values);
    }

    return{
        handleSumit,
        handleInputChange,
    }
}