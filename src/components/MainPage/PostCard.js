import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import TagElement from "../Tags/TagElement.js";
import {withRouter} from 'react-router-dom';
import styled from 'styled-components';
import "../../index.css";
import {device} from "../../device/device";
import {firestore} from "../../firebase/index";


import BlogContext from "../../context/Context";

const ThumbnailImage = styled.img`
    display:block;
    margin:2px auto;
    height:200px;
    object-fit:cover;

    @media ${device.mobileS} {
        width:80%;
    }

    @media ${device.mobileL} {
        width:100%;
    }
`;

const Article = styled.article`
    position: relative;  
    padding :  15px;
    border-radius: 10px; 
    
    img{
        transition: opacity 0.4s ease-out;
    }
    &:hover{
        box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.25);
        cursor: pointer;

        img{
            opacity : 0.6;
        }
    }
`;

const styles = {
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
        top: '-1em',
        background: 'yellow',
        padding: '10px',
        borderRadius: '10px',
        boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.25)'
    }
}

const PostCard = (props) => {
    const {state, dispatch} = useContext(BlogContext);
    const {title,date,thumbnail,readDuration,description,tag, id} = props.article;
    
    const openArticle = () => {
        dispatch({type:"SET_ACTIVE_POST", payload:props.article});
        props.history.push(`/article/${title.replace(/\s/g, "-")}`);
    }

    const editArticle = () => {
        dispatch({type:"SET_ACTIVE_POST", payload:props.article});
        props.history.push("/dashboard/");
    }

    const deleteArticle = () => {
        console.log(props.article);
        firestore.collection("posts").doc(id).delete().then(() => alert("Deleted!")).catch(err => alert("There was an error deleting the post",err));
    }
    return(
          <div style={{margin :"30px 0px"}}>            
                    <Article onClick={openArticle}>
                            <ThumbnailImage src={thumbnail}></ThumbnailImage>
                            <h2 style={styles.title}>{title}</h2>
                            <p style={styles.p} ><small>{description}</small></p>
                            <div style={styles.icon}>
                                <small style={{color:"gray"}}>{props.article.comments.length}<i class="fa fa-comment" aria-hidden="true"></i></small>
                                <TagElement tag={JSON.parse(localStorage.getItem("blog_tags")).tagList.filter(element => element.name === tag)[0]}></TagElement>   
                            </div>

                            <p><small><i>{date} • {readDuration} minutes read <i class="fa fa-star" aria-hidden="true"></i></i></small></p>                            
                    </Article>
                {state.loggedIn ?<span style={styles.editLabel}>  <i  onClick={() => editArticle()} className="fa fa-pencil smallIcon" aria-hidden="true"></i>  
                       <i onClick={() => deleteArticle()} className="fa fa-trash smallIcon" aria-hidden="true"></i>
                </span> : null}       
        </div>
    )
}

PostCard.propTypes = {
    article : PropTypes.object.isRequired
}


export default withRouter(PostCard);
