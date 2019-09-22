import styled from 'styled-components';
import {device} from "../../../device/device";

export const EditLabel = styled.span`
    position: relative;
    top: -1em;
    background: yellow;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.25);
`;
export const IconsArea = styled.div`
    position:absolute;
    bottom:0;
    right:0;
    padding:20px;
`;

export const Title = styled.h2`
    display:inline-block;
    font-size:20p;
`;

export const ThumbnailImage = styled.img`
    display:block;
    margin:2px auto;
    height:200px;
    object-fit:cover;

    @media ${device.mobileS} {
        width:80%;
    }

    @media ${device.mobileL} {
        width:100%;
    }
`;

export const Article = styled.article`
    position: relative;  
    padding :  15px;
    border-radius: 10px; 

    img{
        transition: opacity 0.4s ease-out;
    }
    &:hover{
        box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.25);
        cursor: pointer;

        img{
            opacity : 0.6;
        }
    }
`;
