import React, {useState}from "react";
import styled from 'styled-components';
import Comment from "./Comment";
import {device} from "../../device/device";
import {firestore} from "../../firebase";

const Container = styled.div`
    margin: 0px auto 30px auto;

    @media ${device.mobile} { width:20em;}
    @media ${device.tablet} { width:30em;}
    @media ${device.laptop} {  width:45em;}
    @media ${device.desktop} {  width:50em;}

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
    const [post,setPost] = useState("");

    const onPostChange = (event) => {
        setPost(event.target.value);
        console.log(event.target.value);
    }

    const postComment = () => {
        let comments = props.comments;

        if(post === ""){
            alert("There is no comment to post");
            return;
        }
        if(props.postID === 0 || !props){
            alert("There was a problem. Please try again later or report a bug by contacting me.");
            return;
        }

        var today = new Date();
        var date = today.toDateString();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;

        comments.push({
            content : post,
            date : dateTime,
            user: props.userName
        });

        firestore.collection("posts").doc(props.postID).update({ comments: comments }).then(() => {
            setPost("");
        });
       
    }
    return(
        <Container>
          <h2 style={{textAlign:"center"}}>Comments</h2>
          <p>Write a comment <i class="fa fa-comment" aria-hidden="true"></i></p>
          <ul>
              <li>Please keep things civil and respectful</li>
              <li>I will remove any comments which represent spam</li>
          </ul>
          {props.loggedIn ? <>
          <textarea style={styles.commentInput} rows="2" cols="50" placeholder="Write a comment..." onChange={onPostChange} value={post}></textarea>
          <button onClick={postComment}>Post</button> </> : <small>You have to be logged in to post a comment.</small>}
          {props.comments.map(element => <Comment comment={element}></Comment>)}
        </Container>
    )
}

export default CommentSection;