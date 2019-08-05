import React, {useContext} from 'react';
import PostCard from "./PostCard";
import AuthorCard from "./AuthorCard";

import BlogContext from "../../context/Context";

const mainPageStyle = {
    articleArea : {
        width:"42em",
        margin: "0 auto"
    },
    titleContainer : {
        width:"42em",
        margin: "0 auto",
        display:"flex",
        justifyContent:"space-between",
        borderBottom: "1px solid #d1d1d1"
    },
    linksContainer : {
        margin: "27px 0px",
        width:"100px",
        display:"flex",
        justifyContent:"space-between",
        fontSize:"20px"
    }
}
const MainPage = () => {
    const {state} = useContext(BlogContext);

    return(
        <div>
            <div style={{height:"80px"}}></div>
            <div style={mainPageStyle.titleContainer}>
                <h2>Full-Stack Citizen</h2>
                <span style={mainPageStyle.linksContainer}>
                    <i class="fa fa-gamepad socialIcon" aria-hidden="true"><a href="#"></a></i>  
                    <i class="fa fa-address-card socialIcon" aria-hidden="true"><a href="#"></a></i>
                    <i class="fa fa-github socialIcon" aria-hidden="true"><a href="#"></a></i>      
                </span>
            </div>
            <AuthorCard></AuthorCard>
            <div style={mainPageStyle.articleArea}>
                    {state.listOfArticles.map(e => { console.log(e); return(<PostCard article={e}></PostCard>)})}
            </div>
        </div>
    )
}

export default MainPage;