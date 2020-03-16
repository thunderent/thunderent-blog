import React from "react";
import * as profilePic from "../../images/me.jpg";

import {AuthorContainer, AuthorImage, AuthorName} from "./Styling/styles";

const AuthorCard = () => {
    return(
    <AuthorContainer>
        <AuthorImage src={profilePic}></AuthorImage>
        <AuthorName>Nechitelea Robert</AuthorName>
        <p><small>Gravity in the space station. There are some clever ideas out there with the space stations of the future</small></p>
    </AuthorContainer>
    )
}

export default AuthorCard;