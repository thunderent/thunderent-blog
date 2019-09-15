import React, {useEffect} from 'react';


const TagElement = (props) => {


    return(
        <span style={{background:JSON.parse(localStorage.getItem("blog_tags")).tag, fontSize:"12px"}} className="tag">{props.tag} <i class="fa fa-tag" aria-hidden="true"></i></span>
    );
}


export default TagElement;