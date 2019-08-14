import React, {useState, useContext, useEffect} from 'react';
import TagElement from "../Tags/TagElement";
import BlogContext from "../../context/Context";
import * as Showdown from "showdown";
import * as sanitizeHtml from "sanitize-html-react";
import AuthorCard from '../MainPage/AuthorCard';
import CommentSection from './CommentSection';


let converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
  });

const styles = {
    header : {
        width : "45em",
        margin : "30px auto 90px auto"
    },
    title : {
        fontSize:"30px",
        fontWeight : "600",
        marginBottom : "0px"
    },
    smallDescription : {
        fontSize : "18px",
        fontWeight : "400",
        color : "#bfbfbf"
    },
    coverImage : {
        height : "500px",
        width : "100%",
        objectFit : "cover"
    },
    details : {
        float:"right"
    },
    coverSource : {
        margin : "5px 0px",
        textAlign:"center",
        color : "#bfbfbf",
        textDecoration: "none"
    },
    content : {
        width : "45em",
        margin : "30px auto 90px auto"
    },
    footer : {
        width : "100%",
        overflow:"auto",
        background : "#f5f5f5" 
    }
}


// const {title,date,thumbnail,readDuration,description,content,tag} = props.article;

const Article = () => {
    const {state} = useContext(BlogContext);
    const [blogContent, setBlogContent] = useState(converter.makeHtml(state.activePost.content));
    const [scrollHeight, setScrollHeight] = useState(0);
    
    const opacity = Math.min(100 / scrollHeight  , 1);

    const handleScroll = () => {
        console.log(scrollHeight);
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
            <div style={styles.header}>
                <div>
                    <p style={styles.title}>{state.activePost.title}</p>   
                    <p style={styles.smallDescription}>{state.activePost.description}</p>
                    <p style={styles.details}><i>{state.activePost.date} | {state.activePost.readDuration} minutes reading</i> <TagElement tag={state.activePost.tag}></TagElement></p>
                </div>
            </div>
            <div>
               <div style={{opacity}}> <img style={styles.coverImage} src="https://picsum.photos/id/452/1920/1080"></img></div>
                <p style={styles.coverSource}><small>Illustration : <a style={{color : "#919191"}} href="#">Five-Gran</a></small></p>
            </div>
            <div style={styles.content} dangerouslySetInnerHTML={{ __html : sanitizeHtml(blogContent)}}></div>
            <div style={styles.footer}>
                <AuthorCard></AuthorCard>
                <br></br>
            </div>
            {<CommentSection loggedIn={state.loggedIn} comments={state.activePost.comments}></CommentSection>}
        </div>
    )
}


export default Article;