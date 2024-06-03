import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faPencil } from '@fortawesome/free-solid-svg-icons';
import { useCrudFireBase } from "../../hooks/useCrud";
import { LinkTypes } from "../../types/LinkTypes";
import { useAuthContext } from "../../Context/AuthContext";

const SocialLinks = ({ link }: { link: LinkTypes }) => {
    const { user } = useAuthContext();
    const { onDeleteLink } = useCrudFireBase();

    return (
        <div className="bg-black rounded-2xl flex flex-col gap-2 text-white  font-pixel mt-8 p-8" key={link.id}>
            {user && (
                <div className="flex justify-end gap-4">

                    <div className="flex items-center bg-gre text-lg">
                        eliminar
                        <FontAwesomeIcon
                            icon={faX}
                            color="red"
                            onClick={() => link && onDeleteLink(link.id)}
                        />
                    </div>

                    <div className="flex items-center  text-lg">
                        editar
                        <FontAwesomeIcon
                            icon={faPencil}
                            color="green"
                            
                        />

                    </div>

                </div>
            )}

            <div className=" flex items-center gap-4 ">
                <div className="w-20 h-20">
                    {link.urlImagen ? (
                        <img className="rounded-2xl w-full h-full object-cover" src={link.urlImagen} alt="img" />
                    ) : (
                        <img className="rounded-2xl w-full h-full object-cover" src="/src/assets/ListTask.jpg" alt="defaultImg" />
                    )}
                </div>

                <h1 className="text-3xl tracking-widest text-nowrap text-pink-700 mr-1">{link.name}</h1>

            </div>
            <h4 className="text-xl">{link.description}</h4>
            <Link target="_blank" to={`${link.url}`} className="bg-green-500 text-xl p-4 hover:bg-green-800 rounded-lg font-thin">Entrar</Link>
        </div>
    )
}
export default SocialLinks;