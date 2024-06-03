
import { LinkTypes } from '../types/LinkTypes';
import { db } from '../firebase/config';
import { collection, doc, addDoc, onSnapshot, deleteDoc, getDocs } from "firebase/firestore";
import { useState, useEffect } from 'react';
import { useAuthContext } from '../Context/AuthContext';


export function useCrudFireBase() {

    const [success, setSuccess] = useState<boolean>(false);
    const [links, setLinks] = useState<LinkTypes[]>([]);
    const { user } = useAuthContext();

    const addOrEditLink = async (values: LinkTypes) => {
        try {
            if (!user) {
                throw new Error('Usuario no autenticado');
            }
            const userLinksCollection = collection(db, 'users', user.uid, 'links');
            const docRef = await addDoc(userLinksCollection, values);
            setSuccess(true);
            return docRef.id;
        } catch (error) {
            console.log('Error al escribir en el doc', error);
            setSuccess(false)
        }
    }

    const getLinks = () => {
        try {
            if (!user) {
                throw new Error('Usuario no autenticado');
            }
            const userLinksCollection = collection(db, 'users', user.uid, 'links');
            onSnapshot(userLinksCollection, (querySnapshot) => {
                const docs: LinkTypes[] = [];
                querySnapshot.forEach(doc => {
                    const data = doc.data();
                    const link: LinkTypes = {
                        id: doc.id,
                        url: data.url,
                        name: data.name,
                        description: data.description,
                        urlImagen: data.urlImagen,

                    };
                    docs.push(link);
                });
                setLinks(docs);
            });
        } catch (error) {
            console.error('Error al obtener los links', error);
        }
    };

    const fetchLinksByUid = async (uid: string) => {
        try {
            const userLinksCollection = collection(db, 'users', uid, 'links');
            const querySnapshot = await getDocs(userLinksCollection);
            const docs: LinkTypes[] = [];
            querySnapshot.forEach(doc => {
                const data = doc.data();
                const link: LinkTypes = {
                    id: doc.id,
                    url: data.url,
                    name: data.name,
                    description: data.description,
                    urlImagen: data.urlImagen,
                };
                docs.push(link);
            });

            return docs;
        } catch (error) {
            console.error('Error al obtener los links por UID', error);
            return [];
        }
    };

    const onDeleteLink = async (id: any) => {
        if (window.confirm("¿Estás seguro de eliminar esto?")) {
            try {
                if (!user) {
                    throw new Error('Usuario no autenticado');
                }
                const linkDocRef = doc(db, 'users', user.uid, 'links', id);
                await deleteDoc(linkDocRef);
            } catch (error) {
                console.error('Error al eliminar el link', error);
            }
        }
    };


    useEffect(() => {
        if (user) {
            getLinks();
        }
    }, [user]);

    return {
        addOrEditLink,
        success,
        setSuccess,
        links,
        onDeleteLink,
        fetchLinksByUid, 
    };
}