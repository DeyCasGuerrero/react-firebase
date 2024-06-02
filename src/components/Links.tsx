
import LinkForm from "./LinkForm";
import { useCrudFireBase } from "../hooks/useCrud";
import Toast from "./common/Toast";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';


const Links = () => {
    const { success, setSuccess, links, onDeleteLink } = useCrudFireBase();

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                setSuccess(false);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [success, setSuccess]);

    return (
        <>

            <LinkForm></LinkForm>
            <div className="w-96">
                {links.map(link => (
                    <div className="bg-black rounded-2xl flex flex-col gap-2 text-white  font-pixel mt-8 p-8" key={link.id}>
                        <div className="flex justify-end"> {/* Contenedor flex para alinear a la derecha */}
                            <FontAwesomeIcon
                                icon={faX}
                                color="red"
                                onClick={() => link && onDeleteLink(link.id)}
                            />
                        </div>

                        <div className=" flex items-center gap-4 ">
                            <div className="w-20">
                                {link.urlImagen ? (
                                    <img className="rounded-2xl" src={link.urlImagen} alt="img" />
                                ) : (
                                    <img className="rounded-2xl" src="/src/assets/ListTask.jpg" alt="defaultImg" />
                                )}
                            </div>

                            <h1 className="text-3xl tracking-widest text-nowrap text-pink-700 mr-1">{link.name}</h1>

                        </div>
                        <h4 className="text-xl">{link.description}</h4>
                        <Link target="_blank" to={`${link.url}`} className="bg-green-500 text-xl p-4 hover:bg-green-800 rounded-lg font-thin">Entrar</Link>
                    </div>
                ))}
            </div>
            {success &&
                <Toast />
            }
        </>
    );

}
export default Links;