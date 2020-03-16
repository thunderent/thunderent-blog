import React, {useState}from "react";
import {CommentSectionContainer, CommentInput} from "./Styling/ArticleStyling";
import Comment from "./Comment";
import {firestore} from "../../firebase";
import {getCurrentDateTime} from "../../utils/utils";


const CommentSection = (props) => {
    const [post,setPost] = useState("");
    const [canComment, setCanComment] = useState(true);

    const onPostChange = (event) => {setPost(event.target.value);}

    const postComment = () => {
        let comments = props.comments;
        if(canComment === true){
            if(props.postID === 0 || !props){
                alert("There was a problem. Please try again later or report a bug by contacting me.");
                return;
            }
            comments.push({
                content : post,
                date : getCurrentDateTime(),
                user: props.userName
            });

            firestore.collection("posts").doc(props.postID).update({ comments: comments }).then(() => {
                setPost("");
                setCanComment(false);
                setTimeout(() => setCanComment(true), 10000);
            }); 
        }else{
            alert("You need to wait at least 10 seconds before commenting again.");
        } 
    }
    return(
        <CommentSectionContainer>
          <h2 style={{textAlign:"center"}}>Comments</h2>
          <p>Write a comment <i className="fa fa-comment" aria-hidden="true"></i></p>
          <ul>
              <li>Please keep things civil and respectful.</li>
              <li>I will remove any comments which represent spam.</li>
          </ul>
          {props.loggedIn ? <>
            <CommentInput rows="2" cols="50" placeholder="Write a comment..." onChange={onPostChange} value={post}></CommentInput>
            <button disabled={post === ""} onClick={postComment}>Post</button> </> 
            : 
            <small>You have to be logged in to post a comment.</small>}
            {props.comments.slice(0).reverse().map((element,index) => <Comment key={"comment-"+index} comment={element}></Comment>)}
        </CommentSectionContainer>
    )
}

export default CommentSection;