import styled from 'styled-components';
import {device} from "../../../device/device";

export const Container = styled.div`
    position: fixed;
    background: #212121;
    color:white;
    width:100%;
    height: 55px;
    padding:15px;
    display: flex;
    flex-direction: row;
    z-index: 999;
`;

export const Logo = styled.img`

`;

export const MenuLink = styled.span`
    font-size: 20px;
    color:black;
    text-decoration:none;
    padding: 8px 0px 8px 0px;
    
    transition:0.4s background ease-out;

    &:hover{
        background:#e6e6e6;
    }
`

export const Title = styled.h2`
    margin:0;
    color:white;

    @media ${device.mobile} { display:none}
    @media ${device.tablet} { display:none}
`;