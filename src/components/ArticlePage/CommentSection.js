import React, {useState}from "react";
import {CommentSectionContainer, CommentInput} from "./Styling/ArticleStyling";
import Comment from "./Comment";
import {firestore} from "../../firebase";
import {getCurrentDateTime} from "../../utils/utils";


const CommentSection = (props) => {
    const [post,setPost] = useState("");

    const onPostChange = (event) => {setPost(event.target.value);}

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

        comments.push({
            content : post,
            date : getCurrentDateTime(),
            user: props.userName
        });

        console.log("This is the commmment broo", comments);

        firestore.collection("posts").doc(props.postID).update({ comments: comments }).then(() => {
            setPost("");
        });     
    }
    return(
        <CommentSectionContainer>
          <h2 style={{textAlign:"center"}}>Comments</h2>
          <p>Write a comment <i class="fa fa-comment" aria-hidden="true"></i></p>
          <ul>
              <li>Please keep things civil and respectful</li>
              <li>I will remove any comments which represent spam</li>
          </ul>
          {props.loggedIn ? <>
            <CommentInput rows="2" cols="50" placeholder="Write a comment..." onChange={onPostChange} value={post}></CommentInput>
            <button onClick={postComment}>Post</button> </> 
            : 
            <small>You have to be logged in to post a comment.</small>}
            {props.comments.map(element => <Comment comment={element}></Comment>)}
        </CommentSectionContainer>
    )
}

export default CommentSection;