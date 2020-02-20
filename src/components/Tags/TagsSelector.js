import React, {useState, useEffect} from 'react';


const TagsSelector = ({selectedTag, onTagChange}) =>{
    const [tags, setTags] = useState([{tagName:"1"},{tagName:"2"},{tagName:"3"}]);
    const [isItemSelected, setIsItemSelected] = useState(selectedTag);
  
    useEffect(() => {
        setTags(JSON.parse(localStorage.getItem("blog_tags")).tagList);   
    },[]);

    const onChange = (event) => {
        setIsItemSelected(true);
        onTagChange(event);
    }

    return(
        <div style={{display:"flex", justifyContent:"space-around", marginBottom:"10px"}}>
            <select onChange={onChange} value={selectedTag}>
                {tags.map((item, key) => <option style={{background:item.color}} key={key} value={item.name}>{item.name}</option>)}
            </select>
            <i style={{color : isItemSelected ? 'green' : 'red'}} className={isItemSelected ? "fa fa-check" : "fa fa-exclamation-circle"} aria-hidden="true">
                <small>{!isItemSelected ? ' nothing is selected' : ''}</small>
            </i>
        </div>
    );
}

export default TagsSelector;