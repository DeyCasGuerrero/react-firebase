
import Inputs from "../common/Inputs";
import TextArea from "../common/TextArea";
import Button from "../common/Button";
import { useGetValues } from "../../hooks/useGetValues";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Context/AuthContext";

const LinkForm = () => {
    const navigate = useNavigate();

    const {user}=useAuthContext();

    const handleButtonClick=()=>{
        navigate(`/pageuser/${user?.uid}`)
    }

    const { handleSumit, handleInputChange, values, handleFileChange, file } = useGetValues();

    return (
        <div className="flex flex-col items-center w-full ">
            <h1 className="text-white text-6xl text-center font-pixel mt-4">Agrega tus redes</h1>
            <Button text="Ir a tu page" bgColor="bg-green-500" onClick={handleButtonClick}/>
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

                <Inputs
                    label="Coloca tu imagen"
                    name="urlImagen"
                    type="file"
                    onChange={handleFileChange}
                />

                <div className="p-4 bg-black mt-2 rounded-lg flex items-center text-center justify-center border-4 border-white">
                    {file ? (
                        <p className="text-3xl font-pixel text-emerald-600"> YA TIENES LA IMAGEN </p>

                    ) : (
                        <p className="text-3xl font-pixel text-red-600"> AÚN NO HAY UNA IMAGEN </p>
                    )}
                </div>

                <TextArea
                    label="Añade una descripción"
                    name="description"
                    row={3}
                    placeholder="Este es una descripción de mi web"
                    onChange={handleInputChange}
                    value={values.description}
                />
                <Button text="Save" bgColor="bg-pink-600"/>
            </form>
        </div>
    );

}

export default LinkForm;