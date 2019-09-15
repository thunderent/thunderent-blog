import React, {useEffect} from 'react';


const TagElement = (props) => {
    return(
        props.tag ? 
        <span style={{background:props.tag.color, fontSize:"12px"}} className="tag">{props.tag.name}<i class="fa fa-tag" aria-hidden="true"></i></span> :
        null
    );
}


export default TagElement;