
import { LinkTypes } from '../types/LinkTypes';
import { db } from '../firebase/config';
import { collection, doc, addDoc, onSnapshot, deleteDoc, getDocs, getDoc } from "firebase/firestore";
import { useState, useEffect } from 'react';
import { useAuthContext } from '../Context/AuthContext';
import { storage } from '../firebase/config';
import { ref, deleteObject } from "firebase/storage";

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

                //Obtenemos el doc, osea el objeto de la base de datos

                const linkDocRef = doc(db, 'users', user.uid, 'links', id);
                const linkDoc = await getDoc(linkDocRef);
                
                if (linkDoc.exists()) {

                    // Obtenemos la referencia del archivo
                    const linkData = linkDoc.data();
                    const imageUrl = linkData.urlImagen; //Lo eliminamos entrando al doc.urlImagen

                    // Eliminamos la imagen de Firebase Storagexd
                    if (imageUrl) {
                        const imageRef = ref(storage, imageUrl);
                        await deleteObject(imageRef);
                    }

                    // Aqui se elimina el doc de la base de datos 
                    await deleteDoc(linkDocRef);
                } else {
                    console.error("El documento no existe");
                }

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