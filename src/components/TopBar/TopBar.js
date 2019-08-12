import React, {useState, useContext} from 'react';
import ImageMenu from "../ImageMenu";
import {Link} from 'react-router-dom';
import BlogContext from "../../context/Context";

import "../../index.css";
import 'font-awesome/css/font-awesome.min.css';
import { auth } from '../../firebase/index';


const TopBar = (props) => { 
    const {dispatch} = useContext(BlogContext);
    const [imageMenuOpen, setImageMenuDisplayStatus] = useState(false); 
    
    const closeMenuModal = () => {
        setImageMenuDisplayStatus(false);
    }

    const logOut = () => {
        dispatch({type:"LOGGED_STATUS", payload:false});
        auth.signOut().then(() => alert("Logged out! Have a nice day!"));
    }

    return(
        <> 
        <div className = "mainBar">
            <Link to="/"><img id="mainLogo" src="http://jcagarcia.com/files/uploads/logo-placeholder@2x.png"></img></Link>
            <h4 style={{margin:0}}>Full-Stack Citizen Blog</h4>

            <div className="smallMenu">
            <a href="#" className="topBarIcon"><Link to="/"><i className="fa fa-home" aria-hidden="true"></i></Link></a>
            {props.loggedIn ? <a className="topBarIcon"><Link to="/dashboard/" ><i onClick={() => dispatch({type:"CREATE_POST"})} className="fa fa-plus-circle" aria-hidden="true"></i></Link></a> : null}
            {props.loggedIn ? <a href="#" className="topBarIcon"onClick={() => setImageMenuDisplayStatus(true)}><i className="fa fa-picture-o" aria-hidden="true"></i></a> : null }

            {props.loggedIn===false ? <a href="#" className="topBarIcon"><Link to="/login"><i class="fa fa-sign-in" aria-hidden="true"></i></Link></a> 
            :
            <a href="#" onClick={() => logOut()} className="topBarIcon"><Link to="/"><i style={{color:"red"}} class="fa fa-sign-out" aria-hidden="true"></i></Link></a> }
            </div>
        </div>

        {imageMenuOpen ? <ImageMenu closeFunction={closeMenuModal}></ImageMenu> : null}
        
        </>
    );
}

export default TopBar;