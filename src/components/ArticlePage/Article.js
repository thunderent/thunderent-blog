import React, {useState, useContext, useEffect} from 'react';
import { firestore } from "../../firebase/index";
import BlogContext from "../../context/Context";
import * as Showdown from "showdown";
import * as sanitizeHtml from "sanitize-html-react";
import AuthorCard from '../MainPage/AuthorCard';
import CommentSection from './CommentSection';
import * as utils from "../../utils/utils.js";
import {Header,Title,ArticleContent,CoverImage,DetailsText,SmallDescription,ShareSection,styles, SmallTag, ShareFacebookButton} from "./Styling/ArticleStyling.js";
import {serializeArticleForShare} from "../../utils/utils";

//Markdown converter settings
let converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
  });

const Article = () => {
    const {state} = useContext(BlogContext);

    const {activePost} = state;
    const [blogContent, setBlogContent] = useState({
        ...activePost,
        content : converter.makeHtml(activePost.content),
        readDuration : utils.calculateReadingTime(activePost.content)
    });

    const displayedTagInfo = JSON.parse(localStorage.getItem("blog_tags")).tagList.filter(element => element.name === blogContent.tag)[0] || {color:'', name:''};


    const [scrollHeight, setScrollHeight] = useState(0);   
    const opacity = Math.min(100 / scrollHeight, 1);
    const handleScroll = () => {
          var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
          if(scrollTop<600){
            setScrollHeight(scrollTop);
          }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    });

    const shareResultsToFacebook = () => {
        const params = {
            u : window.location.href,
            picture : blogContent.mainCover,
            title : blogContent.title,
            description : blogContent.description
        }
        const url = `https://www.facebook.com/sharer/sharer.php?${serializeArticleForShare(params)}`;
        return url;
    }

    useEffect(() => {
        window.scrollTo(0,0);
        if(blogContent.id === 0){
            let linkId = utils.getIdFromCustomURL(window.location.href);
            firestore.collection("posts").doc(linkId).get().then(data => {
                   let receivedData = data.data();
                   setBlogContent({
                    ...receivedData,
                    id : linkId,
                    content:converter.makeHtml(receivedData.content),
                    readDuration : utils.calculateReadingTime(receivedData.content) 
                   });
            });
        }
    }, [blogContent]);
    
    return(
        <div>
            <div style={{height:"80px"}}></div>
                <Header>
                    <div>
                        <Title>{blogContent.title}</Title>   
                        <SmallDescription>{blogContent.description}</SmallDescription>
                        <DetailsText>
                            <i>{new Date(blogContent.date).toDateString()} | {blogContent.readDuration} minutes read</i> 
                            <SmallTag color={displayedTagInfo.color}>
                                <i>{displayedTagInfo.name}</i>
                            </SmallTag>
                        </DetailsText>
                        <ShareSection>
                                <ShareFacebookButton href={shareResultsToFacebook()} target="_blank">Share to facebook</ShareFacebookButton>
                        </ShareSection>
                    </div>
                </Header>
            <div>
               <div style={{opacity}}> 
                    <CoverImage src={blogContent.mainCover}></CoverImage>
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
            <CommentSection loggedIn={state.loggedIn} comments={blogContent.comments} postID={blogContent.id} userName={state.loggedUserDisplayName}/>
        </div>
    )
}


export default Article;