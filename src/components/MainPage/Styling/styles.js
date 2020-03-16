import styled from 'styled-components';
import {COLORS} from "../../../utils/colors";
import {device} from "../../../device/device.js";

export const SocialIcon = styled.i`
    transition : transform 0.2s linear;

    &:hover{
        transform:scale(1.3);
        color : ${COLORS.primary};
    }
`;

export const SocialLink = styled.a`
    text-decoration : none;
    color : black;
`;

export const ArticlesContainer = styled.div`
    width:52em;
    margin: 0 auto;

    @media ${device.mobile} {
        width:23em;
    }

    @media ${device.tablet} {
        width:28em;
    }

    @media ${device.laptop} {
        width:52em;
    }
`;

export const TitleContainer = styled.div`   
    display:flex;
    border-bottom: 1px solid #d1d1d1;


    @media ${device.mobile} {
        width:auto;
        margin: 0 1em;
        justify-content:space-around;
    }

    @media ${device.tablet} {
        width:35em;
        margin: 0 auto;
        justify-content:space-around;
    }

    @media ${device.laptop} {
        width:45em;
        margin: 0 auto;
        justify-content:space-between;
    }

    @media ${device.desktop} {
        width:52em;
        margin: 0 auto;
        justify-content:space-between;
    }
`;

export const LinksContainer = styled.div`
    margin: 27px 0px;
    width:100px;
    display:flex;
    justify-content:space-between;
    font-size:20px;
`;

export const AuthorContainer = styled.div` 
    margin: 0 auto;
    overflow: auto;
    @media ${device.mobile} {
        width:23em;
    }

    @media ${device.tablet} {
        width:28em;
    }

    @media ${device.laptop} {
        width:40em;
    }

    @media ${device.desktop} {
        width:50em;
    }
`;

export const AuthorImage = styled.img`
    margin-top : 30px;
    margin-left : 30px;
    margin-right : 30px;
    border-radius : 50%;
    height : 100px;
    width : 100px;
    float : left;
`;

export const AuthorName = styled.h3`
    margin : 25px 40px;
`;
