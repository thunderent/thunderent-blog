import React, {useState, useEffect, useContext} from 'react';
import {firestore} from '../../firebase';

import "../../index.css";

import {ImageViewerContainer, RefreshButton} from "./Styling/styles";
import 'font-awesome/css/font-awesome.min.css';

import ImageLink from "./ImageLink";
const ImageViewer = () => {
    const [imageList, setImageList] = useState([]);
    useEffect(() => {
        refresh();
    },[]);

    const refresh = () => {
        let images = []
        firestore.collection('images').get().then(querySnapshot => {
            querySnapshot.forEach(element => {
                images.push(element.data());
            })
            setImageList(images);   
        });  
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