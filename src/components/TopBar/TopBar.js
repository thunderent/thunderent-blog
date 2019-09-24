import React, {useState, useContext} from 'react';
import ImageMenu from "../ImageMenu";
import Dropdown from "./Dropdown.js";
import {Link} from 'react-router-dom';
import BlogContext from "../../context/Context";
import {Container, MenuLink, Title} from "./Styling/TopBarStyling";

import "../../index.css";
import 'font-awesome/css/font-awesome.min.css';
import { auth } from '../../firebase/index';


const TopBar = (props) => { 
    const {state,dispatch} = useContext(BlogContext);
    const [imageMenuOpen, setImageMenuDisplayStatus] = useState(false); 
    
    const closeMenuModal = () => {
        setImageMenuDisplayStatus(false);
    }

    const logOut = () => {
        dispatch({type:"LOGOUT"});
        auth.signOut().then(() => alert("Logged out! Have a nice day!"));
    }

    return(
        <> 
        <Container>
            <Link style={{display:"flex", textDecoration:"none"}} to="/">
                <img id="mainLogo" src="http://jcagarcia.com/files/uploads/logo-placeholder@2x.png"></img>
                <Title>Full-Stack Citizen Blog</Title>
            </Link>
            
            <div className="smallMenu">
                {props.loggedIn ? 
                    <> 
                    <i class="fa fa-user-circle" aria-hidden="true"></i> <span>Welcome {state.loggedUserDisplayName} </span> 
                    </> : <Link style={{textDecoration:"none", fontSize:"18px", color:"white"}} to="/login"><i class="fa fa-sign-in" aria-hidden="true"></i>Login</Link>
                } 
                {props.loggedIn ? 
                    <Dropdown>
                        <MenuLink onClick={() => dispatch({type:"CREATE_POST"})}><Link style={{textDecoration:"none", color:"black"}} to="/dashboard/" ><i className="fa fa-plus-circle" aria-hidden="true"></i>Create Post</Link></MenuLink> 
                        <MenuLink onClick={() => setImageMenuDisplayStatus(true)}><i className="fa fa-picture-o" aria-hidden="true">Image Uploader</i></MenuLink>
                        <MenuLink onClick={() => logOut()} ><Link style={{textDecoration:"none", color:"black"}} to="/"><i style={{color:"red"}} class="fa fa-sign-out" aria-hidden="true">Logout</i></Link></MenuLink>
                    </Dropdown> : null
                }         
            </div>
        </Container>

        {imageMenuOpen ? <ImageMenu closeFunction={closeMenuModal}></ImageMenu> : null}
        
        </>
    );
}

export default TopBar;