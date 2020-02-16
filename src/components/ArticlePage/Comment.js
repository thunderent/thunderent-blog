import React from "react";
import {CommentContainer, CommentIcon} from "./Styling/ArticleStyling";
import "../../index.css";

const Comment = (props) => {
    const { user, date, content } = props.comment;
    return(
        <CommentContainer>
            <span><CommentIcon className="fa fa-user-circle" aria-hidden="true"/> <small>{user} | {date} </small></span>
            <p>{content}</p>
        </CommentContainer>
    );
}

export default Comment;