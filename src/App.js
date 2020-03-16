import * as React from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {useReducer, useState, useEffect} from 'react';

import {BlogProvider} from "./context/Context.js";
import "./components/Dashboard/Dashboard.js";
import Dashboard from "./components/Dashboard/Dashboard.js";
import MainPage from "./components/MainPage/MainPage";
import TopBar from "./components/TopBar/TopBar";
import Footer from "./components/Footer/Footer";
import Article from "./components/ArticlePage/Article";
import ProtectedRoute from "./components/LoginPage/ProtectedRoute";
import { auth,firestore } from "./firebase/index.js";
import Loader from "./components/Loader/Loader.js";

const blogReducer = (state,action) => {
  switch(action.type){
      case "GET_POSTS":
          return({...state, listOfArticles:action.payload});  
      case "TAG":
          let _activePost = {...state.activePost, tag : action.payload};
          return({...state, activePost:_activePost});
      case "THUMBNAIL":
          return({...state, thumbnailLink:action.payload});
      case "SET_ACTIVE_POST":
          return({...state, activePost:action.payload});
      case "CREATE_POST":
          return({...state, activePost:initialState.activePost});
      case "LOGGED_STATUS":
          return({...state, loggedIn : action.payload});
      case "LOGIN":
          return({...state, loggedIn : true, isAdmin: action.payload.isAdmin, loggedUserDisplayName : action.payload.userName}); 
      case "LOGOUT":
          return({...state, loggedIn : false, loggedUserDisplayName : ""});
      default:
          return state;
  }
}

const initialState = {
    loggedUserDisplayName : "",
    loggedIn : false,
    isAdmin:false,
    listOfArticles : [],
     activePost : {
        id:0,
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
};

const App = () => {
  const [state, dispatch] = useReducer(blogReducer,initialState);
  const [showLoader, setShowLoader] = useState(true);

  //Get the tags
  useEffect(() => {
    let tagList = [];
    let today = new Date();

    if(localStorage.hasOwnProperty("blog_tags") === true){
        let savedObject = JSON.parse(localStorage.getItem("blog_tags"));
        if(parseInt(savedObject.expiryDate) < today.getTime()){
            firestore.collection("tags").get().then(data => 
                {
                    data.forEach(e => tagList.push(e.data()));
                    localStorage.setItem("blog_tags",JSON.stringify({
                        tagList : tagList,
                        expiryDate : new Date().setDate(today.getDate()+1) 
                    })); 
                }
            );    
        }
    }else{
            firestore.collection("tags").get().then(data => 
                {
                    data.forEach(e => tagList.push(e.data()));
                    localStorage.setItem("blog_tags",JSON.stringify({
                        tagList : tagList,
                        expiryDate : new Date().setDate(today.getDate()+1) 
                    })); 
                }
            );        
    }
  },[]);

  //Get the articles
  useEffect(() => {
    let listOfArticles = [];
    firestore.collection("posts").orderBy("date","desc").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            listOfArticles.push({
                id:doc.id,
                ...doc.data()
            })
            dispatch({type:"GET_POSTS", payload:listOfArticles});
            setShowLoader(false);
        });
        
    });
  },[]);
  
  useEffect(() => {
    auth.onAuthStateChanged(user => {
        if(user) {
          user.getIdTokenResult().then(idTokenResult => {
            dispatch(
                {
                type:"LOGIN", 
                payload:{
                    userName: user.displayName,
                    isAdmin:idTokenResult.claims.admin || false
                }
            });
          })
        } else {
          dispatch({type:"LOGOUT", payload:false});
        }
      });
  }, []);
  return(
    <BlogProvider value={{state,dispatch}}>
      <div className="mainContent">
        <Router>
            <TopBar loggedIn={state.loggedIn} isAdmin={state.isAdmin}></TopBar>      
            <Route path="/" exact component={MainPage}></Route>
            <ProtectedRoute path="/dashboard/" exact component={Dashboard}></ProtectedRoute>
            <Route path="/article/:id" exact component={Article}></Route>
        </Router>
        <Loader showLoader={showLoader}></Loader>
      </div>
    <Footer></Footer>
    </BlogProvider>
  );
}

export default App;