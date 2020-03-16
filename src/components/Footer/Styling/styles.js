import styled from 'styled-components';
import {device} from "../../../device/device";
import "../../../index.css";

export const FooterContainer = styled.div`
    width:100%;
    background:rgb(34, 34, 34);
    padding : 20px 0px;
    color:white;
    text-align: center;
`;

export const FooterSection = styled.section`
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