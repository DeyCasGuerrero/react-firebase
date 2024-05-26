
import { LinkTypes } from '../types/LinkTypes';
import { db } from '../firebase/config';
import { collection, doc, setDoc, getDocs, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from 'react';


export function useCrudFireBase() {

    const [success, setSuccess] = useState<boolean>(false);
    const [links, setLinks] = useState<LinkTypes[]>([]);
    const addOrEditLink = async (values: LinkTypes) => {
        try {
            const linksCollection = collection(db, 'links');
            await setDoc(doc(linksCollection), values);
            setSuccess(true);
        } catch (error) {
            console.log('Error al escribir en el doc', error);
            setSuccess(false)
        }

    }

    const getLinks = () => {
        try {
            const linksCollection = collection(db, 'links');
            onSnapshot(linksCollection, (querySnapshot) => {
                const docs: LinkTypes[] = [];
                querySnapshot.forEach(doc => {
                    const data = doc.data();
                    const link: LinkTypes = {
                        id: doc.id,
                        url: data.url,
                        name: data.name,
                        description: data.description
                    };
                    docs.push(link);
                });
                setLinks(docs);
            });
        } catch (error) {
            console.error('Error al obtener los links', error);
        }
    }

    useEffect(() => {
        getLinks();
    }, [])

    return {
        addOrEditLink, 
        success,
        setSuccess,
        links,
    };
}