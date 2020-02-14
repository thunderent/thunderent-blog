import React, {useState, useEffect, useContext} from 'react';
import {firestore} from '../../firebase';

import "../../index.css";

import {ImageViewerContainer, RefreshButton} from "./Styling/styles";
import BlogContext from "../../context/Context";
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
        <RefreshButton onClick={refresh}>
            <i class="fa fa-refresh" aria-hidden="true"></i>
        </RefreshButton>
        <ImageViewerContainer>       
            <ul>
             {imageList.map(img => (
                <ImageLink name={img.name} url={img.url}></ImageLink>
            ))}
            </ul>
        </ImageViewerContainer>
        </>
    );
}


export default ImageViewer;