import React, {useState, useContext, useEffect} from 'react';
import styled from 'styled-components';
import TagElement from "../Tags/TagElement";
import BlogContext from "../../context/Context";
import * as Showdown from "showdown";
import * as sanitizeHtml from "sanitize-html-react";
import AuthorCard from '../MainPage/AuthorCard';
import CommentSection from './CommentSection';
import {Header,Title,ArticleContent,CoverImage,DetailsText,SmallDescription,styles} from "./Styling/ArticleStyling.js";


let converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
  });

const Article = () => {
    const {state} = useContext(BlogContext);
    const [blogContent, setBlogContent] = useState(converter.makeHtml(state.activePost.content));
    const [scrollHeight, setScrollHeight] = useState(0);
    
    const opacity = Math.min(100 / scrollHeight, 1);

    const handleScroll = () => {
          var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
          if(scrollTop<600){
            setScrollHeight(scrollTop);
          }
    };

    useEffect(() => window.scrollTo(0,0), []);
    
    useEffect(() => {
        console.log(blogContent);
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
                        <i>{state.activePost.date} | {state.activePost.readDuration} minutes reading</i> 
                        <TagElement tag={JSON.parse(localStorage.getItem("blog_tags")).tagList.filter(element => element.name === state.activePost.tag)[0]}/>
                    </DetailsText>
                </div>
            </Header>
            <div>
               <div style={{opacity}}> 
                    <CoverImage  src={state.activePost.mainCover}></CoverImage>
               </div>
                {state.activePost.mainCoverSource !== "" ? 
                    <p style={styles.coverSource}>
                        <small>Illustration : <a style={{color : "#919191"}} href={state.activePost.mainCoverSource}>Source</a></small>
                    </p> : null
                }
            </div>
            <ArticleContent dangerouslySetInnerHTML={{ __html : sanitizeHtml(blogContent)}}></ArticleContent>
            <div style={styles.footer}>
                <AuthorCard/>
                <br></br>
            </div>
            {<CommentSection loggedIn={state.loggedIn} comments={state.activePost.comments} postID = {state.activePost.id} userName={state.loggedUserDisplayName}/>}
        </div>
    )
}


export default Article;