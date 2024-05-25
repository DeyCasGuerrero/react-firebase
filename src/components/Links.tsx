
import LinkForm from "./LinkForm";
import { useCrudFireBase } from "../hooks/useCrud";
import Toast from "./common/Toast";

const Links = () => {
    const { addOrEditLink, success } = useCrudFireBase();
    

    return (
        <>
        
            <LinkForm addOrEditLink={addOrEditLink}></LinkForm>
            {success && (
                <Toast></Toast>
            )}
        </>
    );

}
export default Links;