import React, {useState, useContext, useEffect} from 'react';
import BlogContext from "../../context/Context.js";

const TagsSelector = ({selectedTag}) =>{
    const {dispatch} = useContext(BlogContext);


    const [tags, setTags] = useState([{tagName:"1"},{tagName:"2"},{tagName:"3"}]);
    const [selectedItem, setItemSelected] = useState(selectedTag);

    useEffect(() => {
        console.log('the selected tag is', selectedTag);
        setTags(JSON.parse(localStorage.getItem("blog_tags")).tagList);   
    },[]);
    

    const onChange = (event) => {
        setItemSelected(true);
        dispatch({type:"TAG", payload:event.target.value});
    }

    return(
        <div style={{display:"flex", justifyContent:"space-around", marginBottom:"10px"}}>
            <select onChange={onChange} value={selectedTag || tags[0]}>
                {tags.map((item, key) => <option style={{background:item.color}} key={key} value={item.name}>{item.name}</option>)}
            </select>
            <i style={{color : selectedItem ? 'green' : 'red'}} className={selectedItem ? "fa fa-check" : "fa fa-exclamation-circle"} aria-hidden="true">
                <small>{!selectedItem ? ' nothing is selected' : ''}</small>
            </i>
        </div>
    );
}

export default TagsSelector;