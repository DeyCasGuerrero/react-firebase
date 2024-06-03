
import LinkForm from "./LinkForm";
import { useCrudFireBase } from "../../hooks/useCrud";
import Toast from "../common/Toast";
import { useEffect } from "react";

import SocialLinks from "../common/SocialLinks";

const Links = () => {
    const { success, setSuccess, links } = useCrudFireBase();

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
                {
                    links.map(link => (
                        <SocialLinks link={link} key={link.id}></SocialLinks>
                    ))
                }
            </div>
            {success &&
                <Toast />
            }
        </>
    );

}
export default Links;