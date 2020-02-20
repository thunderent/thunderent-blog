import React from "react";
import styled from 'styled-components';
import {device} from "../../device/device";


const AuthorContainer = styled.div` 
    margin: 0 auto;
    overflow: auto;
    @media ${device.mobile} {
        width:23em;
    }

    @media ${device.tablet} {
        width:28em;
    }

    @media ${device.laptop} {
        width:40em;
    }

    @media ${device.desktop} {
        width:50em;
    }
`;
const styles = {
    authorDescription: {
        width:"42em",
        margin: "0 auto",
        overflow:"auto"
    },
    authorImage : {
        marginTop: "30px",
        marginLeft: "30px",
        marginRight : "30px",
        borderRadius:"50%",
        height:"100px",
        width:"100px",
        float:"left"
    },
    authorName : {
        margin: "25px 40px"       
    }
}
const AuthorCard = () => {
    return(
    <AuthorContainer>
        <img style={styles.authorImage} src="https://picsum.photos/id/144/200/200"></img>
        <h3 style={styles.authorName}>Nechitelea Robert</h3>
        <p><small>Gravity in the space station. There are some clever ideas out there with the space stations of the future</small></p>
    </AuthorContainer>
    )
}

export default AuthorCard;