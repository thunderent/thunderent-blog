import React, {useState, useContext} from 'react';
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import {firestore} from "../../firebase";
import "react-mde/lib/styles/css/react-mde-all.css";
import "../../index.css";
import * as utils from "../../utils/utils";
import styled from 'styled-components';

import TagsSelector from "../Tags/TagsSelector";
import SidebarCard from "./SidebarCard";


import BlogContext from "../../context/Context";

// StyledComponents //
const TextArea = styled.textarea`
    padding:5px 10px; 
    outline:none;
    box-shadow: none;
    width:90%;
    resize:none
    font-size:12px;
    color:gray;
    border : ${props => props.value ? '1px solid #68a36c' : '1px solid #ff6661'}
`;

export const Dashboard = () => {
  const {state, dispatch} = useContext(BlogContext);


  const [tab, setTab] = useState();
  const [postData, setPostData] = useState(
    {
      blogTitle : state.activePost.title, 
      description : state.activePost.description, 
      markdown : state.activePost.content,
      thumbnail : state.activePost.thumbnail,
      mainCover : state.activePost.mainCover,
      mainCoverSource : state.activePost.mainCoverSource,
      tag : state.activePost.tag
    }
  );


  const handleValueChange = (value) => setPostData({...postData, markdown : value});

  const handleTitleChange = (event) => setPostData({...postData, blogTitle : event.target.value});
  const handleDescriptionChange = (event) => setPostData({...postData, description : event.target.value});
  const handleThumbnailChange = (event) => setPostData({...postData, thumbnail : event.target.value});
  const handleCoverChange = (event) => setPostData({...postData, mainCover : event.target.value});
  const handleCoverSourceChange = (event) => setPostData({...postData, mainCoverSource : event.target.value});

  const handleTabChange = (tab) => setTab(tab);
  
  const resetArticle = () => {
      setPostData(
        {
          blogTitle : state.activePost.title, 
          description : state.activePost.description, 
          markdown : state.activePost.content,
          thumbnail : state.activePost.thumbnail,
          mainCover : state.activePost.mainCover,
          mainCoverSource : state.activePost.mainCoverSource,
          tag : state.activePost.tag
        }
      );
  }
  //Do blog post saving logic here
  const savePost = () => {
   if(isPostValid() === false){
     alert("Not all fields have been completed!");
   } 
   else{
      const blogObject = {  
          comments: [],
          content: postData.markdown,
          date: new Date().getTime(),
          description: postData.description,
          mainCover: postData.mainCover,
          mainCoverSource: postData.mainCoverSource,
          readDuration: utils.calculateReadingTime(postData.markdown),
          tag: state.activePost.tag,
          thumbnail: postData.thumbnail,
          title: postData.blogTitle
      }

      if(state.activePost.id === 0){
          firestore.collection("posts").add(blogObject).then((docRef) => {
            alert("Document added : ", docRef.id);
          });
      }
      else{
          firestore.collection("posts").doc(state.activePost.id).update({
            content:blogObject.content,
            description:blogObject.description,
            mainCover:blogObject.mainCover,
            mainCoverSource:blogObject.mainCoverSource,
            readDuration: utils.calculateReadingTime(blogObject.content),
            tag:blogObject.tag,
            thumbnail:blogObject.thumbnail,
            title:blogObject.title
          }).then(() => {
            alert("Document updated!");
          });;
      }
    }
  }

  /* TODO - Do data validation here */
  const isPostValid = () => {
    let isValid = true;
    Object.keys(postData).forEach(function(key,index) {
        console.log("The value is", postData[key], typeof postData[key])
        const value = postData[key];
        if(value === '' || value === undefined || value === null) isValid=false;
    }) 
    return isValid;
  }

  let converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
  });

  return(
    <>
      <div className="content">
      
        <h1 className="mainTitle">Create/Edit an Article</h1> 
        <div style={{marginLeft:"50px"}}>
            <h3>Add new Post <i class="fa fa-clipboard" aria-hidden="true"></i></h3>
            <input onChange={handleTitleChange} value={postData.blogTitle} className="inputField" type="text" placeholder="Write your blog title..."></input>

            <h5>Post Description <i class="fa fa-sticky-note" aria-hidden="true"></i></h5>
            <input onChange={handleDescriptionChange} value={postData.description} className="inputField" type="text" placeholder="Write your post description..."></input>
           
          </div>
      <div style={{display:"flex"}}>
        <div style={{flex:3, marginLeft:"50px", marginTop:"50px"}}>
         
          <div className="container">
            <ReactMde
              onChange={handleValueChange}
              onTabChange={handleTabChange}
              value={postData.markdown}
              generateMarkdownPreview={markdown => Promise.resolve(converter.makeHtml(markdown))}
              selectedTab={tab}
            />
          </div>
        </div>

        <div style={{flex:1, marginLeft:"50px", marginTop:"50px"}}> 
            <SidebarCard cardTitle="Tags" cardCSSTag="fa fa-tag">
                <div style={{padding:"10px"}}>
                    <TagsSelector selectedTag = {postData.tag}></TagsSelector>     
                </div>
            </SidebarCard>
            <SidebarCard cardTitle="Images" cardCSSTag="fa fa-bandcamp">
                  <div style={{padding:"10px"}}>
                        <p>Thumbnail Link</p>
                          <TextArea  onChange={handleThumbnailChange} value={postData.thumbnail} className="inputField" type="text" placeholder="Thumbnail image link..."/>
                        <p>Cover Link</p>
                          <TextArea  onChange={handleCoverChange} value={postData.mainCover} className="inputField" type="text" placeholder="Cover image link..."/>
                        <p>Cover Source</p>
                          <TextArea  onChange={handleCoverSourceChange} value={postData.mainCoverSource} className="inputField" type="text" placeholder="Cover image sources..."/>
                  </div>
            </SidebarCard>
            <SidebarCard cardTitle="Options" cardCSSTag="fa fa-cog">
                  <div style={{padding:"10px", display:"flex", justifyContent:"space-around"}}>
                    <a className="actionButton" style={{background:"#ff6661"}} onClick={resetArticle}>Reset Article</a>
                    <a className="actionButton" style={{background:"#68a36c"}} onClick={savePost}>Publish Article</a>
                  </div>
            </SidebarCard>
        </div>
        </div>
      </div>
    </>
  );
}


export default Dashboard;

