import React from "react";
import {COLORS} from "../../utils/colors";
import {FooterContainer, FooterSection} from "./Styling/styles";

const Footer = () => {
    return(
        <FooterContainer>
            <FooterSection>
                <h2>master of <span style={{color : COLORS.primary}}>SOME</span></h2>
            </FooterSection>
            <small style={{color:"gray"}}>Thunderent 2020. Created with the help of React and Firebase</small>
        </FooterContainer>
    )
}

export default Footer;