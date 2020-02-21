import styled from 'styled-components';
import {COLORS} from "../../../utils/colors";

export const SocialIcon = styled.i`
    transition : transform 0.2s linear;

    &:hover{
        transform:scale(1.3);
        color : ${COLORS.primary};
    }
`;

export const SocialLink = styled.a`
    text-decoration : none;
    color : black;
`;

export const EditPostIcon = styled.i