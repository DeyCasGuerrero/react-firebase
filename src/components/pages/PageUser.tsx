import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SocialLinks from "../common/SocialLinks";
import { useCrudFireBase } from "../../hooks/useCrud";
import { LinkTypes } from "../../types/LinkTypes";
import LoaderComponent from './loader/Loader';

const PageUser = () => {
    const params = useParams();
    const uidUser = params.uidUser;
    const { fetchLinksByUid } = useCrudFireBase();
    const [links, setLinks] = useState<LinkTypes[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            if (uidUser) {
                try {
                    const data: LinkTypes[] = await fetchLinksByUid(uidUser);
                    setLinks(data);
                    setIsLoading(false);
                } catch (error) {
                    setIsLoading(false);
                    console.error('Error fetching links:', error);
                }
            }
        };

        fetchData();

    }, [uidUser]);

    return (
        <main>
            <h1 className="bg-white text-black font-pixel text-3xl">HOLA A LA PAGINA DE USUARIO DE REDES XDDD</h1>
            {isLoading ? (
                <LoaderComponent></LoaderComponent>
            ) : (
                links.length > 0 ? (
                    links.map(link => (
                        <SocialLinks key={link.id} link={link} />
                    ))
                ) : (
                    <p className="text-white">No hay enlaces disponibles.</p>
                )
            )}
        </main>
    );
}

export default PageUser;
