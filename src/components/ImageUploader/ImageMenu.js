import React from 'react';
import ImageViewer from './ImageViewer';
import ImageUploader from "./ImageUploader";
import PropTypes from 'prop-types';

import {ImagePickerOverlay, ImageUploaderContainer, ImageMenuTopBar, UploaderTitle, ImageMenuCloseButton} from "./Styling/styles";

import "../../index.css";

const ImageMenu = (props) => {
    return(
        <>           
            <ImagePickerOverlay>
                <ImageUploaderContainer>
                    <ImageMenuTopBar>
                        <UploaderTitle>IMAGE UPLOADER</UploaderTitle>
                        <ImageMenuCloseButton onClick={props.closeFunction}>CLOSE</ImageMenuCloseButton>
                    </ImageMenuTopBar>
                    
                    <ImageUploader/>

                    <ImageViewer/>
                </ImageUploaderContainer>
            </ImagePickerOverlay>   
        </>
    );
}

ImageMenu.propTypes = {
    closeFunction : PropTypes.func.isRequired
}

export default ImageMenu;