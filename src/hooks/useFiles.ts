import { storage } from '../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { useAuthContext } from '../Context/AuthContext';

export function useFiles() {

    const { user } = useAuthContext();

    const nameUser = user?.displayName;

    async function uploadFile(file: File): Promise<string> {
        if (user) {
            const imgName = v4();
            const avatarRef = ref(storage, `AvatarLinks/${nameUser}/${imgName}`);

            try {
                await uploadBytes(avatarRef, file);
                const downloadURL = await getDownloadURL(avatarRef);
                return downloadURL;
            } catch (error) {
                console.error("Error al subir la imagen:", error);
                throw error;
            }
        } else {
            throw new Error("No hay usuario autenticado.");
        }
    }

    return {
        uploadFile,
    }

}