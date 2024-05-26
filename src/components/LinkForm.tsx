
import Inputs from "./common/Inputs";
import TextArea from "./common/TextArea";
import Button from "./common/Button";
import { useGetValues } from "../hooks/useGetValues";
import React from "react";
import { LinkTypes } from "../types/LinkTypes";

interface LinkFormProps{
    addOrEditLink: (values: LinkTypes) => void;
}

const LinkForm:React.FC<LinkFormProps> = ({addOrEditLink}) => {

    const { handleSumit, handleInputChange,values} = useGetValues(addOrEditLink);
    return (
        <div className="flex flex-col items-center w-full gap-16">
            <h1 className="text-white text-6xl text-center font-pixel">Agrega tus redes</h1>
            <form className="w-full max-w-md p-4" onSubmit={handleSumit}>

                <Inputs
                    label="Link"
                    name="url"
                    placeholder="https://someurl.com"
                    type="text"
                    onChange={handleInputChange}
                    value={values.url}
                />
                <Inputs
                    label="Name"
                    name="name"
                    placeholder="Website name"
                    type="text"
                    onChange={handleInputChange}
                    value={values.name}
                />

                <TextArea
                    label="Añade una descripción"
                    name="description"
                    row={3}
                    placeholder="Este es una descripción de mi web"
                    onChange={handleInputChange}
                    value={values.description}
                />
                <Button/>
            </form>
        </div>
    );

}

export default LinkForm;