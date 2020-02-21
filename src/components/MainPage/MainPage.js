import React, {useContext} from 'react';
import PostCard from "./PostCard";
import AuthorCard from "./AuthorCard";
import styled from 'styled-components';
import {device} from "../../device/device.js";
import {SocialIcon, SocialLink} from "./Styling/styles";
import {COLORS} from "../../utils/colors";

import BlogContext from "../../context/Context";

const ArticlesContainer = styled.div`
    width:52em;
    margin: 0 auto;

    @media ${device.mobile} {
        width:23em;
    }

    @media ${device.tablet} {
        width:28em;
    }

    @media ${device.laptop} {
        width:52em;
    }
`;

const TitleContainer = styled.div`   
    display:flex;
    border-bottom: 1px solid #d1d1d1;


    @media ${device.mobile} {
        width:auto;
        margin: 0 1em;
        justify-content:space-around;
    }

    @media ${device.tablet} {
        width:35em;
        margin: 0 auto;
        justify-content:space-around;
    }

    @media ${device.laptop} {
        width:45em;
        margin: 0 auto;
        justify-content:space-between;
    }

    @media ${device.desktop} {
        width:52em;
        margin: 0 auto;
        justify-content:space-between;
    }
`;

const LinksContainer = styled.div`
    margin: 27px 0px;
    width:100px;
    display:flex;
    justify-content:space-between;
    font-size:20px;
`;

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
                    {state.listOfArticles.map(e => { return(<PostCard article={e}></PostCard>)})}
            </ArticlesContainer>
        </div>
    )
}

export default MainPage;