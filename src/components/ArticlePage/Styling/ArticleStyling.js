import styled from 'styled-components';
import {device} from "../../../device/device";

export const Header = styled.div`
    margin : 30px auto 10px auto;
    padding:10px;
    max-width:50em;
`;

export const Title = styled.p`   
    font-weight : 600;
    margin-bottom : 0px;

    @media ${device.mobile} { font-size:35px; text-align:center;}
    @media ${device.tablet} { font-size:35px; text-align:center;}
    @media ${device.laptop} { font-size:40px;}
    @media ${device.desktop} { font-size:45px;}  
`;

export const ArticleContent = styled.div`
    word-wrap: break-word;
    white-space:normal;
    line-height:1.6;
    margin : 30px auto 90px auto;
    max-width:50em;
    font-size:19px;
    padding:10px;
`;

export const CoverImage = styled.img` 
    width : 100%;
    object-fit : cover;

    @media ${device.mobile} { height:250px;}
    @media ${device.tablet} { height:300px;}
    @media ${device.laptop} { height:600px;}
    @media ${device.desktop} { height:700px;} 
`;

export const DetailsText = styled.p`
    @media ${device.mobile} { text-align:center; float : none; font-size:12px;}
    @media ${device.tablet} { text-align:center; float : none; font-size:12px;}
    @media ${device.laptop} { float : right; font-size:14px;}
    @media ${device.desktop} { float : right; font-size:14px;} 
`;

export const SmallDescription = styled.p`
    fonteight : 400;
    color : #bfbfbf;
    font-size:18px;

    @media ${device.mobile} { text-align:center;}
    @media ${device.tablet} { text-align:center;}

`;

export const styles = {
    coverSource : {
        margin : "5px 0px",
        textAlign:"center",
        color : "#bfbfbf",
        textDecoration: "none"
    },
    footer : {
        width : "100%",
        overflow:"auto",
        background : "#f5f5f5" 
    }
}
