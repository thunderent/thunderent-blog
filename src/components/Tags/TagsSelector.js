import React, {useState, useContext, useEffect} from 'react';
import {firestore} from "../../firebase";

import BlogContext from "../../context/Context.js";

const TagsSelector = () =>{
    const {dispatch} = useContext(BlogContext);

    const [tags, setTags] = useState([{tagName:"1"},{tagName:"2"},{tagName:"3"}]);

    /* TODO - redo this so it doesn't get data on every re-render. Maybe get it once and then store it in local storage */
    useEffect(() => {
        setTags(JSON.parse(localStorage.getItem("blog_tags")).tagList);   
    },[]);
    

    const onChange = (event) => {
        console.log(event.target.value);
        dispatch({type:"TAG", payload:event.target.value});
    }

    return(
        <div style={{display:"flex", justifyContent:"space-around", marginBottom:"10px"}}>
            <select onChange={onChange}>
                {tags.map((item, key) => <option style={{background:item.color}} key={key} value={item.name}>{item.name}</option>)}
            </select>
        </div>
    );
}

export default TagsSelector;