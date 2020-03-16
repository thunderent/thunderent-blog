import React from 'react';
import {ResponsiveTag} from "./Styling/TagStyling";


const TagElement = (props) => {
    return(
        props.tag ? 
        <ResponsiveTag {...props} className="tag">{props.tag.name}<i className="fa fa-tag" aria-hidden="true"></i></ResponsiveTag> :
        null
    );
}


export default TagElement;