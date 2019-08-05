import React, {useState, useContext} from 'react';
import ImageMenu from "../ImageMenu";
import {Link} from 'react-router-dom';
import BlogContext from "../../context/Context";

import "../../index.css";
import 'font-awesome/css/font-awesome.min.css';


const TopBar = () => { 
    const {dispatch} = useContext(BlogContext);
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
            <a href="#" className="topBarIcon"><Link to="/"><i className="fa fa-list" aria-hidden="true"></i></Link></a>
            <a className="topBarIcon"><Link to="/dashboard/" ><i onClick={() => dispatch({type:"CREATE_POST"})} className="fa fa-podcast" aria-hidden="true"></i></Link></a>
            <a href="#" className="topBarIcon"onClick={() => setImageMenuDisplayStatus(true)}><i className="fa fa-picture-o" aria-hidden="true"></i></a>
            </div>
        </div>

        {imageMenuOpen ? <ImageMenu closeFunction={closeMenuModal}></ImageMenu> : null}
        
        </>
    );
}

export default TopBar;