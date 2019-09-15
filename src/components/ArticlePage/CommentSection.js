import React from "react";
import styled from 'styled-components';
import Comment from "./Comment";
import {device} from "../../device/device";

const Container = styled.div`
    margin: 0px auto 30px auto;

    @media ${device.mobileM} { width:25em;}
    @media ${device.mobileL} { width:30em;}
    @media ${device.laptop} {  width:45em;}

`;
const styles = {
    commentInput : {
        borderStyle: "none",
        borderColor: "transparent",
        overflow: "auto",
        width:"100%",
        padding:"20px",
        boxShadow: "0px 0px 6px -3px rgba(0,0,0,0.75)",
        borderRadius: "4px"
    }    
}
const CommentSection = (props) => {
    return(
        <Container>
          <h2 style={{textAlign:"center"}}>Comments</h2>
          <p>Write a comment <i class="fa fa-comment" aria-hidden="true"></i></p>
          <ul>
              <li>Please keep things civil and respectful</li>
              <li>I will remove any comments which represent spam</li>
          </ul>
          {props.loggedIn ? <>
          <textarea style={styles.commentInput} rows="2" cols="50" placeholder="Write a comment..."></textarea>
          <button> Post</button> </> : <small>You have to be logged in to post a comment.</small>}
          {props.comments.map(element => <Comment comment={element}></Comment>)}
        </Container>
    )
}

export default CommentSection;