import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SocialLinks from "../common/SocialLinks";
import { useCrudFireBase } from "../../hooks/useCrud";
import { LinkTypes } from "../../types/LinkTypes";
import LoaderComponent from './loader/Loader';
import { useAuthContext } from '../../Context/AuthContext';
import Button from '../common/Button';

const PageUser = () => {
    const params = useParams();
    const uidUser = params.uidUser;
    const { fetchLinksByUid } = useCrudFireBase();
    const { user } = useAuthContext();
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

    const copyLink = async () => {
        const linkBrowser = window.location.href;
        try {
            await navigator.clipboard.writeText(linkBrowser);
        } catch (error) {
            console.error('Error al copiar el link:', error);
        }
    }

    return (
        <main>
            <h1 className="bg-black text-white font-pixel text-3xl text-center p-2 rounded-lg">Bienvenidos a mi Lista de Redes </h1>
            <div>
                {user && (
                    <Button text='Copy Link' bgColor='bg-green-500' onClick={copyLink} />
                )}
            </div>
            {isLoading ? (
                <LoaderComponent></LoaderComponent>
            ) : (
                links.length > 0 ? (
                    links.map(link => (
                        <SocialLinks key={link.id} link={link} />
                    ))
                ) : (
                    <div className='bg-black w-full mt-4 rounded-lg p-4'>
                        <p className="text-white text-center text-xl font-pixel">No hay Links Cards en este usuario</p>
                    </div>
                )
            )}
        </main>
    );
}

export default PageUser;
