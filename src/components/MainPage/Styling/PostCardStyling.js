import styled from 'styled-components';
import {COLORS} from "../../../utils/colors";
import {device} from "../../../device/device";

export const EditLabel = styled.span`
    position: relative;
    top: -1em;
    background: ${COLORS.secondary};
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
    width:100%;
    border-radius: 4px;
`;

export const Article = styled.article`
    position: relative;  
    padding :  25px 15px 15px 15px;
    border-radius: 10px; 

    transition: box-shadow 0.4s ease-out;

    &:hover{
        box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
        cursor: pointer;
    }
`;
