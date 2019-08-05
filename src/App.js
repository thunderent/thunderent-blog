import * as React from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {useReducer} from 'react';


import {BlogProvider} from "./context/Context.js";
import "./components/Dashboard/Dashboard.js";
import Dashboard from "./components/Dashboard/Dashboard.js";
import MainPage from "./components/MainPage/MainPage";
import TopBar from "./components/TopBar/TopBar";
import Article from "./components/ArticlePage/Article";


const blogReducer = (state,action) => {
  switch(action.type){
      case "TAG":
          return({...state, tag:action.payload});
      case "THUMBNAIL":
          return({...state, thumbnailLink:action.payload});
      case "SET_ACTIVE_POST":
          return({...state, activePost:action.payload});
      case "CREATE_POST":
          return({...state, activePost:initialState.activePost}
                )
      default:
          return state;
  }
}

/* TODO The initial state for the dashboard will be either set when creating new blog post or editing a current blog post
    GET THE POST 
*/
const initialState = {
    listOfArticles : [ 
     {
      title:"This is just another blog post here tomato two",
      date:"01/01/2001",
      thumbnail : "https://picsum.photos/id/559/120/120",
      readDuration : 5,
      description : "Just another blog article",
      content : "**Hello,worldly people!**lofkjhfglkjhglkfjghkhkljhlkjh ksjhdsalkjhdsjk",
      tag : "TECH",
      mainCover : "https://picsum.photos/id/452/1920/1080",
      mainCoverSource : "https://pixabay.com"
     },
     {
      title:"This is just another blog post here apple two",
      date:"01/01/2001",
      thumbnail : "https://picsum.photos/id/559/120/120",
      readDuration : 5,
      description : "Just another blog article",
      content : "**Hello,world!**",
      tag : "LIFE",
      mainCover : "https://picsum.photos/id/452/1920/1080",
      mainCoverSource : "https://pixabay.com"
     },
     {
         title:"This is just another blog post here apple two",
         date:"01/01/2001",
         thumbnail : "https://picsum.photos/id/559/120/120",
         readDuration : 5,
         description : "Just another blog article",
         content : "**Hello,world!**",
         tag : "DEV",
         mainCover : "https://picsum.photos/id/452/1920/1080",
         mainCoverSource : "https://pixabay.com"
     },
     {
         title:"This is just another blog post here apple two",
         date:"01/01/2001",
         thumbnail : "https://picsum.photos/id/559/120/120",
         readDuration : 5,
         description : "Just another blog article",
         content : "**Hello,world!**",
         tag : "DEV",
         mainCover : "https://picsum.photos/id/452/1920/1080",
         mainCoverSource : "https://pixabay.com"
     }],
     activePost : {
        title:"",
        date:"",
        thumbnail : "",
        readDuration : 0,
        description : "",
        content : "",
        tag : "",
        mainCover : "",
        mainCoverSource : ""
     }
}


const App = () => {
  const [state, dispatch] = useReducer(blogReducer,initialState);
  return(
    <BlogProvider value={{state,dispatch}}>
     <Router>
      <TopBar></TopBar>

      <Route path="/" exact component={MainPage}></Route>
      <Route path="/dashboard/" exact component={Dashboard}></Route>
      <Route path="/article/:id" exact component={Article}></Route>

      </Router>
    </BlogProvider>
  );
}

export default App;