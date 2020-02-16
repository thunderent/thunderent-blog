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

export const ShareSection = styled.div`'

`;

export const CommentSectionContainer = styled.div` 
    margin: 0px auto 30px auto;

    @media ${device.mobile} { width:20em;}
    @media ${device.tablet} { width:30em;}
    @media ${device.laptop} {  width:45em;}
    @media ${device.desktop} {  width:50em;}
`;

export const CommentContainer = styled.div` 
    width:100%;
    border : 1px solid #00447c;
    border-radius:6px;
    margin-top : 30px;
    overflow: auto;
    padding:20px;
`;

export const CommentIcon = styled.i`
    float:left;
    color:#00447c;
    margin-right: 10px;
    margin-bottom: 10px;
    font-size : 30px;
`;

export const CommentInput = styled.textarea`
    border-style: none;
    border-color: transparent;
    overflow: auto;
    width:100%;
    padding:20px;
    box-shadow: 0px 0px 6px -3px rgba(0,0,0,0.75);
    border-radius: 4px;
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
