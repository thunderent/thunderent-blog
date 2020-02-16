import React, {useState, useContext, useEffect} from 'react';
import TagElement from "../Tags/TagElement";
import { firestore } from "../../firebase/index";
import BlogContext from "../../context/Context";
import * as Showdown from "showdown";
import * as sanitizeHtml from "sanitize-html-react";
import AuthorCard from '../MainPage/AuthorCard';
import CommentSection from './CommentSection';
import * as utils from "../../utils/utils.js";
import {Header,Title,ArticleContent,CoverImage,DetailsText,SmallDescription,ShareSection,styles} from "./Styling/ArticleStyling.js";
import {serializeArticleForShare} from "../../utils/utils";





let converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
  });

const Article = () => {
    const {state} = useContext(BlogContext);
    console.log("state", state);

    const [blogContent, setBlogContent] = useState({
        id:state.activePost.id,
        comments: state.activePost.comments,
        content: converter.makeHtml(state.activePost.content),
        date: state.activePost.date,
        description: state.activePost.description,
        mainCover: state.activePost.mainCover,
        mainCoverSource: state.activePost.mainCoverSource,
        readDuration: utils.calculateReadingTime(state.activePost.content),
        tag: state.activePost.tag,
        thumbnail: state.activePost.thumbnail,
        title: state.activePost.title,     
    });
    const [scrollHeight, setScrollHeight] = useState(0);
    
    const opacity = Math.min(100 / scrollHeight, 1);

    const handleScroll = () => {
          var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
          if(scrollTop<600){
            setScrollHeight(scrollTop);
          }
    };

    const shareResultsToFacebook = () => {
        const params = {
            u : window.location.href,
            picture : blogContent.mainCover,
            title : blogContent.title,
            description : blogContent.description
        }
        const url = `https://www.facebook.com/sharer/sharer.php?${serializeArticleForShare(params)}`;
        console.log("this is the url", url);
        return url;
    }

    useEffect(() => {
        window.scrollTo(0,0);
        if(blogContent.id === 0){
            let linkId = utils.getIdFromCustomURL(window.location.href);
            firestore.collection("posts").doc(linkId).get().then(data => {
                   let receivedData = data.data();
                   setBlogContent({
                    id:data.id,
                    comments: receivedData.comments,
                    content: converter.makeHtml(receivedData.content),
                    date: receivedData.date,
                    description: receivedData.description,
                    mainCover: receivedData.mainCover,
                    mainCoverSource: receivedData.mainCoverSource,
                    readDuration: utils.calculateReadingTime(receivedData.content),
                    tag: receivedData.tag,
                    thumbnail: receivedData.thumbnail,
                    title: receivedData.title,       
                   })
            });
        }
    }, []);
    
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
                    <Title>{blogContent.title}</Title>   
                    <SmallDescription>{blogContent.description}</SmallDescription>
                    <DetailsText>
                        <i>{new Date(blogContent.date).toDateString()} | {blogContent.readDuration} minutes read</i> 
                        <TagElement tag={JSON.parse(localStorage.getItem("blog_tags")).tagList.filter(element => element.name === blogContent.tag)[0]}/>
                    </DetailsText>
                    <ShareSection>
                            <a href={shareResultsToFacebook()} target="_blank">Share to facebook</a>
                    </ShareSection>
                </div>
            </Header>
            <div>
               <div style={{opacity}}> 
                    <CoverImage  src={blogContent.mainCover}></CoverImage>
               </div>
                {blogContent.mainCoverSource !== "" ? 
                    <p style={styles.coverSource}>
                        <small>Illustration : <a style={{color : "#919191"}} href={blogContent.mainCoverSource}>Source</a></small>
                    </p> : null
                }
            </div>
            <ArticleContent dangerouslySetInnerHTML={{ __html : sanitizeHtml(blogContent.content,{allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'h1','h2' ])})}}/>
            <div style={styles.footer}>
                <AuthorCard/>
                <br></br>
            </div>
            {<CommentSection loggedIn={state.loggedIn} comments={blogContent.comments} postID = {blogContent.id} userName={state.loggedUserDisplayName}/>}
        </div>
    )
}


export default Article;