import React from 'react';
import {Overlay} from "./styling/styles";
import * as loader from "../../images/loader.gif";

const Loader = ({showLoader}) => {
    return(
        <>
        {showLoader ?
            <Overlay>
                <img src={loader}></img>
            </Overlay> : null
        }
        </>
    );
}

export default Loader;