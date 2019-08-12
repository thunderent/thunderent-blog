import React from "react";
import "../../index.css";

const Comment = (props) => {
    const { user, date, content } = props.comment;
    return(
        <div className="comment">
            <span><i class="fa fa-user-circle commentIcon" style={{fontSize:"30px"}} aria-hidden="true"></i> <small>{user} | {date} </small></span>
            <p>{content}</p>
        </div>
    )
}

export default Comment;