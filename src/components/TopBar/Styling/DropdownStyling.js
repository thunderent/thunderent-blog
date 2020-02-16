import styled from 'styled-components';

export const Container = styled.div`
    display:flex;
    flex-direction:column
    box-shadow: 1px 1px 5px 0px rgba(0,0,0,0.35);
    padding:10px;
    background:white;
    position:relative;
    top:17px;
`

export const DropdownBtn = styled.div`
    transition:0.3s background ease-in;
    padding:8px;
    display:inline;
    font-size:1.2em;
    margin-left:20px;
    margin-right:20px;
    border-radius:5px;


    &:hover{
        color:red;
        background:red;       
    }
`