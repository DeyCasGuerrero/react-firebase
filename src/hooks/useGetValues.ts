import { useState } from "react";
import { LinkTypes } from "../types/LinkTypes";
import { useFiles } from '../hooks/useFiles';
import { useCrudFireBase } from "./useCrud";

export function useGetValues() {

    const initialStateValues: LinkTypes = {
        url: '',
        name: '',
        description: '',
        urlImagen:'',
    }

    const [file, setFile] = useState<File | null>();
    const { uploadFile } = useFiles();
    const { addOrEditLink } = useCrudFireBase();

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;

        try {
            if (target && target.files && target.files.length > 0) {
                const result = target.files[0];
                console.log("se eligio la img")
                setFile(result);
            } else {
                console.error("No files selected or target is not a file input");
            }
        } catch (error) {
            console.error(error)
        }
    };

    const [values, setValues] = useState(initialStateValues);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value })
    }


    const handleSumit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            let imageUrl = values.urlImagen; // Guardamos la URL de la imagen actual del formulario
            if (file) {
                imageUrl = await uploadFile(file); // Subimos la imagen y obtenemos su URL
                console.log("URL de la imagen subida:", imageUrl);
                setFile(null); // Reseteamos el estado del archivo después de subirlo
            }
            // Actualizamos los valores del formulario, incluyendo la URL de la imagen
            const updatedValues = { ...values, urlImagen: imageUrl };
            console.log("Valores del formulario a enviar:", updatedValues);

            // Enviamos los valores actualizados
            await addOrEditLink(updatedValues);
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
        }

        setValues({ ...initialStateValues });
    }

    return {
        handleSumit,
        handleInputChange,
        values,
        file,
        handleFileChange,       
    }
}