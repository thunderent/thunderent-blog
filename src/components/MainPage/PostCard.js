import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import TagElement from "../Tags/TagElement.js";
import {withRouter} from 'react-router-dom';
import "../../index.css";


import BlogContext from "../../context/Context";



const styles = {
    article : {  
        position:"relative",    
        padding : "10px",
        borderRadius:"10px"
    },
    articleContainer : {
        margin :"30px 0px",
    },
    title: {
        display:"inline-block",
        fontSize:"20px"
    },
    icon : {
        position:"absolute",
        bottom:"0",
        right:"0",
        padding:"20px"
    },
    thumbnail : {
       float:"left",
       margin:"2px 15px"
    },
    p : {
        margin : "0"
    },
    editLabel : {
        position: "relative",
        float: 'right',
        bottom: '150px',
        background: 'beige',
        padding: '4px',
        borderRadius: '10px'
    }
}

const PostCard = (props) => {
    const {state, dispatch} = useContext(BlogContext);
    const {title,date,thumbnail,readDuration,description,tag} = props.article;
    
    const openArticle = () => {
        dispatch({type:"SET_ACTIVE_POST", payload:props.article});
        props.history.push(`/article/${title.replace(/\s/g, "-")}`);
    }

    const editArticle = () => {
        dispatch({type:"SET_ACTIVE_POST", payload:props.article});
        props.history.push("/dashboard/");
    }
    return(
          <div style={styles.articleContainer}>            
                    <article onClick={openArticle} class="article" style={styles.article}>
                            <img style={styles.thumbnail} src={thumbnail}></img>
                            <h2 style={styles.title}>{title}</h2>
                            <p style={styles.p} ><small>{description}</small></p>
                            <div style={styles.icon}>
                                <small style={{color:"gray"}}>{props.article.comments.length}<i class="fa fa-comment" aria-hidden="true"></i></small>
                                <TagElement tag={tag}></TagElement>   
                            </div>

                            <p><small><i>{date} • {readDuration} minutes read <i class="fa fa-star" aria-hidden="true"></i></i></small></p>                            
                    </article>
                {state.loggedIn ?<span style={styles.editLabel}>  <i  onClick={() => editArticle()} className="fa fa-pencil smallIcon" aria-hidden="true"></i>  
                       <i onClick={() => console.log("delete")} className="fa fa-trash smallIcon" aria-hidden="true"></i>
                </span> : null}       
        </div>
    )
}

PostCard.propTypes = {
    article : PropTypes.object.isRequired
}


export default withRouter(PostCard);
