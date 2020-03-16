import React, {useContext} from 'react';
import PostCard from "./PostCard";
import AuthorCard from "./AuthorCard";
import {SocialIcon, SocialLink} from "./Styling/styles";
import {COLORS} from "../../utils/colors";
import BlogContext from "../../context/Context";
import {TitleContainer, LinksContainer, ArticlesContainer} from "./Styling/styles";



const MainPage = () => {
    const {state} = useContext(BlogContext);

    return(
        <div>
            <div style={{height:"80px"}}></div>
            <TitleContainer>
                <h2>master of <span style={{color : COLORS.primary}}>SOME</span></h2>
                <LinksContainer>
                    <SocialLink  target="_blank" href="https://thunderent.itch.io/dream-of-me"><SocialIcon className="fa fa-gamepad" aria-hidden="true"/></SocialLink>
                    <SocialLink  target="_blank" href="https://robertnechitelea.com/"><SocialIcon className="fa fa-address-card" aria-hidden="true"/></SocialLink>
                    <SocialLink  target="_blank" href="https://github.com/thunderent"><SocialIcon className="fa fa-github" aria-hidden="true"/></SocialLink>      
                </LinksContainer>
            </TitleContainer>
            <AuthorCard></AuthorCard>
            <ArticlesContainer>
                    {state.listOfArticles.map((e,index) => { return(<PostCard key={"pc-" +index} article={e}></PostCard>)})}
            </ArticlesContainer>
        </div>
    )
}

export default MainPage;