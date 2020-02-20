import styled from 'styled-components';
import {COLORS} from "../../../utils/colors";

export const SocialIcon = styled.i`
    transition : transform 0.2s linear;

    &:hover{
        transform:scale(1.3);
        color : ${COLORS.primary};
    }
`;