import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import TagElement from "../Tags/TagElement.js";
import {withRouter} from 'react-router-dom';
import "../../index.css";
import {firestore} from "../../firebase/index";


import BlogContext from "../../context/Context";
import {Title, Article, ThumbnailImage, IconsArea, EditLabel} from "./Styling/PostCardStyling";


const PostCard = (props) => {
    const {state, dispatch} = useContext(BlogContext);
    const {title,date,thumbnail,readDuration,description,tag, id} = props.article;
    
    const openArticle = () => {
        dispatch({type:"SET_ACTIVE_POST", payload:props.article});
        props.history.push(`/article/${id}`);
    }

    const editArticle = () => {
        dispatch({type:"SET_ACTIVE_POST", payload:props.article});
        props.history.push("/dashboard/");
    }

    const deleteArticle = () => {
        let deletePostFlag = window.confirm(`Do you want to delete this post?\n\nTitle:${title}\nID:${id}`);
        if(deletePostFlag){
            firestore.collection("posts").doc(id).delete().then(() => alert("Deleted!")).catch(err => alert("There was an error deleting the post",err));
        }
    }
    return(
          <div style={{margin :"30px 0px"}}>            
                    <Article onClick={openArticle}>
                            <ThumbnailImage src={thumbnail}></ThumbnailImage>
                            <TagElement tag={JSON.parse(localStorage.getItem("blog_tags")).tagList.filter(element => element.name === tag)[0]}></TagElement> 
                            <Title>{title}</Title>
                            <p style={{margin:0}} ><small>{description}</small></p>
                            <IconsArea>
                                <small style={{color:"gray"}}>{props.article.comments.length}<i className="fa fa-comment" aria-hidden="true"></i></small>
                            </IconsArea>

                            <p><small><i>{new Date(date).toDateString()} • {readDuration} minutes read <i className="fa fa-star" aria-hidden="true"></i></i></small></p>                            
                    </Article>
               
                    {state.isAdmin ? 
                        <EditLabel>  
                            <i onClick={() => editArticle()} className="fa fa-pencil smallIcon" aria-hidden="true"></i>  
                            <i onClick={() => deleteArticle()} className="fa fa-trash smallIcon" aria-hidden="true"></i>
                        </EditLabel> : null
                    }       
        </div>
    )
}

PostCard.propTypes = {
    article : PropTypes.object.isRequired
}


export default withRouter(PostCard);
