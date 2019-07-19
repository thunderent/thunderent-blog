import * as React from "react";

import {BlogProvider} from "./context/Context.js";
import "./components/Dashboard/Dashboard.js";
import Dashboard from "./components/Dashboard/Dashboard.js";

export default class App extends React.Component {
  state = {
    blogObject : {
      title : "",
      tag : "",
      postDate : "",
      thumbnailLink : "",
      readDuration : 0,
      content : ""
    }
  }
  render(){
    return(
        <BlogProvider value={this.state.blogObject}>
            <Dashboard></Dashboard>
        </BlogProvider>
    );
  }
}