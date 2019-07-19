import React, {useState} from 'react';
import {storage, firestore} from "../firebase";

import "../index.css";

export const ImageUploader = (props) => {
    const [image, setImage] = useState(null);
    

    const handleChange = e => {
        if(e.target.files[0]){
            const img = e.target.files[0];
            setImage(img);
            console.log(image);
        }
    }

    const handleUpload = e => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on('state_changed', 
        (snapshot) => {
            console.log("Image is uploading", snapshot);
        },
        (error) => {
            alert("Upload failed", error);
        }, 
        () => {
            storage.ref('images').child(image.name).getDownloadURL().then(
                url => firestore.collection("images").add({url: url, name : image.name})           
            )
            alert("Upload successful!");      
        });
    }
    return(
        <div id="imagePickerContainer">
            <label className="custom-file-upload">
                <input type="file" onChange={handleChange}/>
                Select Image
            </label>
            <a className="actionButton" onClick={handleUpload}>Upload Image</a>
        </div>
    );
}

export default ImageUploader;
