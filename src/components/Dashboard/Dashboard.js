import React, {useState, useContext} from 'react';
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import {firestore} from "../../firebase";
import "react-mde/lib/styles/css/react-mde-all.css";
import "../../index.css";

import TagsSelector from "../Tags/TagsSelector";
import SidebarCard from "./SidebarCard";


import BlogContext from "../../context/Context";


export const Dashboard = () => {
  const {state, dispatch} = useContext(BlogContext);


  const [tab, setTab] = useState();
  // TODO - Use default values gathered from the global state in the future
  const [postData, setPostData] = useState(
    {
      blogTitle : state.activePost.title, 
      description : state.activePost.description, 
      markdown : state.activePost.content,
      thumbnail : state.activePost.thumbnail,
      mainCover : state.activePost.mainCover,
      mainCoverSource : state.activePost.mainCoverSource
    }
  );


  const handleValueChange = (value) => setPostData({...postData, markdown : value});

  const handleTitleChange = (event) => setPostData({...postData, blogTitle : event.target.value});
  const handleDescriptionChange = (event) => setPostData({...postData, description : event.target.value});
  const handleThumbnailChange = (event) => setPostData({...postData, thumbnail : event.target.value});
  const handleCoverChange = (event) => setPostData({...postData, mainCover : event.target.value});
  const handleCoverSourceChange = (event) => setPostData({...postData, mainCoverSource : event.target.value});

  const handleTabChange = (tab) => setTab(tab);
  
  //Do blog post saving logic here
  const savePost = () => {
    /* The current tag and thumbnail link should've been saved into the central state
       Gather the content and markdown from the input fields
       generate a post date when hitting save post
       parse the content to determine the reading time
       
    */

   const blogObject = {  
      comments: [],
      content: postData.markdown,
      date: new Date().toDateString(),
      description: postData.description,
      mainCover: postData.mainCover,
      mainCoverSource: postData.mainCoverSource,
      readDuration: 5,
      tag: state.activePost.tag,
      thumbnail: postData.thumbnail,
      title: postData.blogTitle
   }
    firestore.collection("posts").add(blogObject).then((docRef) => {
      alert("Document added : ", docRef.id);
    });
    console.log(state,dispatch); 
  }

  /* TODO - Do data validation here */
  const validateData = () => {
      return true;
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
              generateMarkdownPreview={markdown =>
                Promise.resolve(converter.makeHtml(markdown))
              }
              selectedTab={tab}
            />
          </div>
        </div>

        <div style={{flex:1, marginLeft:"50px", marginTop:"50px"}}> 
            <SidebarCard cardTitle="Tags" cardCSSTag="fa fa-tag">
                <div style={{padding:"10px"}}>
                    <TagsSelector></TagsSelector>     
                  </div>
            </SidebarCard>
            <SidebarCard cardTitle="Images" cardCSSTag="fa fa-bandcamp">
                  <div style={{padding:"10px"}}>
                        <p>Thumbnail Link</p>
                          <input onChange={handleThumbnailChange} value={postData.thumbnail} className="inputField" type="text" placeholder="Thumbnail image link..."></input>
                        <p>Cover Link</p>
                          <input onChange={handleCoverChange} value={postData.mainCover} className="inputField" type="text" placeholder="Cover image link..."></input>
                        <p>Cover Source</p>
                          <input onChange={handleCoverSourceChange} value={postData.mainCoverSource} className="inputField" type="text" placeholder="Cover image sources..."></input>
                  </div>
            </SidebarCard>
            <SidebarCard cardTitle="Options" cardCSSTag="fa fa-cog">
                  <div style={{padding:"10px", display:"flex", justifyContent:"space-around"}}>
                    <a className="actionButton" style={{background:"red"}} >Reset Article</a>
                    <a className="actionButton" onClick={savePost}>Publish Article</a>
                  </div>
            </SidebarCard>
        </div>
        </div>
      </div>
    </>
  );
}


export default Dashboard;

