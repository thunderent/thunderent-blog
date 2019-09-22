import React, {useState, useEffect} from 'react';
import 'font-awesome/css/font-awesome.min.css';
import {Container, DropdownBtn} from "./Styling/DropdownStyling";

const Dropdown = (props) => {
    const [visible, setVisible] = useState(false);
    const toggleMenu = () =>  setVisible(!visible);      

    return(
        <div style={{display:"inline"}}>
            <DropdownBtn onClick={toggleMenu}><i style={{color:"white"}} class="fa fa-ellipsis-v fa-lg" aria-hidden="true"></i></DropdownBtn>
            {visible ? <Container onClick={toggleMenu}>{props.children}</Container> : null}        
        </div>
    )
}

export default Dropdown;