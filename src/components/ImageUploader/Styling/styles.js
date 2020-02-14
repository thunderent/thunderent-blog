import styled from 'styled-components';
import {COLORS} from "../../../utils/colors";

export const ImagePickerOverlay = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.85);
    z-index: 10;
`;

export const ImageUploaderContainer = styled.div`
    background: ${COLORS.background};
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    margin:100px auto;
    height:550px;
    width:35%;
`;

export const ImageMenuTopBar = styled.div`
    position : relative;
    top : 15px;
    background : ${COLORS.elevation};
    height:60px;
`;

export const UploaderTitle = styled.h3`
    display:inline-block;
    margin-left:40px;
    color:${COLORS.text}
`;

export const ImageMenuCloseButton = styled.a`
    float:right;
    background:${COLORS.secondary};
    font-weight: bold;
    color:white; 
    text-align: center;
    width:80px;
    border-radius: 5px;
    margin:15px;
    padding:5px;
    cursor: pointer;

    &:hover{
        transform:scale(1.1);
        background:${COLORS.secondaryVariation}
    }
    transition : transform 0.5s ease-out, background 0.5s ease-out;
`;

export const ImageViewerContainer = styled.div`
    background : ${COLORS.elevation}
    color : ${COLORS.text}
    overflow-y: scroll;
    height:320px;
`;

export const RefreshButton = styled.a`
    float: right;
    position: relative;
    left: -20px;
    top: -42px;
    background:${COLORS.primary}
    padding : 10px;
    color:${COLORS.text};
    font-weight: bold;
    border-radius:5px;
    cursor: pointer;

    &:hover{
        transform:scale(1.1);
        background:${COLORS.primaryVariation}
    }

    transition : transform 0.5s ease-out, background 0.5s ease-out;
`;