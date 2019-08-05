import React from 'react';


const TagElement = (props) => {
    const tagColor = (tag) => {
        switch(tag){
            case "TECH": return "blue"
            case "LIFE": return "#ab7d00"
            case "DEV": return "#adc544"
        }
    }
    return(
        <span style={{background:tagColor(props.tag)}} className="tag">{props.tag} <i class="fa fa-tag" aria-hidden="true"></i></span>
    );
}


export default TagElement;