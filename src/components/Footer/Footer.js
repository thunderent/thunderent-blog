import React from "react";
import styled from 'styled-components';
import {device} from "../../device/device";
import "../../index.css";

const FooterContainer = styled.div`
    width:100%;
    background:rgb(34, 34, 34);
    padding : 20px 0px;
    color:white;
    text-align: center;
`;

const FooterSection = styled.section`
    border-top:1px solid white;
    max-width: 1000px;
    margin:0px auto;
    display:flex;
    justify-content: space-between;

    
    @media ${device.mobileL} { 
        h2{
            width:100%;
            display:block;
            margin-right:5px;
            text-align:center;
        }

        a{
            margin:3px;
        }
        div{
            display:none;
        }
    }
    @media ${device.laptop} {  
        h2{
            margin-right:100px;
        }
        a{
            margin:40px;
        }
        div{
            display:block;
        }
    }  

    a{
        text-decoration: none;
        color:white;
    }

    div{
        margin-top:25px;
    }
`;

const Links = styled.div`
`;

const Footer = () => {
    return(
        <FooterContainer>
            <FooterSection>
                <h2>Full-Stack Citizen</h2>
                <div className="links"> 
                    <a href="#">About</a>
                    <a href="#">Portfolio</a>
                    <a href="#">Contact</a>
                </div>
            </FooterSection>
            <small style={{color:"gray"}}>Thunderent 2019. Created with the help of React and Firebase</small>
        </FooterContainer>
    )
}

export default Footer;