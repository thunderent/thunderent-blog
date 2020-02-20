import styled from 'styled-components';

// StyledComponents //
export const TextArea = styled.textarea`
    padding:5px 10px; 
    outline:none;
    box-shadow: none;
    width:90%;
    resize:none
    font-size:12px;
    color:gray;
    border : ${props => props.value ? '1px solid #68a36c' : '1px solid #ff6661'}
`;