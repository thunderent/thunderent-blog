import React from 'react';


const TagElement = (props) => {
    const tagColor = (tag) => {
        switch(tag){
            case "TECH": return "#509aab"
            case "LIFE": return "#52ab50"
            case "DEV": return "#5446b3"
        }
    }
    return(
        <span style={{background:tagColor(props.tag), fontSize:"12px"}} className="tag">{props.tag} <i class="fa fa-tag" aria-hidden="true"></i></span>
    );
}


export default TagElement;