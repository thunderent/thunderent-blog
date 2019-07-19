import React, {useState, useContext} from 'react';
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import "../../index.css";

import TagsSelector from "../Tags/TagsSelector";
import TopBar from "../TopBar/TopBar";
import ImageUploader from '../ImageUploader';


export const Dashboard = (props) => {
  const [tab, setTab] = useState();
  const [postData, setPostData] = useState({tag : "none", markdown : "**Hello,Worlds!**"});

  const handleValueChange = (value) => setPostData({...postData, markdown : value});
  const handleTabChange = (tab) => setTab(tab);
  
  //Do blog post saving logic here
  const printValue = () => console.log(1);


  let converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
  });

  return(
    <>
      <TopBar></TopBar>
      <div className="content">
      
        <h1 className="mainTitle">Create/Edit an Article</h1> 
        <div style={{marginLeft:"50px"}}>
            <h3>Add new Post <i class="fa fa-clipboard" aria-hidden="true"></i></h3>
            <input className="inputField" type="text" placeholder="Write your blog title..."></input>
            
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
            <div className="sidebar-card">
              <div className="sidebar-card-title"><strong>Tags <i class="fa fa-tag" aria-hidden="true"></i></strong></div>
              <div style={{padding:"10px"}}>
                <TagsSelector></TagsSelector>
                The selected tag for this article is : tag
              </div>
            </div>

            <div className="sidebar-card">
              <div className="sidebar-card-title"><strong>Thumbnail <i class="fa fa-bandcamp" aria-hidden="true"></i></strong></div>
              <div style={{padding:"10px", display:"flex", justifyContent:"space-around"}}>
                  <ImageUploader></ImageUploader>
              </div>
            </div>

            <div className="sidebar-card">
              <div className="sidebar-card-title"><strong>Options <i class="fa fa-cog" aria-hidden="true"></i></strong></div>
              <div style={{padding:"10px", display:"flex", justifyContent:"space-around"}}>
              <a className="actionButton" style={{background:"red"}} onClick={printValue}>Delete Article</a>
              <a className="actionButton" onClick={printValue}>Publish Article</a>
              </div>
            </div>
        </div>
        </div>
      </div>
    </>
  );
}


export default Dashboard;

