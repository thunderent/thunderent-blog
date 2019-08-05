import React, {useState, useContext, useEffect} from 'react';
import {firestore} from "../../firebase";

import BlogContext from "../../context/Context.js";

const TagsSelector = () =>{
    const {dispatch} = useContext(BlogContext);

    const [tags, setTags] = useState([{tagName:"1"},{tagName:"2"},{tagName:"3"}]);
    const [input, setInput] = useState("");

    /* TODO - redo this so it doesn't get data on every re-render. Maybe get it once and then store it in local storage */
    useEffect(() => {
        let tagList = []
        firestore.collection("tags").get().then(data => 
            {
                data.forEach(e => tagList.push(e.data()));
                setTags(tagList);
            }
        );
    },[]);
    

    const onChange = (event) => {
        setInput(event.target.value);
        dispatch({type:"TAG", payload:event.target.value});
        console.log(tags);
    }

    const addTagButton = () => {
        if(input !== ""){
            firestore.collection("tags").add({tagName: input}).then(() => {
                setTags([...tags, {tagName :input}]);
                setInput("")
                console.log("Added to storage");
            });                
        }
    }

    const removeTagButton = () => {
        const elementIndex = tags.indexOf(input);
        if(elementIndex === -1) {
            alert("Tag does not exist"); 
            return;
        }

        const newArray = tags.filter((_,i) => i !== elementIndex);
        firestore.collection('tags').where("tagName","==",tags[elementIndex]).get().then(
            result => result.forEach(e => {
                e.ref.delete();
                setTags(newArray);
                setInput("");
                console.log("Removed Tag!");
            })
        )
       
    }
    return(
        <div style={{display:"flex", justifyContent:"space-around", marginBottom:"10px"}}>
            <input type="text" list="data" onChange={onChange} value={input}/>
            <datalist id="data">
                {tags.map((item, key) => <option key={key} value={item.tagName}></option>)}
            </datalist>   
            <a className="actionButton" onClick={addTagButton}><i class="fa fa-plus-circle" aria-hidden="true"></i></a>
            <a className="actionButton" style={{background:"red"}} onClick={removeTagButton}><i class="fa fa-trash" aria-hidden="true"></i></a>         
        </div>
    );
}

export default TagsSelector;