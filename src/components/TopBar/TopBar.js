import React, {useState} from 'react';
import ImageMenu from "../ImageMenu";

import "../../index.css";
import 'font-awesome/css/font-awesome.min.css';


const TopBar = () => { 
    const [imageMenuOpen, setImageMenuDisplayStatus] = useState(false); 
    
    const closeMenuModal = () => {
        setImageMenuDisplayStatus(false);
    }

    return(
        <> 
        <div className = "mainBar">
            <img id="mainLogo" src="http://jcagarcia.com/files/uploads/logo-placeholder@2x.png"></img>
            <h4 style={{margin:0}}>Full-Stack Citizen Blog</h4>

            <div className="smallMenu">
            <a href="#" className="topBarIcon"onClick={() => setImageMenuDisplayStatus(true)}><i className="fa fa-picture-o" aria-hidden="true"></i></a>
            <a href="#" className="topBarIcon"><i className="fa fa-list" aria-hidden="true"></i></a>
            <a className="topBarIcon"><i className="fa fa-podcast" aria-hidden="true"></i></a>
            </div>
        </div>

        {imageMenuOpen ? <ImageMenu closeFunction={closeMenuModal}></ImageMenu> : null}
        
        </>
    );
}

export default TopBar;