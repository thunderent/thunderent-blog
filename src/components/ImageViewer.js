import React, {useState, useEffect, useContext} from 'react';
import {firestore} from '../firebase';

import "../index.css";

import BlogContext from "../context/Context";
import 'font-awesome/css/font-awesome.min.css';

import ImageLink from "./ImageLink";
const ImageViewer = (props) => {
    const [imageList, setImageList] = useState([{name:"image", url:"https://picsum.photos/id/1025/50/50"},
    {name:"image", url:"https://picsum.photos/id/1025/50/50"},
    {name:"image", url:"https://picsum.photos/id/1025/50/50"},
    {name:"image", url:"https://picsum.photos/id/1025/50/50"}
]);

    const x = useContext(BlogContext);
    console.log(x);

    /*
    useEffect(() => {
        refresh();
    },[])
    */

    const refresh = () => {
        console.log("called");
        let images = []
        firestore.collection('images').get().then(querySnapshot => {
            querySnapshot.forEach(element => {
                images.push(element.data());
            })
            setImageList(images);   
        });  
        console.log(images); 
        console.log("Layout");
    }


    return(
        <>
        <a style={{float:"right", position:"relative",left:"-30px", top:"-15px"}} className="actionButton grow" onClick={refresh}><i class="fa fa-refresh" aria-hidden="true"></i></a>
        <div id="imageViewerContainer">
            
            <ul>
             {imageList.map(img => (
             <>
                <ImageLink name={img.name} url={img.url}></ImageLink>  
             </>
             ))}
            </ul>
        </div>
        </>
    );
}


export default ImageViewer;