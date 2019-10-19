import React, {useContext} from 'react';
import PostCard from "./PostCard";
import AuthorCard from "./AuthorCard";
import styled from 'styled-components';
import {device} from "../../device/device.js";

import BlogContext from "../../context/Context";

const ArticlesContainer = styled.div`
    width:52em;
    margin: 0 auto;

    @media ${device.mobileS} {
        width:20em;
    }

    @media ${device.mobileL} {
        width:28em;
    }

    @media ${device.laptop} {
        width:45em;
    }

    @media ${device.laptopL} {
        width:52em;
    }
`;

const TitleContainer = styled.div`   
    display:flex;
    border-bottom: 1px solid #d1d1d1;


    @media ${device.mobileS} {
        width:auto;
        margin: 0 1em;
        justify-content:space-around;
    }

    @media ${device.mobileL} {
        width:35em;
        margin: 0 auto;
        justify-content:space-around;
    }

    @media ${device.laptop} {
        width:45em;
        margin: 0 auto;
        justify-content:space-between;
    }

    @media ${device.laptopL} {
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
                <h2>Full-Stack Citizen</h2>
                <LinksContainer>
                    <i class="fa fa-gamepad socialIcon" aria-hidden="true"><a href="#"></a></i>  
                    <i class="fa fa-address-card socialIcon" aria-hidden="true"><a href="#"></a></i>
                    <i class="fa fa-github socialIcon" aria-hidden="true"><a href="#"></a></i>      
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