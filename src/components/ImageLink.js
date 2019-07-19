import React, {useState, useEffect} from 'react';
import {storage, firestore} from '../firebase';
import 'font-awesome/css/font-awesome.min.css';

const ImageLink = (props) => {
    const [imageName, setImageName] = useState();

    useEffect(() => {
        setImageName(props.name);
    },[]);

    const deleteImage = () => {
        console.log("Deleting this image :" + imageName);
           
        let imageRef = storage.ref().child("images/"+ imageName);
        imageRef.delete().then(() => {

            firestore.collection('images').where("name","==",imageName).get().then(
                result => result.forEach(e => {
                    e.ref.delete();
                    alert("Image deleted!");
                })
            )
        });
        
    }  

    return(
        <div style={{display:"flex", flexDirection:"row", marginBottom:"10px"}}>
            <img width="70px" height="70px" src={props.url}></img>
            <p style={{marginLeft:"8px"}}>{props.url + ".jpg"}</p>
            <a style={{textDecoration:"none",color:"red"}} href="#" onClick = {deleteImage}><i class="fa fa-trash-o" aria-hidden="true"></i></a>
        </div>
    );
}


export default ImageLink;