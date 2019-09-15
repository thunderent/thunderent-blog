import React, {useState, useContext, useEffect} from 'react';
import styled from 'styled-components';
import TagElement from "../Tags/TagElement";
import BlogContext from "../../context/Context";
import * as Showdown from "showdown";
import * as sanitizeHtml from "sanitize-html-react";
import AuthorCard from '../MainPage/AuthorCard';
import CommentSection from './CommentSection';
import {device} from "../../device/device";


let converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
  });


const Header = styled.div`
    margin : 30px auto 10px auto;
    padding:10px;
    @media ${device.mobileS} { width:20em;}
    @media ${device.mobileL} { width:30em;}
    @media ${device.laptop} {  width:45em;}
`;

const Title = styled.p`   
    font-weight : 600;
    margin-bottom : 0px

    @media ${device.mobileL} { font-size:25px;}
    @media ${device.laptop} {  font-size:30px;}
`;

const ArticleContent = styled.div`
    margin : 30px auto 90px auto;

    @media ${device.mobileS} { width:25em; font-size:15px; padding:14px;}
    @media ${device.mobileL} { width:30em; font-size:16px; padding:0px;}
    @media ${device.laptop} {  width:45em; font-size:19px; padding:0px;}
`;

const CoverImage = styled.img` 
    width : 100%;
    object-fit : cover;

    @media ${device.mobileL} { height:300px;}
    @media ${device.laptop} {  height : 500px;}
`;

const DetailsText = styled.p`
    @media ${device.mobileL} { float : none; font-size:12px;}
    @media ${device.laptop} {  float : right; font-size:14px;}  
`;

const SmallDescription = styled.p`
    fonteight : 400;
    color : #bfbfbf;

    @media ${device.mobileL} { font-size:16px;}
    @media ${device.laptop} {  font-size:18px;}  
`;

const styles = {
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

const Article = () => {
    const {state} = useContext(BlogContext);
    const [blogContent, setBlogContent] = useState(converter.makeHtml(state.activePost.content));
    const [scrollHeight, setScrollHeight] = useState(0);
    
    const opacity = Math.min(100 / scrollHeight  , 1);

    const handleScroll = () => {
          var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
          if(scrollTop<600){
            setScrollHeight(scrollTop);
            console.log(scrollTop);
          }

    };

    useEffect(() => window.scrollTo(0,0), []);
    
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    });

    return(
        <div>
            <div style={{height:"80px"}}></div>
            <Header>
                <div>
                    <Title>{state.activePost.title}</Title>   
                    <SmallDescription>{state.activePost.description}</SmallDescription>
                    <DetailsText>
                        <i>{state.activePost.date} | {state.activePost.readDuration} minutes reading</i> <TagElement tag={JSON.parse(localStorage.getItem("blog_tags")).tagList.filter(element => element.name === state.activePost.tag)[0]}></TagElement></DetailsText>
                </div>
            </Header>
            <div>
               <div style={{opacity}}> <CoverImage  src={state.activePost.mainCover}></CoverImage></div>
                {state.activePost.mainCoverSource !== "" ? <p style={styles.coverSource}><small>Illustration : <a style={{color : "#919191"}} href={state.activePost.mainCoverSource}>Source</a></small></p> : null}
            </div>
            <ArticleContent dangerouslySetInnerHTML={{ __html : sanitizeHtml(blogContent)}}></ArticleContent>
            <div style={styles.footer}>
                <AuthorCard></AuthorCard>
                <br></br>
            </div>
            {<CommentSection loggedIn={state.loggedIn} comments={state.activePost.comments} postID = {state.activePost.id} userName={state.loggedUserDisplayName}></CommentSection>}
        </div>
    )
}


export default Article;