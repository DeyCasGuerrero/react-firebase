import React from "react";
import LinkForm from "./LinkForm";
import { useCrudFireBase } from "../hooks/useCrud";
const Links = () => {
    const {addOrEditLink,success}=useCrudFireBase();
    
    return(
        <>
            <LinkForm addOrEditLink={addOrEditLink}></LinkForm>
        </>
    );

}
export default Links;