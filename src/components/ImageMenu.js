import React from 'react';
import ImageViewer from './ImageViewer';
import ImageUploader from "./ImageUploader";
import PropTypes from 'prop-types';

import "../index.css";

const ImageMenu = (props) => {
    return(
        <>           
            <div id="imagePickerOverlay">
                <div id="imageUploaderContainer">
                <div id="imageMenuTopBar">
                    <h3 style={{display:"inline-block", marginLeft:"40px", color:"#838383"}}>Image Uploader</h3>
                    <a id="imageMenuCloseButton" onClick={props.closeFunction}>Close</a>
                </div>
                
                 <ImageUploader/>

                 <h3 style={{color:"gray"}}>Image Gallery</h3>
                 <ImageViewer/>
                </div>
            </div>
            }    
        </>
    );
}

ImageMenu.propTypes = {
    closeFunction : PropTypes.func.isRequired
}

export default ImageMenu;