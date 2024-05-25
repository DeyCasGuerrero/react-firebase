
import { LinkTypes } from '../types/LinkTypes';
import { db } from '../firebase/config'; 
import { collection, doc, setDoc } from "firebase/firestore"; 
import { useState } from 'react';
export function useCrudFireBase(){

    const [success, setSuccess] = useState<boolean>();

    const addOrEditLink = async(values: LinkTypes) => {
        console.log('new task:', values);
        try {
            const linksCollection = collection(db, 'links');
            await setDoc(doc(linksCollection), values);
            setSuccess(true);
        } catch (error) {
            console.log('Error al escribir en el doc',error);
            setSuccess(false)
        }
        
    }

    return {
        addOrEditLink,
        success,
    };
}