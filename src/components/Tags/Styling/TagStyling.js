import styled from 'styled-components';

export const ResponsiveTag = styled.span`
    
    background:${(props) => props.tag.color};
    font-size:12px;
    position: absolute;
    width: 70px;
    height: 30px;
    top: 5px;
    text-align:center;
    z-index: -1;
    right: 30px;
    border-radius: 9px 9px 0px 9px;
    padding: 5px;
    color:white;
`;