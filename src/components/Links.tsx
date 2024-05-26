
import LinkForm from "./LinkForm";
import { useCrudFireBase } from "../hooks/useCrud";
import Toast from "./common/Toast";
import { useEffect } from "react";

const Links = () => {
    const { addOrEditLink, success, setSuccess, links} = useCrudFireBase();

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

            <LinkForm addOrEditLink={addOrEditLink}></LinkForm>
            <div>
                {links.map(link =>(
                    <div  className="bg-black rounded-2xl text-white font-pixel mt-8 p-8" key={link.id}>
                        <h1>{link.name}</h1>
                        <h4>{link.url}</h4>
                        <h4>{link.description}</h4>
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