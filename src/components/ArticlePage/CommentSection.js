import React from "react";
import Comment from "./Comment";

const styles = {
    container : {
        margin : "0 auto",
        width : "45em"
    },
    title : {
        textAlign:"center"
    },
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
        <div style={styles.container}>
          <h2 style={styles.title}>Comments</h2>
          <p>Write a comment <i class="fa fa-comment" aria-hidden="true"></i></p>
          <textarea style={styles.commentInput} rows="2" cols="50" placeholder="Write a comment..."></textarea>
          {props.comments.map(element => <Comment comment={element}></Comment>)}
        </div>
    )
}

export default CommentSection;