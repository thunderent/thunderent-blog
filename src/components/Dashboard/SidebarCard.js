import React from 'react';
import "../../index.css";
const SidebarCard = (props) => { 
    return(
        <div className="sidebar-card">
              <div className="sidebar-card-title"><strong>{props.cardTitle}<i class={props.cardCSSTag} aria-hidden="true"></i></strong></div>
              {props.children}
        </div>
    )
}

export default SidebarCard;