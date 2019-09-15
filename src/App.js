import * as React from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {useReducer, useEffect} from 'react';


import {BlogProvider} from "./context/Context.js";
import "./components/Dashboard/Dashboard.js";
import Dashboard from "./components/Dashboard/Dashboard.js";
import MainPage from "./components/MainPage/MainPage";
import TopBar from "./components/TopBar/TopBar";
import Footer from "./components/Footer/Footer";
import Article from "./components/ArticlePage/Article";
import Login from "./components/LoginPage/Login";
import ProtectedRoute from "./components/LoginPage/ProtectedRoute";
import { auth,firestore } from "./firebase/index.js";

const blogReducer = (state,action) => {
  switch(action.type){
      case "GET_POSTS":
          return({...state, listOfArticles:action.payload});  
      case "TAG":
          return({...state, tag:action.payload});
      case "THUMBNAIL":
          return({...state, thumbnailLink:action.payload});
      case "SET_ACTIVE_POST":
          return({...state, activePost:action.payload});
      case "CREATE_POST":
          return({...state, activePost:initialState.activePost});
      case "LOGGED_STATUS":
          return({...state, loggedIn : action.payload});
      case "LOGIN":
          return({...state, loggedIn : true, loggedUserDisplayName : action.payload}); 
      case "LOGOUT":
          return({...state, loggedIn : false, loggedUserDisplayName : ""});
      default:
          return state;
  }
}

/* TODO The initial state for the dashboard will be either set when creating new blog post or editing a current blog post
    GET THE POST
    {
        title:"This is what happens when you don't pay taxes",
        date:"01/01/2001",
        thumbnail : "https://picsum.photos/id/559/120/120",
        readDuration : 5,
        description : "Are death and taxes the only two things certain in this world?",
        content : "**We're not in Kansas anymore, Dorothy!**",
        tag : "DEV",
        mainCover : "https://picsum.photos/id/452/1920/1080",
        mainCoverSource : "https://pixabay.com",
        comments : [{user:"Rix", date:"01/01/1996", content:"I commented here"}]
       },
     {
      title:"This is just another blog post here tomato two",
      date:"01/01/2001",
      thumbnail : "https://picsum.photos/id/559/120/120",
      readDuration : 5,
      description : "Gravity in the space station. There are some clever ideas out there with the space stations of the future",
      content : "**Hello,worldly people!**lofkjhfglkjhglkfjghkhkljhlkjh ksjhdsalkjhdsjk",
      tag : "TECH",
      mainCover : "https://picsum.photos/id/452/1920/1080",
      mainCoverSource : "https://pixabay.com",
      comments : [{user:"Rix", date:"01/01/1996", content:"I commented here"},{user:"Rix", date:"01/01/1996", content:"I commented here"}]
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
      mainCoverSource : "https://pixabay.com",
      comments : [{user:"Rix", date:"01/01/1996", content:"I commented here"},{user:"Rix", date:"01/01/1996", content:"I commented here"}]
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
         mainCoverSource : "https://pixabay.com",
         comments : [{user:"Rix", date:"01/01/1996", content:"I commented here"},{user:"Rix", date:"01/01/1996", content:"I commented here"}]

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
         mainCoverSource : "https://pixabay.com",
         comments : [{user:"Rix", date:"01/01/1996", content:"I commented here"}]
     } 
*/
const initialState = {
    loggedUserDisplayName : "",
    loggedIn : false,
    listOfArticles : [],
     activePost : {
        title:"",
        date:"",
        thumbnail : "",
        readDuration : 0,
        description : "",
        content : "",
        tag : "",
        mainCover : "",
        mainCoverSource : "",
        comments : []
     }
}

const App = () => {
  const [state, dispatch] = useReducer(blogReducer,initialState);

  useEffect(() => {
    let listOfArticles = [];
    console.log("This is being called here bro!");
    firestore.collection("posts").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
           /* listOfArticles.push({
                    id:doc.id,               
                    title:doc.data().title,
                    date:doc.data().date,
                    thumbnail : doc.data().thumbnail,
                    readDuration : doc.data().readDuration,
                    description : doc.data().description,
                    content : doc.data().content,
                    tag : doc.data().tag,
                    mainCover : doc.data().mainCover,
                    mainCoverSource : doc.data().mainCoverSource,
                    comments : doc.data().comments
            }); */
            listOfArticles.push({
                id:doc.id,
                ...doc.data()
            })
            console.log(console.log(doc));
            dispatch({type:"GET_POSTS", payload:listOfArticles});
        });
        
    });
  },[]);
  
  useEffect(() => {
    auth.onAuthStateChanged(user => {
        if (user) {
          console.log(user, "is signed in");
          dispatch({type:"LOGIN", payload:user.displayName});
        } else {
          console.log("jnope");
          dispatch({type:"LOGOUT", payload:false});
        }
      });
  }, []);
  return(
    <BlogProvider value={{state,dispatch}}>
      <div className="mainContent">
        <Router>
            <TopBar loggedIn={state.loggedIn}></TopBar>      
            <Route path="/" exact component={MainPage}></Route>
            <ProtectedRoute path="/dashboard/" exact component={Dashboard}></ProtectedRoute>
            <Route path="/article/:id" exact component={Article}></Route>
            <Route path="/login" exact component={Login}></Route>
        </Router>
    </div>
    <Footer></Footer>
    </BlogProvider>
  );
}

export default App;